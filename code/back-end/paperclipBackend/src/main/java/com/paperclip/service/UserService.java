package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserService {


    // findback
    public JSONObject findPassword(JSONObject data);

    // registerPage
    public JSONObject addUser(JSONObject data);

    // loginpage
    public JSONObject userLogin(JSONObject data);


    // message.js
    public JSONArray getUnreadMessage(JSONObject data);
    public JSONArray getBriefMessageList(JSONObject data);
    public JSONArray getConversation(JSONObject data);
    public JSONObject sendMessage(JSONObject data);

}
