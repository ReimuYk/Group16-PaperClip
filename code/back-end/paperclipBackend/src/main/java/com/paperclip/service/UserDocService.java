package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface UserDocService {

    // UserDocPage.js
      JSONArray getUserDoc(JSONObject data) throws UnsupportedEncodingException;
      JSONObject deleteUserDoc(JSONObject data) throws UnsupportedEncodingException;

    // UserDocDetailPage
      JSONObject getUserDocDetail(JSONObject data) throws UnsupportedEncodingException;
      JSONObject deleteUserDocVersion(JSONObject data) throws UnsupportedEncodingException;

    // UserModifyDocPage.js
      JSONObject getDocDetail(JSONObject data) throws UnsupportedEncodingException;
      JSONObject saveDoc(JSONObject data) throws UnsupportedEncodingException;
      JSONObject addDocContributer(JSONObject data) throws UnsupportedEncodingException;
      JSONArray getContributeDoc(JSONObject data) throws UnsupportedEncodingException;
      JSONObject deleteContributer(JSONObject data);
      JSONArray getContributor(JSONObject data);

    // writeDocPage.js
      JSONObject addDoc(JSONObject data) throws UnsupportedEncodingException;
      JSONObject publishDoc(JSONObject data) throws UnsupportedEncodingException;
}
