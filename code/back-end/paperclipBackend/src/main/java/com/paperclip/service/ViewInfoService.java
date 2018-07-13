package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface ViewInfoService {

    // UserPage.js
    public JSONObject getHostInfo(JSONObject data);
    public JSONObject getClientInfo(JSONObject data);

    // UserSettingPage.js
    public JSONObject modifyUserInfo(JSONObject data);

    // home
    public JSONArray getHomeInfo(JSONObject data);

    // UserFansPage.js
    public JSONArray getUserFans(JSONObject data);

    // viewDocPage.js
    public JSONObject getViewDocDetail(JSONObject data);
}
