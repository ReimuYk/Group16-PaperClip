package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface UserNoteService {
    // paperpage.js
    JSONObject addNote(JSONObject data) throws UnsupportedEncodingException;

    // UserNotePage.js
    JSONArray getUserNote(JSONObject data) throws UnsupportedEncodingException;
    JSONObject deleteUserNote(JSONObject data);


    // UserModifyNotePage.js
    JSONObject getNoteDetail(JSONObject data) throws UnsupportedEncodingException;
    JSONObject saveNote(JSONObject data) throws UnsupportedEncodingException;



    // viewNotePage.js
    JSONObject getViewNoteDetail(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getNoteComment(JSONObject data) throws UnsupportedEncodingException;
    JSONObject addNoteComment(JSONObject data) throws UnsupportedEncodingException;
    JSONObject agreeNote(JSONObject data);
    JSONObject starNote(JSONObject data) throws UnsupportedEncodingException;




}
