package com.paperclip.service.impl;

import com.paperclip.service.SearchService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
public class SearchServiceImpl implements SearchService {
    public JSONArray searchPaper(JSONObject data1) {
        JSONArray data = new JSONArray();
        JSONArray papers = new JSONArray();
        JSONArray recommands = new JSONArray();

        JSONObject paper = new JSONObject();
        paper.accumulate("paperID", 4);
        paper.accumulate("title", "paper title 1");
        paper.accumulate("author", "paper author 1");
        paper.accumulate("keyword", "keyword2, keyword2, keyword3");
        Calendar calendar = Calendar.getInstance();
        paper.accumulate("date", calendar.get(Calendar.YEAR)+"-"+
                calendar.get(Calendar.MONDAY)+"-"+
                calendar.get(Calendar.DATE));
        paper.accumulate("readno", 55);
        paper.accumulate("noteno", 66);
        papers.add(paper);

        JSONObject recommand = new JSONObject();
        recommand.accumulate("paperID", 5);
        recommand.accumulate("title", "recommand paper title 1");
        recommand.accumulate("author", "recommand author 1");
        recommand.accumulate("keyword", "keyword1, keyword2, keyword3");
        recommand.accumulate("date", "2018-06-04");
        recommand.accumulate("readno", 77);
        recommand.accumulate("noteno", 88);
        recommands.add(recommand);

        JSONObject paperObject = new JSONObject();
        paperObject.accumulate("papers", papers);

        JSONObject recommandObject = new JSONObject();
        recommandObject.accumulate("recommand", recommands);

        data.add(paperObject);
        data.add(recommandObject);
        return data;
    }
}
