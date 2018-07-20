package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface UserStarService {

    // StarNotePage.js
    JSONArray getStarNote(JSONObject data) throws UnsupportedEncodingException;
    JSONObject quitStarNote(JSONObject data);

    // StarPaperPage.js
    JSONArray getStarPaper(JSONObject data) throws UnsupportedEncodingException;
    JSONObject quitStarPaper(JSONObject data);

    // StarUserPage.js
    JSONArray getStarUser(JSONObject data) throws UnsupportedEncodingException;
    JSONObject quitStarUser(JSONObject data) throws UnsupportedEncodingException;
    JSONObject starUser(JSONObject data) throws UnsupportedEncodingException;

    JSONArray getRecentFans(JSONObject data) throws UnsupportedEncodingException;
}
