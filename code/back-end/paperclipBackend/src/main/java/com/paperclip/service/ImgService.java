package com.paperclip.service;

import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface ImgService {
    JSONObject uploadAvatar(JSONObject data) throws UnsupportedEncodingException;
    JSONObject getAvatar(JSONObject data);
    String getUserHeader(User user);
    String getPdfImg(Paper paper);
}
