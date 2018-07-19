package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface UserDocService {

    // UserDocPage.js
      JSONArray getUserDoc(JSONObject data);
      JSONObject deleteUserDoc(JSONObject data);

    // UserDocDetailPage
      JSONObject getUserDocDetail(JSONObject data);
      JSONObject deleteUserDocVersion(JSONObject data);

    // UserModifyDocPage.js
      JSONObject getDocDetail(JSONObject data);
      JSONObject saveDoc(JSONObject data) throws UnsupportedEncodingException;
      JSONObject addDocContributer(JSONObject data);
      JSONArray getContributeDoc(JSONObject data);

    // writeDocPage.js
      JSONObject addDoc(JSONObject data) throws UnsupportedEncodingException;
      JSONObject publishDoc(JSONObject data) throws UnsupportedEncodingException;
}
