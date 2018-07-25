package com.paperclip.service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.UnsupportedEncodingException;

public interface SearchService {
    // searchpage
    public JSONArray searchPaper(JSONObject data) throws UnsupportedEncodingException;

    //推荐
    JSONArray getRecommendPaper() throws UnsupportedEncodingException;
    JSONArray getRecommendNote() throws UnsupportedEncodingException;

    //动态
    JSONArray getUserStarPaperNews(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getUserStarNoteNews(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getUserLikeNoteNews(JSONObject data) throws UnsupportedEncodingException;
    JSONArray getUserWriteNoteNews(JSONObject data) throws UnsupportedEncodingException;

    }
