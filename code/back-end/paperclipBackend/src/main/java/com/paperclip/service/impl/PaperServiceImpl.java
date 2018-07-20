package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.*;
import com.paperclip.dao.relationshipDao.AssistRepository;
import com.paperclip.dao.relationshipDao.BlockPostilRepository;
import com.paperclip.dao.relationshipDao.StarPaperRepository;
import com.paperclip.dao.relationshipDao.UserPostilRepository;
import com.paperclip.model.Entity.*;
import com.paperclip.model.Relationship.Assist;
import com.paperclip.model.Relationship.BlockPostil;
import com.paperclip.model.Relationship.StarPaper;
import com.paperclip.model.Relationship.UserPostil;
import com.paperclip.service.PaperService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;

import java.io.*;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;



@Service
public class PaperServiceImpl implements PaperService {
    @Autowired
    PaperRepository paperRepo;

    @Autowired
    PaperPageRepository paperPageRepo;

    @Autowired
    BlockRepository blockRepo;

    @Autowired
    BlockPostilRepository blockPRepo;

    @Autowired
    PostilRepository postilRepo;

    @Autowired
    PostilCommentRepository postilCommRepo;

    @Autowired
    UserPostilRepository userPRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    private StarPaperRepository starPaperRepo;

    @Autowired
    private NoteRepository noteRepo;

    @Autowired
    private DocumentPdfRepository docPdfRepo;

