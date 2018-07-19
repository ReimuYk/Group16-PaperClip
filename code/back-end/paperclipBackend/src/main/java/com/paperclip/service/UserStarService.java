package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserStarService {

    // StarNotePage.js
    JSONArray getStarNote(JSONObject data);
    JSONObject quitStarNote(JSONObject data);

    // StarPaperPage.js
    JSONArray getStarPaper(JSONObject data);
    JSONObject quitStarPaper(JSONObject data);

    // StarUserPage.js
    JSONArray getStarUser(JSONObject data);
    JSONObject quitStarUser(JSONObject data);
    JSONObject starUser(JSONObject data);
}
