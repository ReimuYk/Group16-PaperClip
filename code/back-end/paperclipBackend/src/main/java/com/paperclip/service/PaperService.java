package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface PaperService {
    // paperpage.js
    JSONObject getPaperDetail(JSONObject data);
    JSONArray getBlockPostils(JSONObject data);
    JSONObject statPostil(JSONObject data);
}
