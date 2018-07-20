package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface UserService {


    // findback
    JSONObject findPassword(JSONObject data);

    // registerPage
    JSONObject addUser(JSONObject data) throws UnsupportedEncodingException;

    // loginpage
    JSONObject userLogin(JSONObject data) throws UnsupportedEncodingException;


    // message.js
    JSONArray getUnreadMessage(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getBriefMessageList(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getConversation(JSONObject data) throws UnsupportedEncodingException;
    JSONObject sendMessage(JSONObject data) throws UnsupportedEncodingException;

}
