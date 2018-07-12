package com.paperclip.service.impl;

import com.paperclip.service.UserNoteService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
public class UserNoteServiceImpl implements UserNoteService {




    // get all the notes that this user has written
    public JSONArray getUserNote(JSONObject data){
        JSONArray notes = new JSONArray();
        return notes;
    }



    // delete this note with ID(noteID)
    public JSONObject deleteUserNote(JSONObject data){
        JSONObject result = new JSONObject();
        if(true) {
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }



    public JSONObject getNoteDetail(JSONObject data) {
        JSONObject note = new JSONObject();
        note.accumulate("ID", 1);
        note.accumulate("title", "this is a note title");
        note.accumulate("content", "this is the content of this note");
        note.accumulate("keywords", "keyword1, keyword2, keyword3");
        return note;
    }

    public JSONObject saveNote(JSONObject data) {
        JSONObject result = new JSONObject();
        if(true){
            result.accumulate("result", "success");
        }else{
            result.accumulate("result", "fail");
        }
        return result;
    }



    public JSONObject getViewNoteDetail(JSONObject data) {
        JSONObject note = new JSONObject();
        note.accumulate("noteID", 3);
        note.accumulate("author", "note's author");
        note.accumulate("title", "note title");
        note.accumulate("content", "this is the content of the note");
        Calendar calendar = Calendar.getInstance();
        note.accumulate("date", calendar.get(Calendar.YEAR)+"-"+
                calendar.get(Calendar.MONDAY)+"-"+
                calendar.get(Calendar.DATE));
        return note;
    }

}
