package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserService {
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

    // UserDocPage.js
    public JSONArray getUserDoc(JSONObject data);
    public JSONObject deleteUserDoc(JSONObject data);
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

    // viewDocPage.js
    public JSONObject getViewDocDetail(JSONObject data);

    // viewNotePage.js
    public JSONObject getViewNoteDetail(JSONObject data);

    // writeDocPage.js
    public JSONObject addDoc(JSONObject data);

    // findback
    public JSONObject findPassword(JSONObject data);

    // registerPage
    public JSONObject addUser(JSONObject data);

    // loginpage
    public JSONObject userLogin(JSONObject data);

    // home
    public JSONArray getHomeInfo(JSONObject data);

    // searchpage
    public JSONArray searchPaper(JSONObject data);

    // message.js
    public JSONArray getMessageInfo(JSONObject data);
    public JSONObject sendMessage(JSONObject data);

    // paperpage.js
    public JSONObject getPaperDetail(JSONObject data);
}
