package com.paperclip.service;

import net.sf.json.JSONObject;

public interface ImgService {
    JSONObject uploadAvatar(JSONObject data);
    JSONObject getAvatar(JSONObject data);
}
