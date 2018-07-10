package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserService {
    // StarDocPage.js
    public JSONArray getStarDoc(String username);
    public JSONObject quitStarDoc(String username, int docID);

    // StarNotePage.js
    public JSONArray getStarNote(String username);
    public JSONObject quitStarNote(String username, int noteID);

    // StarPaperPage.js
    public JSONArray getStarPaper(String username);
    public JSONObject quitStarPaper(String username, int paperID);

    // StarUserPage.js
    public JSONArray getStarUser(String username);
    public JSONObject quitStarUser(String hostname, String clientname);
    public JSONObject starUser(String hostname, String clientname);

    // UserDocPage.js
    public JSONArray getUserDoc(String username);
    public JSONObject deleteUserDoc(int docID);
    public JSONObject deleteUserDocVersion(int docID, int docVersion);

    // UserFansPage.js
    public JSONArray getUserFans(String username);

    // UserNotePage.js
    public JSONArray getUserNote(String username);
    public JSONObject deleteUserNote(int noteID);

    // UserModifyDocPage.js
    public JSONObject getDocDetail(int docID);
    public JSONObject saveDoc(int docID, String docTitle, String docContent);
    public JSONObject addDocContributer(int docID, String contributerName);

    // UserModifyNotePage.js
    public JSONObject getNoteDetail(int noteID);
    public JSONObject saveNote(int noteID, String noteTitle, String noteContent);

    // UserPage.js
    public JSONObject getUserInfo(String username);

    // UserSettingPage.js
    public JSONObject modifyUserInfo(String username, String password, String userHeader, String userDescription);

    // viewDocPage.js
    public JSONObject getViewDocDetail(int docID, int version);

    // viewNotePage.js
    public JSONObject getViewNoteDetail(int noteID);

    // writeDocPage.js
    public JSONObject addDoc(String username, String title, String content);

    // findback
    public JSONObject findPassword(String userEmail);

    // registerPage
    public JSONObject addUser(String username, String password, String email);

    // loginpage
    public JSONObject userLogin(String username, String password);

    // home
    public JSONArray getHomeInfo(String username);

    // searchpage
    public JSONArray searchPaper(String searchText);

    // message.js
    public JSONArray getMessageInfo(String username);
    public JSONObject sendMessage(String hostname, String clientname, String content);

    // paperpage.js
    public JSONObject getPaperDetail(String username, int paperID, int pagination);
}
