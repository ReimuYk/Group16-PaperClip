package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface UserService {


    // findback
    JSONObject findPassword(JSONObject data);

    // registerPage
    JSONObject addUser(JSONObject data);

    // loginpage
    JSONObject userLogin(JSONObject data);


    // message.js
    JSONArray getUnreadMessage(JSONObject data);
    JSONArray getBriefMessageList(JSONObject data);
    JSONArray getConversation(JSONObject data);
    JSONObject sendMessage(JSONObject data);

}
