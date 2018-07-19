package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface PaperService {
    // paperpage.js
    JSONObject getPaperDetail(JSONObject data);
    JSONArray getBlockPostils(JSONObject data);
    JSONObject statPostil(JSONObject data);

    //paperpage.js
    JSONObject addPostilComment(JSONObject data);
    JSONObject addPostil(JSONObject data);
    JSONObject starPaper(JSONObject data);
    JSONObject ifStar(JSONObject data);
    JSONObject getNoteList(JSONObject data);
    JSONArray getKeywords(JSONObject data);
    JSONObject hasAccess(JSONObject data);
}

