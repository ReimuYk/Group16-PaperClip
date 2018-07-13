package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface PaperService {
    // paperpage.js
    public JSONObject getPaperDetail(JSONObject data);

    public JSONArray getBlockPostils(JSONObject data);
}
