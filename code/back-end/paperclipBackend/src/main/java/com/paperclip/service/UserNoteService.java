package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserNoteService {



    // UserNotePage.js
    public JSONArray getUserNote(JSONObject data);
    public JSONObject deleteUserNote(JSONObject data);



    // UserModifyNotePage.js
    public JSONObject getNoteDetail(JSONObject data);
    public JSONObject saveNote(JSONObject data);



    // viewNotePage.js
    public JSONObject getViewNoteDetail(JSONObject data);


}
