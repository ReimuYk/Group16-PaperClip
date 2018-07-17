package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserDocService {

    // UserDocPage.js
    public JSONArray getUserDoc(JSONObject data);
    public JSONObject deleteUserDoc(JSONObject data);

    // UserDocDetailPage
    public JSONObject getUserDocDetail(JSONObject data);
    public JSONObject deleteUserDocVersion(JSONObject data);

    // UserModifyDocPage.js
    public JSONObject getDocDetail(JSONObject data);
    public JSONObject saveDoc(JSONObject data);
    public JSONObject addDocContributer(JSONObject data);
    public JSONArray getContributeDoc(JSONObject data);

    // writeDocPage.js
    public JSONObject addDoc(JSONObject data);
    public JSONObject publishDoc(JSONObject data);
}
