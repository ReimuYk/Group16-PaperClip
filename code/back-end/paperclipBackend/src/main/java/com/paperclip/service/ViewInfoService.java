package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface ViewInfoService {

    // UserPage.js
    public JSONObject getHostInfo(JSONObject data) throws UnsupportedEncodingException;
    public JSONObject getClientInfo(JSONObject data) throws UnsupportedEncodingException;

    // UserSettingPage.js
    public JSONObject modifyUserInfo(JSONObject data) throws UnsupportedEncodingException;

    // home
    public JSONArray getHomeInfo(JSONObject data);

    // UserFansPage.js
    public JSONArray getUserFans(JSONObject data) throws UnsupportedEncodingException;

    // viewDocPage.js
    public JSONObject getViewDocDetail(JSONObject data) throws UnsupportedEncodingException;
}
