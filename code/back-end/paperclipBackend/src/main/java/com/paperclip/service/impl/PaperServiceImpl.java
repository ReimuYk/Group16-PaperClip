package com.paperclip.service.impl;

import com.paperclip.service.PaperService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class PaperServiceImpl implements PaperService {
    public JSONObject getPaperDetail(JSONObject data) {
        JSONObject paper = new JSONObject();
        JSONArray blocklist = new JSONArray();
        JSONArray marked = new JSONArray();

        paper.accumulate("blocklist", blocklist);
        paper.accumulate("marked", marked);
        return paper;
    }
}
