package com.paperclip.service;

import com.paperclip.model.Entity.Paper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public interface SearchService {
    // searchpage
    public JSONArray searchPaper(JSONObject data);
    public boolean match(String searchText, Paper paper);

    }
