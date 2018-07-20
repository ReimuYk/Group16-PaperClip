package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface PaperService {
    // paperpage.js
    JSONObject getPaperDetail(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getBlockPostils(JSONObject data) throws UnsupportedEncodingException;
    JSONObject statPostil(JSONObject data) throws UnsupportedEncodingException;

    //paperpage.js
    JSONObject addPostilComment(JSONObject data) throws UnsupportedEncodingException;
    JSONObject addPostil(JSONObject data) throws UnsupportedEncodingException;
    JSONObject starPaper(JSONObject data) throws UnsupportedEncodingException;
    JSONObject ifStar(JSONObject data) throws UnsupportedEncodingException;
    JSONObject getNoteList(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getKeywords(JSONObject data);
    JSONObject hasAccess(JSONObject data) throws UnsupportedEncodingException;
}

