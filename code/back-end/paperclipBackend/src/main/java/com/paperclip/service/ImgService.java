package com.paperclip.service;

import com.paperclip.model.Entity.User;
import net.sf.json.JSONObject;

public interface ImgService {
    JSONObject uploadAvatar(JSONObject data);
    JSONObject getAvatar(JSONObject data);
    String getUserHeader(User user);
}
