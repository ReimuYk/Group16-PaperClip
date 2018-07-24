package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.*;
import com.paperclip.dao.relationshipDao.AssistRepository;
import com.paperclip.dao.relationshipDao.BlockPostilRepository;
import com.paperclip.dao.relationshipDao.InviteRepository;
import com.paperclip.model.Entity.*;
import com.paperclip.model.Relationship.Assist;
import com.paperclip.model.Relationship.BlockPostil;
import com.paperclip.model.Relationship.Invite;
import com.paperclip.service.ImgService;
import com.paperclip.service.MailService;
import com.paperclip.service.UserService;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import org.apache.commons.lang.ArrayUtils;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

/*
* 罗宇辰
* 2018/7/12 第一次编辑
* */

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MailService mail;

    @Autowired
    private DocumentPdfRepository docPdfRepo;

    @Autowired
    private InviteRepository inviteRepo;

    @Autowired
    private AssistRepository assistRepo;

    @Autowired
    private ImgService service;

    @Autowired
    private ReplyRepository replyRepo;

    @Autowired
    private BlockPostilRepository blockPRepo;

    @Autowired
    private PostilRepository postilRepo;

    @Autowired
    private PostilCommentRepository postilCommRepo;

    @Autowired
    private NoteRepository noteRepo;

    @Autowired
    private NoteCommentRepository noteCommRepo;


    public JSONObject findPassword(JSONObject data) {
        String userEmail = data.getString("userEmail");
        User user = userRepo.findDistinctByEmail(userEmail);
        JSONObject result = new JSONObject();
        if(user != null){
            String subject = "PaperClip 找回密码";
            String content = "用户名： "+user.getUsername()+" 密码： +"+user.getPassword();
            content += "非本人操作请忽略此邮件\n";
            mail.singleMail(userEmail,subject,content);
            result.accumulate("result", "success");
        }else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    public JSONObject addUser(JSONObject data) throws UnsupportedEncodingException {
        String username = data.getString("username");
        String password = data.getString("password");
        String email = data.getString("email");

        username = URLEncoder.encode(username, "UTF-8");
        password = URLEncoder.encode(password, "UTF-8");
        email = URLEncoder.encode(email, "UTF-8");

        User check1 = userRepo.findOne(username);
        User check2 = userRepo.findDistinctByEmail(email);

        JSONObject result = new JSONObject();
        if(check1 != null){
            result.accumulate("result", "duplicate username");
        }else if(check2 != null){
            result.accumulate("result", "duplicate email");
        }else{
            User user = new User(username,password,email);
            userRepo.save(user);
            result.accumulate("result", "success");
        }
        return result;
    }

    public JSONObject userLogin(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n====userLogin====\n get json: "+data);
        String username = data.getString("username");
        String password = data.getString("password");
        username = URLEncoder.encode(username, "UTF-8");
        password = URLEncoder.encode(password, "UTF-8");
        JSONObject userinfo = new JSONObject();

        User user = userRepo.findOne(username);
        if((user != null) && (password.equals(user.getPassword()))){
            userinfo.accumulate("username", URLDecoder.decode(user.getUsername(), "UTF-8"));
            userinfo.accumulate("result", "success");
        }
        else {
            user = userRepo.findDistinctByEmail(username);
            if ((user != null) && (password.equals(user.getPassword()))) {
                userinfo.accumulate("username", URLDecoder.decode(user.getUsername(), "UTF-8"));
                userinfo.accumulate("result", "success");
            }else{
                userinfo.accumulate("result", "fail");
            }
        }
        System.out.println(userinfo.toString());
        return userinfo;
    }


    /* 以下内容与私信有关，有待后期拓展 */
    @Autowired
    private MessageRepository messageRepo;

    //使用List判断元素是否已经存在于数组中
    public static boolean inList(List<String> myList,String targetValue){
        String[] arr = myList.toArray(new String[myList.size()]);
        return ArrayUtils.contains(arr,targetValue);
    }

    //输入:username ----------------导航栏中展示的未读私信列表（类比QQ右下角消息提示）
    public JSONArray getUnreadMessage(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n======= getUnreadMessage=====\ngetdata: "+data);
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User user = userRepo.findOne(username);
        List<Message> list = messageRepo.getUnreadMessage(user);
        Iterator<Message> it = list.iterator();

        List<Message> mm = new ArrayList<>();//最终返回的List
        List<String> users = new ArrayList<>();//存储出现过的username
        while(it.hasNext()){
            Message m = it.next();
            String sname = m.getSender().getUsername();
            if(!inList(users,sname)){
                users.add(sname);
                mm.add(m);
            }
        }
        Iterator<Message> it2 = mm.iterator();
        JSONArray messages = new JSONArray();
        while(it2.hasNext()){
            Message m = it2.next();
            JSONObject message = new JSONObject();
            message.accumulate("sender", URLDecoder.decode(m.getSender().getUsername(), "UTF-8"));
            message.accumulate("content",URLDecoder.decode(m.getContent(), "UTF-8"));
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            message.accumulate("time",sdf.format(m.getTime()));
            messages.add(message);
        }
        System.out.println("messages: "+messages);
        return messages;
    }

    //输入：username -------------------简略的展示私信列表（类比QQ的只显示最新一个消息的对话框列表）
    public JSONObject getBriefMessageList(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n=====getBriefMessageList====\ngetjson: "+data);
        JSONObject result = new JSONObject();
        JSONArray messageArray = new JSONArray();
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User user = userRepo.findOne(username);
        List<Message> list = messageRepo.getAllMessage(user);
        Iterator<Message> it = list.iterator();

        List<Message> mm = new ArrayList<>();//最终返回的List
        List<String> users = new ArrayList<>();//存储出现过的username
        while(it.hasNext()){
            Message m = it.next();
            String sname = m.getSender().getUsername();
            String rname = m.getReceiver().getUsername();
            if(!sname.equals(username) && !inList(users,sname)){
                users.add(sname);
                mm.add(m);
            }
            else if(!rname.equals(username) && !inList(users,rname)){
                users.add(rname);
                mm.add(m);
            }
        }

        Iterator<Message> it2 = mm.iterator();
        while(it2.hasNext()){
            Message m = it2.next();
            JSONObject message = new JSONObject();
            if(m.getSender().getUsername().equals(username)){
                message.accumulate("another", URLDecoder.decode(m.getReceiver().getUsername(), "UTF-8"));
                message.accumulate("avatar",service.getUserHeader(m.getReceiver()));
            }
            else {
                message.accumulate("another", URLDecoder.decode(m.getSender().getUsername(), "UTF-8"));
                message.accumulate("avatar",service.getUserHeader(m.getSender()));
            }
            message.accumulate("content",URLDecoder.decode(m.getContent(), "UTF-8"));
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            message.accumulate("time",sdf.format(m.getTime()));
            messageArray.add(message);
        }
        System.out.println("return : "+messageArray);
        result.accumulate("message",messageArray);
        result.accumulate("avatar",service.getUserHeader(user));
        return result;
    }

    //输入：hostname，clientname---------------两个用户之间的对话展示
    public JSONArray getConversation(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n====getConversation====\nget json: "+data);
        JSONArray conversation = new JSONArray();
        String hostname = data.getString("hostname");
        String clientname = data.getString("clientname");
        hostname = URLEncoder.encode(hostname, "UTF-8");
        clientname = URLEncoder.encode(clientname, "UTF-8");
        User host = userRepo.findOne(hostname);
        User client = userRepo.findOne(clientname);
        List<User> user = new ArrayList<>();
        user.add(host);
        user.add(client);
        List<Message> list = messageRepo.getConversation(user);
        Iterator<Message> it = list.iterator();

        while (it.hasNext()){
            Message m = it.next();
            JSONObject message = new JSONObject();
            if (m.getReceiver().getUsername().equals(hostname)){
                m.setHasRead(1);
                messageRepo.save(m);
            }
            message.accumulate("sender", URLDecoder.decode(m.getSender().getUsername(), "UTF-8"));
            message.accumulate("content",URLDecoder.decode(m.getContent(), "UTF-8"));
            message.accumulate("avatar",service.getUserHeader(m.getSender()));
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            message.accumulate("time",sdf.format(m.getTime()));
            conversation.add(message);
        }
        System.out.println("return: "+conversation);
        return conversation;
    }

    //输入：senderName,receiverName -------------发私信
    public JSONObject sendMessage(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n=====sandMessage====\nget json: "+data);
        JSONObject result = new JSONObject();
        String senderName = data.getString("senderName");
        String receiverName = data.getString("receiverName");
        String content = data.getString("content");

        senderName = URLEncoder.encode(senderName, "UTF-8");
        receiverName = URLEncoder.encode(receiverName, "UTF-8");
        content = URLEncoder.encode(content, "UTF-8");

        User sender = userRepo.findOne(senderName);
        User receiver = userRepo.findOne(receiverName);
        Message message = new Message(sender, receiver, content);
        messageRepo.save(message);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        result.accumulate("time", sdf.format(message.getTime()));
        return result;
    }

    //输入：username,type---------------显示邀请信息
    public JSONArray getInvitations(JSONObject data) throws UnsupportedEncodingException {
        JSONArray invitations = new JSONArray();

        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        String type = data.getString("type");

        User user = userRepo.findOne(username);
        List<Invite> invites = inviteRepo.findByUser(user);

        System.out.println("type:"+type);
        if(type.equals("small")){
            Iterator<Invite> it = invites.iterator();
            int n = 0;
            while(it.hasNext() && n<3){
                Invite i = it.next();
                JSONObject invitation = new JSONObject();
                invitation.accumulate("sender",i.getDocument().getUser().getUsername());
                invitation.accumulate("title",i.getDocument().getTitle());
                invitation.accumulate("inviteID",i.getId());
                invitations.add(invitation);
                n++;
            }
        }
        else{
            for(Invite i:invites){
                JSONObject invitation = new JSONObject();
                invitation.accumulate("sender",i.getDocument().getUser().getUsername());
                invitation.accumulate("avatar",service.getUserHeader(i.getDocument().getUser()));
                invitation.accumulate("title",i.getDocument().getTitle());
                invitation.accumulate("inviteID",i.getId());
                invitations.add(invitation);
            }
        }
        System.out.println(invitations.toString());
        return invitations;
    }

    //输入：inviteID,reply--------------被邀请者对邀请进行接收或拒绝
    public JSONObject replyInvitation(JSONObject data){
        JSONObject result = new JSONObject();

        Long inviteID = data.getLong("inviteID");
        Long reply = data.getLong("reply");

        System.out.println("reply:"+reply);
        Invite i = inviteRepo.findOne(inviteID);
        if(i == null){
            result.accumulate("result","fail");
            return result;
        }
        if(reply == 1){
            Assist assist = new Assist(i.getUser(),i.getDocument());
            assistRepo.save(assist);
        }
        inviteRepo.delete(i);
        result.accumulate("result","success");
        return result;
    }

    //输入：username ------------------------- 返回有人@你的通知
    public JSONArray getCommentReply(JSONObject data) throws UnsupportedEncodingException {
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");

        User user = userRepo.findOne(username);
        List<Reply> replies = replyRepo.findByReceiver(user);
        JSONArray result = new JSONArray();
        for(Reply reply:replies){
            JSONObject r = new JSONObject();
            PostilComment comm = reply.getComment();
            r.accumulate("sender",comm.getUser().getUsername());
            r.accumulate("content",URLDecoder.decode(comm.getContent(), "UTF-8"));
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            r.accumulate("time",sdf.format(comm.getDate()));

            List<BlockPostil> b = blockPRepo.findByPostil(comm.getPostil());
            Block block = b.iterator().next().getBlock();
            Paper paper = block.getPaperPage().getPaper();
            r.accumulate("paperTitle",paper.getTitle());
            r.accumulate("paperID",paper.getId());
            result.add(r);
        }
        return result;
    }

    //输入：username ----------------- 有人对你的批注进行了评论
    public JSONArray getPostilCommentInfo(JSONObject data) throws UnsupportedEncodingException {
        JSONArray infos = new JSONArray();
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");

        User user = userRepo.findOne(username);
        List<Postil> postils = postilRepo.findByUser(user);
        for(Postil postil:postils){
            List<PostilComment> comments = postilCommRepo.findByPostilOrderByDateDesc(postil);
            for(PostilComment comment:comments){
                JSONObject info = new JSONObject();
                info.accumulate("sender",comment.getUser().getUsername());
                info.accumulate("content",URLDecoder.decode(comment.getContent(), "UTF-8"));
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                info.accumulate("time",sdf.format(comment.getDate()));

                List<BlockPostil> b = blockPRepo.findByPostil(comment.getPostil());
                Block block = b.iterator().next().getBlock();
                Paper paper = block.getPaperPage().getPaper();
                info.accumulate("paperTitle",paper.getTitle());
                info.accumulate("paperID",paper.getId());

                infos.add(info);
            }
        }
        return infos;
    }

    //输入：username ----------- 有人对你的笔记进行了评论
    public JSONArray getNoteCommInfo(JSONObject data) throws UnsupportedEncodingException {
        JSONArray infos = new JSONArray();
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");

        User user = userRepo.findOne(username);
        List<Note> notes = noteRepo.findByUser(user);
        for(Note note:notes) {
            List<NoteComment> comments = noteCommRepo.findByNoteOrderByDateDesc(note);
            for (NoteComment comment : comments) {
                JSONObject info = new JSONObject();
                info.accumulate("sender", comment.getUser().getUsername());
                info.accumulate("content", URLDecoder.decode(comment.getContent(), "UTF-8"));
                info.accumulate("noteID", comment.getNote().getId());
                info.accumulate("noteTitle", comment.getNote().getTitle());
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                info.accumulate("time", sdf.format(comment.getDate()));

                infos.add(info);
            }
        }
        return infos;
    }



}