    public String GetImageStrFromPath(String imgPath) {
        InputStream in = null;
        byte[] data = null;
        // 读取图片字节数组
        try {
            in = new FileInputStream(imgPath);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        // 返回Base64编码过的字节数组字符串
        return encoder.encode(data);
    }

    public JSONArray parsePoint(String ptrStr){
        ptrStr = ptrStr.substring(1,ptrStr.length()-1);
        String[] p = ptrStr.split(",");
        int x = Integer.parseInt(p[0]);
        int y;
        if (p[1].charAt(0)==' '){
            y = Integer.parseInt(p[1].substring(1));
        }else{
            y = Integer.parseInt(p[1]);
        }
        JSONArray res = new JSONArray();
        res.add(x);
        res.add(y);
        return res;
    }

    public JSONObject getPaperDetail(JSONObject data) throws UnsupportedEncodingException {
        JSONObject paper = new JSONObject();
        Long paperID = data.getLong("paperID");
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        int pagination = data.getInt("pagination");

        User user = userRepo.findOne(username);

        Paper p = paperRepo.findOne(paperID);
        List<PaperPage> pagelist = paperPageRepo.findByPaper(p);
        PaperPage page = null;
        for (PaperPage pp:pagelist){
            if (pp.getPagination()==pagination){
                page = pp;
                break;
            }
        }
        List<Block> blist = blockRepo.findByPaperPage(page);
        String pageurl = page.getContentUrl();
        pageurl = String.format("./data/pic/%d/%s",paperID,pageurl);
        String b64str = this.GetImageStrFromPath(pageurl);
        b64str = "data:image/jpg;base64,"+b64str;


        JSONArray blocklist = new JSONArray();
        for (Block b:blist){
            JSONObject blk = new JSONObject();
            blk.accumulate("id",b.getId());
            String st = b.getStartPoint();
            blk.accumulate("start",parsePoint(st));
            String ed = b.getEndPoint();
            blk.accumulate("end",parsePoint(ed));
            blocklist.add(blk);
        }

        JSONArray marked = new JSONArray();
        List<Postil> poslist = blockPRepo.findDistinctPostilByBlock(blist);
        List<UserPostil> uplist = userPRepo.findByUserAndMarkAndPostilIn(user,1,poslist);
        for (UserPostil up:uplist){
            JSONObject obj = new JSONObject();
            List<BlockPostil> bplist = blockPRepo.findByPostil(up.getPostil());
            JSONArray bid = new JSONArray();
            for (BlockPostil bp:bplist){
                bid.add(bp.getBlock().getId());
            }
            obj.accumulate("id",bid);
            obj.accumulate("content", URLDecoder.decode(up.getPostil().getContent(), "UTF-8"));
            obj.accumulate("posID",up.getPostil().getId());
            obj.accumulate("visible",false);
            marked.add(obj);
        }
        int pagenum = p.getPageNum();

        paper.accumulate("b64str",b64str);
        paper.accumulate("blocklist", blocklist);
        paper.accumulate("marked", marked);
        paper.accumulate("pagenum",pagenum);
        return paper;
    }

    public JSONArray getBlockPostils(JSONObject data) throws UnsupportedEncodingException {
        Long paperID = data.getLong("paperID");
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        int pagination = data.getInt("pagination");
        JSONArray blist = data.getJSONArray("selectid");
        List<Block> blocklist = new ArrayList<Block>();
        for (int i=0;i<blist.size();i++){
            Long bid = blist.getLong(i);
            Block b = blockRepo.findOne(bid);
            blocklist.add(b);
        }
        List<Postil> poslist = blockPRepo.findDistinctPostilByBlock(blocklist);
        JSONArray res = new JSONArray();
        for (Postil p:poslist){
            JSONObject obj = new JSONObject();
            //postils:{user:xxx,content:xxx,agree:xxx,disagree:xxx}
            JSONObject postils = new JSONObject();
            postils.accumulate("posID",p.getId());
            postils.accumulate("user", URLDecoder.decode(p.getUser().getUsername(), "UTF-8"));
            postils.accumulate("content",URLDecoder.decode(p.getContent(), "UTF-8"));
            postils.accumulate("agree",p.getAgreement());
            postils.accumulate("disagree",p.getDisagreement());
            obj.accumulate("postils",postils);
            //comments:[{user:xxx,content:xx},{...}]
            List<PostilComment> pclist = postilCommRepo.findByPostil(p);
            JSONArray comments = new JSONArray();
            for (PostilComment pc:pclist){
                JSONObject commitem = new JSONObject();
                User u = pc.getUser();
                commitem.accumulate("user", URLDecoder.decode(u.getUsername(), "UTF-8"));
                commitem.accumulate("content", URLDecoder.decode(pc.getContent(), "UTF-8"));
                comments.add(commitem);
            }
            obj.accumulate("comments",comments);
            //marked: 0/1
            //agreement:{agreed:T/F,disagreed:T/F}
            User user = userRepo.findOne(username);
            List<UserPostil> uplist = userPRepo.findByUserAndPostil(user,p);
            JSONObject agreement = new JSONObject();
            if (uplist.isEmpty()){
                obj.accumulate("marked",0);
                agreement.accumulate("agreed",false);
                agreement.accumulate("disagreed",false);
            }else{
                UserPostil up = uplist.get(0);
                System.out.println("pos:"+up.getPostil().getContent()+" mark:"+up.getMark());
                int marked = up.getMark();
                obj.accumulate("marked",marked);
                int agr = up.getAgreement();
                if (agr==-1){
                    agreement.accumulate("agreed",false);
                    agreement.accumulate("disagreed",true);
                }else if (agr==0){
                    agreement.accumulate("agreed",false);
                    agreement.accumulate("disagreed",false);
                }else if (agr==1){
                    agreement.accumulate("agreed",true);
                    agreement.accumulate("disagreed",false);
                }
            }
            obj.accumulate("agreement",agreement);
            res.add(obj);
        }
        return res;
    }

    public JSONObject statPostil(JSONObject data) throws UnsupportedEncodingException {
        Long posID = data.getLong("posID");
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        int marked = data.getInt("marked");
        JSONObject agreement = data.getJSONObject("agreement");
        JSONArray flag = data.getJSONArray("flag");
        System.out.println(posID);
        System.out.println(marked);
        System.out.println(agreement);
        System.out.print(flag);

        Postil pos = postilRepo.findOne(posID);
        pos.setAgreement(pos.getAgreement()+flag.getInt(0));
        pos.setDisagreement(pos.getDisagreement()+flag.getInt(1));
        postilRepo.save(pos);
        User user = userRepo.findOne(username);
        List<UserPostil> uplist = userPRepo.findByUserAndPostil(user,pos);
        UserPostil up;
        if (uplist.isEmpty()){
            up = new UserPostil(user,pos);
        }else{
            up = uplist.get(0);
        }
        up.setMark(marked);
        if (agreement.getBoolean("agreed")){
            up.setAgreement(1);
        }else if (agreement.getBoolean("disagreed")){
            up.setAgreement(-1);
        }else{
            up.setAgreement(0);
        }
        userPRepo.save(up);
        JSONObject res = new JSONObject();
        res.accumulate("stat","success");
        return res;
    }

    // 传入：username，posID，content  ---------------对批注进行评论
    public JSONObject addPostilComment(JSONObject data) throws UnsupportedEncodingException {
        Long postilID = data.getLong("posID");
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        String content = data.getString("content");
        content = URLEncoder.encode(content, "UTF-8");

        Postil postil = postilRepo.findOne(postilID);
        User user = userRepo.findOne(username);
        JSONObject result = new JSONObject();
        if(postil == null || user == null){
            result.accumulate("result","fail");
        }
        else{
            PostilComment pc = new PostilComment(postil,user,content);
            postilCommRepo.save(pc);
            result.accumulate("result","success");
        }
        return result;
    }

    // 传入：blockList,username,content  ---------------对选中的block做批注
    @SuppressWarnings("unchecked")
    public JSONObject addPostil(JSONObject data) throws UnsupportedEncodingException {
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        String content = data.getString("content");
        content = URLEncoder.encode(content, "UTF-8");
        JSONArray blist = data.getJSONArray("blockList");
        List<Block> blocklist = new ArrayList<Block>();
        for (int i=0;i<blist.size();i++){
            Long bid = blist.getLong(i);
            Block b = blockRepo.findOne(bid);
            blocklist.add(b);
        }
        Iterator<Block> blocks = blocklist.iterator();

        JSONObject result = new JSONObject();
        User user = userRepo.findOne(username);
        if(user == null){
            result.accumulate("result","fail");
        }
        else {
            Postil postil = new Postil(user, content);
            postilRepo.save(postil);
            result.accumulate("posID",postil.getId());
            while (blocks.hasNext()) {
                BlockPostil bp = new BlockPostil(blocks.next(), postil);
                blockPRepo.save(bp);
                result.accumulate("result","success");
            }
            UserPostil up = new UserPostil(user,postil);
            up.setMark(1);
            userPRepo.save(up);
        }
        return result;
    }

    // 传入：paperID,username  ---------------是否收藏过这篇论文
    public JSONObject ifStar(JSONObject data) throws UnsupportedEncodingException {
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        Long paperID = data.getLong("paperID");

        Paper paper = paperRepo.findOne(paperID);
        User user = userRepo.findOne(username);

        JSONObject result = new JSONObject();
        if(paper == null || user == null){
            result.accumulate("result","fail");
        }
        else{
            result.accumulate("result","success");
            if(starPaperRepo.findDistinctByUserAndPaper(user,paper)!=null){
                result.accumulate("ifStar",true);
            }
            else{
                result.accumulate("ifStar",false);
            }
        }
        return result;
    }

    // 传入：paperID,username  ---------------收藏/取消收藏论文
    public JSONObject starPaper(JSONObject data) throws UnsupportedEncodingException {
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        Long paperID = data.getLong("paperID");

        Paper paper = paperRepo.findOne(paperID);
        User user = userRepo.findOne(username);
        JSONObject result = new JSONObject();
        if(paper == null || user == null){
            result.accumulate("result","fail");
        }
        else{
            StarPaper sp = starPaperRepo.findDistinctByUserAndPaper(user,paper);
            if(sp == null){//收藏
                sp = new StarPaper(user,paper);
                starPaperRepo.save(sp);
                if(paper.getStar()!=null){
                    paper.setStar(paper.getStar()+1);
                }else{
                    paper.setStar(1);
                }
                paperRepo.save(paper);
                result.accumulate("result","success");
            }
            else {
                result.accumulate("result","fail");
            }
        }
        return result;
    }

    //输入：paperID ---------------- 获取与某一篇论文有关的笔记列表
    public JSONObject getNoteList(JSONObject data) throws UnsupportedEncodingException {
        JSONObject result = new JSONObject();
        JSONArray datas = new JSONArray();
        Long paperID = data.getLong("paperID");
        Paper paper = paperRepo.findOne(paperID);

        DocumentPdf docP = docPdfRepo.findOne(paperID);
        if(docP != null) {//是docPdf,则获取版本列表
            List<DocumentPdf> docPs = docPdfRepo.findByDocument(docP.getDocument());
            for(DocumentPdf d: docPs){
                JSONObject version = new JSONObject();
                version.accumulate("id",d.getId());
                version.accumulate("title", URLDecoder.decode(d.getTitle(), "UTF-8")+" - version: "+d.getVersion());
                SimpleDateFormat sdf = new SimpleDateFormat("EEEE-MMMM-dd-yyyy");
                version.accumulate("intro","编辑于"+sdf.format(d.getDate()));
                datas.add(version);
            }
            result.accumulate("type","version");
            result.accumulate("data",datas);
            return result;
        }

        List<Note> l = noteRepo.findByPaper(paper);
        Iterator<Note> it = l.iterator();
        while(it.hasNext()){
            JSONObject note = new JSONObject();
            Note n = it.next();
            note.accumulate("id",n.getId());
            note.accumulate("title", URLDecoder.decode(n.getTitle(), "UTF-8"));
            int end = 20;
            if(n.getContent().length()<20){
                end = n.getContent().length();
            }
            note.accumulate("intro", URLDecoder.decode(n.getContent().substring(0,end), "UTF-8"));
            datas.add(note);
        }
        result.accumulate("type","note");
        result.accumulate("data",datas);
        return result;
    }

    //使用List判断元素是否已经存在于数组中
    public static boolean inList(List<String> myList,String targetValue){
        String[] arr = myList.toArray(new String[myList.size()]);
        return ArrayUtils.contains(arr,targetValue);
    }
    //输入：paperID
    public JSONArray getKeywords(JSONObject data){
        JSONArray keywords = new JSONArray();
        Long paperID = data.getLong("paperID");
        Paper paper = paperRepo.findOne(paperID);
        List<Note> l = noteRepo.findByPaper(paper);
        Iterator<Note> it = l.iterator();

        List<String> keys = new ArrayList<>();
        while(it.hasNext()){
            Note n = it.next();
            String str = n.getKeyWords();
            String[] ll = str.split(";");
            for(String word:ll){
                if(!inList(keys,word)){
                    keys.add(word);
                    keywords.add(word);
                }
            }
        }
        String str = paper.getKeyWords();
        String[] ll = str.split(";");
        for(String word:ll){
            if(!inList(keys,word)){
                keys.add(word);
                keywords.add(word);
            }
        }
        System.out.println(keywords.toString());
        return keywords;
    }

    @Autowired
    private AssistRepository assistRepo;
    //输入paperID,username ------------ 判断是否是docPDF，如果是，访问者是否有权限访问
    public JSONObject hasAccess(JSONObject data) throws UnsupportedEncodingException {
        Long paperID = data.getLong("paperID");
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        JSONObject result = new JSONObject();

        DocumentPdf docP = docPdfRepo.findOne(paperID);
        if(docP != null){//是docPdf
            System.out.println("user:"+username+" author:"+docP.getAuthor());
            if(!docP.getAuthor().equals(username)){
                List<Assist> ass = assistRepo.findByDocument(docP.getDocument());
                for(Assist a:ass){
                    if(a.getUser().getUsername().equals(username)){
                        result.accumulate("result","success");
                        return result;
                    }
                }
                result.accumulate("result","fail");
                return result;
            }
        }
        result.accumulate("result","success");
        return result;
    }
}
