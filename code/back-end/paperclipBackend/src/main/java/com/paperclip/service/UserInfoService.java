package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserInfoService {

    // UserDocPage.js
    public JSONArray getUserDoc(JSONObject data);
    public JSONObject deleteUserDoc(JSONObject data);

    // UserDocDetailPage
    public JSONArray getUserDocDetail(JSONObject data);
    public JSONObject deleteUserDocVersion(JSONObject data);

    // UserFansPage.js
    public JSONArray getUserFans(JSONObject data);

    // UserNotePage.js
    public JSONArray getUserNote(JSONObject data);
    public JSONObject deleteUserNote(JSONObject data);

    // UserModifyDocPage.js
    public JSONObject getDocDetail(JSONObject data);
    public JSONObject saveDoc(JSONObject data);
    public JSONObject addDocContributer(JSONObject data);
    public JSONArray getContributeDoc(JSONObject data);

    // UserModifyNotePage.js
    public JSONObject getNoteDetail(JSONObject data);
    public JSONObject saveNote(JSONObject data);

    // UserPage.js
    public JSONObject getHostInfo(JSONObject data);
    public JSONObject getClientInfo(JSONObject data);

    // UserSettingPage.js
    public JSONObject modifyUserInfo(JSONObject data);

    // home
    public JSONArray getHomeInfo(JSONObject data);

    // viewNotePage.js
    public JSONObject getViewNoteDetail(JSONObject data);

    // writeDocPage.js
    public JSONObject addDoc(JSONObject data);
}
