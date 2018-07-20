package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface SearchService {
    // searchpage
    public JSONArray searchPaper(JSONObject data) throws UnsupportedEncodingException;

    }
