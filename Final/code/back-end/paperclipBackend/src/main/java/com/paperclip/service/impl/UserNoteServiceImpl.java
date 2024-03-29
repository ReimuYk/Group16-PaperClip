package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.*;
import com.paperclip.dao.relationshipDao.*;
import com.paperclip.model.Entity.*;
import com.paperclip.model.Relationship.BlockPostil;
import com.paperclip.model.Relationship.StarNote;
import com.paperclip.model.Relationship.StarPaper;
import com.paperclip.model.Relationship.UserNote;
import com.paperclip.service.UserNoteService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import org.assertj.core.error.ShouldBeAfterYear;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class UserNoteServiceImpl implements UserNoteService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PaperRepository paperRepo;

    @Autowired
    private NoteRepository noteRepo;

    @Autowired
    private NoteCommentRepository noteCommRepo;

    @Autowired
    private StarNoteRepository starNoteRepo;

    @Autowired
    private UserNoteRepository userNRepo;

    @Autowired
    private FollowRepository followRepo;

    @Autowired
    private ImgServiceImpl service;

    @Autowired
    private ReplyRepository replyRepo;

    // 传入：username，paperID 传出：noteID ---------------新建note
    public JSONObject addNote(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n ====addNote==== \n get json: "+data);
        JSONObject ret = new JSONObject();
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        Long paperID = data.getLong("paperID");

        User user = userRepo.findOne(username);
        Paper paper = paperRepo.findOne(paperID);

        if(user == null || paper == null){
            return ret;
        }
        Note note = noteRepo.findDistinctByUserAndPaper(user,paper);
        if(note == null) {
            note = new Note(paper, user);
            noteRepo.save(note);
        }
        ret.accumulate("noteID", note.getId());
        return ret;
    }

    // get all the notes that this user has written
    public JSONArray getUserNote(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n==== getUserNote ==== \n get json: "+data);
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User user = userRepo.findOne(username);
        List<Note> list = noteRepo.findByUser(user);
        Iterator<Note> it = list.iterator();
        JSONArray notes = new JSONArray();
        while(it.hasNext()) {
            JSONObject note = new JSONObject();
            Note n = it.next();
            note.accumulate("ID", n.getId());
            note.accumulate("title", URLDecoder.decode(n.getTitle(), "UTF-8"));
            note.accumulate("keywords", URLDecoder.decode(n.getKeyWords(), "UTF-8"));
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            note.accumulate("date", sdf.format(n.getDate()));
            note.accumulate("paperID", n.getPaper().getId());
            note.accumulate("paperTitle", URLDecoder.decode(n.getPaper().getTitle(), "UTF-8"));
            notes.add(note);
        }
        return notes;
    }


    // delete this note with ID(noteID)
    public JSONObject deleteUserNote(JSONObject data){
        Long noteID = data.getLong("noteID");
        JSONObject result = new JSONObject();

        Note note = noteRepo.findOne(noteID);
        if(note != null) {
            List<NoteComment> l1 = noteCommRepo.findByNote(note);
            noteCommRepo.delete(l1);
            List<StarNote> l2 = starNoteRepo.findByNote(note);
            starNoteRepo.delete(l2);
            List<UserNote> l3 = userNRepo.findByNote(note);
            userNRepo.delete(l3);
            noteRepo.delete(note);
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }


    public JSONObject getNoteDetail(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n ====getNoteDetail==== \n get json: "+data);
        Long noteID = data.getLong("noteID");
        Note n = noteRepo.findOne(noteID);
        JSONObject note = new JSONObject();
        String username = "";
        try{
            username = data.getString("username");
            username = URLEncoder.encode(username, "UTF-8");
        }catch (Exception e){
            return note;
        }
        if((n == null) || (!n.getUser().getUsername().equals(username))){
            return note;
        }
        note.accumulate("ID", n.getId());
        note.accumulate("title", URLDecoder.decode(n.getTitle(), "UTF-8"));
        note.accumulate("content", URLDecoder.decode(n.getContent(), "UTF-8"));
        note.accumulate("keywords", URLDecoder.decode(n.getKeyWords(), "UTF-8"));
        note.accumulate("author", URLDecoder.decode(n.getUser().getUsername(), "UTF-8"));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        note.accumulate("date", sdf.format(n.getDate()));
        note.accumulate("authorAvatar", n.getUser().getAvatar());
        note.accumulate("authorDescription", URLDecoder.decode(n.getUser().getDescription(), "UTF-8"));
        note.accumulate("paperID", n.getPaper().getId());
        System.out.println("return: "+note);
        return note;
    }

    public JSONObject saveNote(JSONObject data) throws UnsupportedEncodingException {
        JSONObject result = new JSONObject();
        String title = data.getString("noteTitle");
        String content = data.getString("noteContent");
        String keywords = data.getString("keywords");
        title = URLEncoder.encode(title, "UTF-8");
        content = URLEncoder.encode(content, "UTF-8");
        keywords = URLEncoder.encode(keywords, "UTF-8");
        Long noteID = data.getLong("noteID");
        System.out.println("data: "+data);
        Note note = noteRepo.findOne(noteID);
        if(note != null){
            note.setTitle(title);
            note.setContent(content);
            note.setKeyWords(keywords);
            note.setDate(new Date());
            noteRepo.save(note);
            result.accumulate("result", "success");
        }else{
            result.accumulate("result", "fail");
        }
        return result;
    }


    public JSONObject getViewNoteDetail(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n ====getViewNoteDetail====\n get json: "+data);
        Long noteID = data.getLong("noteID");
        JSONObject note = new JSONObject();
        Note n = noteRepo.findOne(noteID);
        String username = "";
        try{
            username = data.getString("username");
            username = URLEncoder.encode(username, "UTF-8");
        }catch (Exception e){
            int likeNo = 0;
            List<UserNote> l1 = userNRepo.findByNote(n);
            Iterator<UserNote> it = l1.iterator();
            while (it.hasNext()){
                if(it.next().getAgreement() == 1)
                    likeNo += 1;
            }
            User author = n.getUser();
            note.accumulate("noteID", n.getId());
            note.accumulate("paperID",n.getPaper().getId());
            note.accumulate("author", URLDecoder.decode(author.getUsername(), "UTF-8"));
            note.accumulate("avatar", service.getUserHeader(author));
            note.accumulate("description", URLDecoder.decode(author.getDescription(), "UTF-8"));
            note.accumulate("title", URLDecoder.decode(n.getTitle(), "UTF-8"));
            note.accumulate("content", URLDecoder.decode(n.getContent(), "UTF-8"));

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            note.accumulate("date", sdf.format(n.getDate()));
            note.accumulate("commentNo",noteCommRepo.findByNote(n).size());
            note.accumulate("ifLike", false);
            note.accumulate("ifStar", false);
            note.accumulate("likeNo", likeNo);
            note.accumulate("ifFollow", false);

            System.out.println("return :"+note);
            return note;
        }

        if(n == null){
            return note;
        }

        User user = userRepo.findOne(username);
        boolean ifLike = false;
        boolean ifStar = false;
        boolean ifFollow = false;
        if(starNoteRepo.findDistinctByUserAndNote(user,n) != null){
            ifStar = true;
        }
        UserNote un = userNRepo.findDistinctByUserAndNote(user,n);
        if((un != null) && (un.getAgreement()==1)){
            ifLike = true;
        }

        int likeNo = 0;
        List<UserNote> l1 = userNRepo.findByNote(n);
        Iterator<UserNote> it = l1.iterator();
        while (it.hasNext()){
            if(it.next().getAgreement() == 1)
                likeNo += 1;
        }

        User author = n.getUser();
        if(followRepo.findDistinctByFolloweeAndFollower(author,user) != null){
            ifFollow = true;
        }

        note.accumulate("noteID", n.getId());
        note.accumulate("paperID",n.getPaper().getId());
        note.accumulate("author", URLDecoder.decode(author.getUsername(), "UTF-8"));
        note.accumulate("avatar", service.getUserHeader(author));
        note.accumulate("description", URLDecoder.decode(author.getDescription(), "UTF-8"));
        note.accumulate("title", URLDecoder.decode(n.getTitle(), "UTF-8"));
        note.accumulate("content", URLDecoder.decode(n.getContent(), "UTF-8"));

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        note.accumulate("date", sdf.format(n.getDate()));
        note.accumulate("commentNo",noteCommRepo.findByNote(n).size());
        note.accumulate("ifLike",ifLike);
        note.accumulate("ifStar",ifStar);
        note.accumulate("likeNo",likeNo);
        note.accumulate("ifFollow",ifFollow);

        System.out.println("return :"+note);
        return note;
    }

    public JSONArray getNoteComment(JSONObject data) throws UnsupportedEncodingException {
        Long noteID = data.getLong("noteID");

        Note n = noteRepo.findOne(noteID);
        List<NoteComment> li = noteCommRepo.findByNote(n);
        Iterator<NoteComment> it = li.iterator();

        JSONArray noteComment = new JSONArray();
        while (it.hasNext()){
            NoteComment c = it.next();
            JSONObject com = new JSONObject();
            com.accumulate("username", URLDecoder.decode(c.getUser().getUsername(), "UTF-8"));
            com.accumulate("content", URLDecoder.decode(c.getContent(), "UTF-8"));

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            com.accumulate("date",sdf.format(c.getDate()));
            noteComment.add(com);
        }
        return noteComment;
    }

    public JSONObject addNoteComment(JSONObject data) throws UnsupportedEncodingException {
        Long noteID = data.getLong("noteID");
        String username = data.getString("username");
        String content = data.getString("content");
        username = URLEncoder.encode(username, "UTF-8");
        content = URLEncoder.encode(content, "UTF-8");
        Note note = noteRepo.findOne(noteID);
        User user = userRepo.findOne(username);
        JSONObject result = new JSONObject();
        if(note == null || user == null){
            result.accumulate("result","fail");
        }
        else{
            NoteComment nc = new NoteComment(note,user,content);
            noteCommRepo.save(nc);
            result.accumulate("result","success");
            result.accumulate("commNo",noteCommRepo.findByNote(note).size());
        }
        return result;
    }

    // 传入：username，noteID  ---------------赞/取消赞 note
    public JSONObject agreeNote(JSONObject data){
        JSONObject result = new JSONObject();
        Long noteID = data.getLong("noteID");
        String username = "";
        try{
            username = data.getString("username");
            username = URLEncoder.encode(username, "UTF-8");
        }catch (Exception e){
            result.accumulate("result", "fail");
            return result;
        }
        Note note = noteRepo.findOne(noteID);
        User user = userRepo.findOne(username);
        UserNote un = userNRepo.findDistinctByUserAndNote(user,note);
        if(un == null){//赞
            un = new UserNote(user,note);
            un.setAgreement(1);
            note.setAgreement(note.getAgreement()+1);
        }else{
            if(un.getAgreement() == 1){//取消赞
                un.setAgreement(0);
                note.setAgreement(note.getAgreement()-1);
            }else{//赞
                un.setAgreement(1);
                note.setAgreement(note.getAgreement()+1);
            }

        }
        userNRepo.save(un);
        noteRepo.save(note);

        result.accumulate("result","success");
        result.accumulate("likeNo",noteRepo.findOne(noteID).getAgreement());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        result.accumulate("date",sdf.format(noteRepo.findOne(noteID).getDate()));
        return result;
    }

    // 传入：username，noteID  ---------------收藏/取消收藏 note
    public JSONObject starNote(JSONObject data) throws UnsupportedEncodingException {
        Long noteID = data.getLong("noteID");
        String username = "";
        JSONObject result = new JSONObject();
        try{
            username = data.getString("username");
            username = URLEncoder.encode(username, "UTF-8");
        }catch (Exception e){
            result.accumulate("result", "fail");
            return result;
        }
        Note note = noteRepo.findOne(noteID);
        User user = userRepo.findOne(username);
        StarNote sn = starNoteRepo.findDistinctByUserAndNote(user,note);

        if(sn == null){
            sn = new StarNote(user,note);
            note.setStar(note.getStar()+1);
            starNoteRepo.save(sn);
            noteRepo.save(note);
            result.accumulate("result","success");
        }
        else{
            result.accumulate("result","fail");
        }
        return result;
    }


}
