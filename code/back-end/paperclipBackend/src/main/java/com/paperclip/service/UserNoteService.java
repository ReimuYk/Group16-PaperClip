package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserNoteService {
    // paperpage.js
    JSONObject addNote(JSONObject data);

    // UserNotePage.js
    JSONArray getUserNote(JSONObject data);
    JSONObject deleteUserNote(JSONObject data);


    // UserModifyNotePage.js
    JSONObject getNoteDetail(JSONObject data);
    JSONObject saveNote(JSONObject data);



    // viewNotePage.js
    JSONObject getViewNoteDetail(JSONObject data);
    JSONArray getNoteComment(JSONObject data);
    JSONObject addNoteComment(JSONObject data);
    JSONObject agreeNote(JSONObject data);
    JSONObject starNote(JSONObject data);




}
