package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface UserService {


    // findback
    JSONObject findPassword(JSONObject data) throws UnsupportedEncodingException;

    // registerPage
    JSONObject addUser(JSONObject data) throws UnsupportedEncodingException;

    // loginpage
    JSONObject userLogin(JSONObject data) throws UnsupportedEncodingException;


    // message.js
    JSONArray getUnreadMessage(JSONObject data) throws UnsupportedEncodingException;
    JSONObject getBriefMessageList(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getConversation(JSONObject data) throws UnsupportedEncodingException;
    JSONObject sendMessage(JSONObject data) throws UnsupportedEncodingException;

    //invitation
    JSONArray getInvitations(JSONObject data) throws UnsupportedEncodingException;
    JSONObject replyInvitation(JSONObject data);

    //评论、回复 通知
    JSONArray getNoteCommInfo(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getPostilCommentInfo(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getCommentReply(JSONObject data) throws UnsupportedEncodingException;
}
