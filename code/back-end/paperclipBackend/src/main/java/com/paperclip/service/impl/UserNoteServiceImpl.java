package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.NoteCommentRepository;
import com.paperclip.dao.entityDao.NoteRepository;
import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.dao.relationshipDao.StarNoteRepository;
import com.paperclip.dao.relationshipDao.UserNoteRepository;
import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.NoteComment;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.StarNote;
import com.paperclip.model.Relationship.UserNote;
import com.paperclip.service.UserNoteService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.stereotype.Service;

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

    // 传入：username，paperID 传出：noteID ---------------新建note
    public JSONObject addNote(JSONObject data){
        JSONObject ret = new JSONObject();
        String username = data.getString("username");
        Long paperID = data.getLong("paperID");

        User user = userRepo.findOne(username);
        Paper paper = paperRepo.findOne(paperID);

        if(user == null || paper == null){
            return ret;
        }
        Note note = new Note(paper,user);
        noteRepo.save(note);
        ret.accumulate("noteID",note.getId());
        return ret;
    }

    // get all the notes that this user has written
    public JSONArray getUserNote(JSONObject data){
        String username = data.getString("username");

        User user = userRepo.findOne(username);
        List<Note> list = noteRepo.findByUser(user);
        Iterator<Note> it = list.iterator();
        JSONArray notes = new JSONArray();
        while(it.hasNext()) {
            JSONObject note = new JSONObject();
            Note n = it.next();
            note.accumulate("ID",n.getId());
            note.accumulate("title",n.getTitle());
            note.accumulate("keywords",n.getKeyWords());
            note.accumulate("date",n.getDate());
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
            noteRepo.delete(note);
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }


    public JSONObject getNoteDetail(JSONObject data) {
        Long noteID = data.getLong("noteID");
        String username = data.getString("username");

        Note n = noteRepo.findOne(noteID);
        JSONObject note = new JSONObject();
        if((n == null) || (!n.getUser().getUsername().equals(username))){
            return note;
        }
        note.accumulate("ID", n.getId());
        note.accumulate("title", n.getTitle());
        note.accumulate("content", n.getContent());
        note.accumulate("keywords", n.getKeyWords());
        return note;
    }

    public JSONObject saveNote(JSONObject data) {
        JSONObject result = new JSONObject();
        String title = data.getString("noteTitle");
        String content = data.getString("noteContent");
        String keywords = data.getString("keywords");
        Long noteID = data.getLong("noteID");

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


    public JSONObject getViewNoteDetail(JSONObject data) {
        Long noteID = data.getLong("noteID");
        String username = data.getString("username");

        JSONObject note = new JSONObject();
        Note n = noteRepo.findOne(noteID);
        if(n == null){
            return note;
        }

        User user = userRepo.findOne(username);
        boolean ifLike = false;
        boolean ifStar = false;
        if(starNoteRepo.findByNote(n) != null){
            ifStar = true;
        }
        UserNote un = userNRepo.findDistinctByUserAndNote(user,n);
        if((un != null) && (un.getAgreement()==1)){
            ifLike = true;
        }
        User author = n.getUser();
        note.accumulate("noteID", n.getId());
        note.accumulate("author", author.getUsername());
        note.accumulate("avatar", author.getAvatar());
        note.accumulate("description",author.getDescription());
        note.accumulate("title", n.getTitle());
        note.accumulate("content", n.getContent());
        note.accumulate("date", n.getDate());
        note.accumulate("commentNo",noteCommRepo.findByNote(n).size());
        note.accumulate("ifLike",ifLike);
        note.accumulate("ifStar",ifStar);
        return note;
    }

    public JSONArray getNoteComment(JSONObject data){
        Long noteID = data.getLong("noteID");

        Note n = noteRepo.findOne(noteID);
        List<NoteComment> li = noteCommRepo.findByNote(n);
        Iterator<NoteComment> it = li.iterator();

        JSONArray noteComment = new JSONArray();
        while (it.hasNext()){
            NoteComment c = it.next();
            JSONObject com = new JSONObject();
            com.accumulate("username",c.getUser().getUsername());
            com.accumulate("content",c.getContent());
            com.accumulate("date",c.getDate());
            noteComment.add(com);
        }
        return noteComment;
    }

    public JSONObject addNoteComment(JSONObject data){
        Long noteID = data.getLong("noteID");
        String username = data.getString("username");
        String content = data.getString("content");

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
        }
        return result;
    }

    // 传入：username，paperID  ---------------赞/取消赞 note
    public JSONObject agreeNote(JSONObject data){
        Long noteID = data.getLong("noteID");
        String username = data.getString("username");
        Note note = noteRepo.findOne(noteID);
        User user = userRepo.findOne(username);
        UserNote un = userNRepo.findDistinctByUserAndNote(user,note);
        if(un == null){
            un = new UserNote(user,note);
            un.setAgreement(1);
        }else{
            un.setAgreement((un.getAgreement()+1)%2);
        }
        userNRepo.save(un);
        JSONObject result = new JSONObject();
        result.accumulate("result","success");
        return result;
    }

    // 传入：username，paperID  ---------------收藏/取消收藏 note
    public JSONObject starNote(JSONObject data){
        Long noteID = data.getLong("noteID");
        String username = data.getString("username");
        Note note = noteRepo.findOne(noteID);
        User user = userRepo.findOne(username);
        StarNote sn = starNoteRepo.findDistinctByUserAndNote(user,note);
        if(sn == null){
            sn = new StarNote(user,note);
            starNoteRepo.save(sn);
        }
        else{
            starNoteRepo.delete(sn);
        }
        JSONObject result = new JSONObject();
        result.accumulate("result","success");
        return result;
    }
}
