package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserStarService {
    // StarDocPage.js
    public JSONArray getStarDoc(JSONObject data);
    public JSONObject quitStarDoc(JSONObject data);

    // StarNotePage.js
    public JSONArray getStarNote(JSONObject data);
    public JSONObject quitStarNote(JSONObject data);

    // StarPaperPage.js
    public JSONArray getStarPaper(JSONObject data);
    public JSONObject quitStarPaper(JSONObject data);

    // StarUserPage.js
    public JSONArray getStarUser(JSONObject data);
    public JSONObject quitStarUser(JSONObject data);
    public JSONObject starUser(JSONObject data);
}
