package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.NoteCommentRepository;
import com.paperclip.dao.entityDao.NoteRepository;
import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.dao.relationshipDao.StarNoteRepository;
import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.NoteComment;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.StarNote;
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

        Note n = noteRepo.findOne(noteID);
        JSONObject note = new JSONObject();
        if(n == null){
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

        Note n = noteRepo.findOne(noteID);
        JSONObject note = new JSONObject();
        if(n == null){
            return note;
        }
        note.accumulate("noteID", n.getId());
        note.accumulate("author", n.getUser().getUsername());
        note.accumulate("title", n.getTitle());
        note.accumulate("content", n.getContent());
        note.accumulate("date", n.getDate());
        return note;
    }

}
