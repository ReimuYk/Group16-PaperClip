package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.NoteRepository;
import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.model.Entity.Paper;
import com.paperclip.service.SearchService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SearchServiceImpl implements SearchService {
    @Autowired
    private PaperRepository paperRepo;

    @Autowired
    private NoteRepository noteRepo;

    public JSONArray searchPaper(JSONObject data1) {
        String searchText = data1.getString("searchText");

        JSONArray data = new JSONArray();
        JSONArray papers = new JSONArray();
        Iterable<Paper> allPaper = paperRepo.findAll();
        for(Paper p: allPaper){
            if (match(searchText,p)) {
                JSONObject paper = new JSONObject();
                paper.accumulate("paperID", p.getId());
                paper.accumulate("title", p.getTitle());
                paper.accumulate("author", p.getAuthor());
                paper.accumulate("keyword", p.getKeyWords());
                paper.accumulate("noteno", noteRepo.findByPaper(p).size());
                papers.add(paper);
            }
        }


        JSONArray recommands = new JSONArray();

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

    private boolean match(String searchText, Paper paper){
        String title = paper.getTitle();
        String keyword = paper.getKeyWords();

        //检测要匹配的单词，单词的前面必须是空格或者标点符号
        Pattern pattern = Pattern.compile("[^\\w]"+searchText+"[^\\w]");

        Matcher matcher = pattern.matcher("yesterday, I entered  a shop and bought a pencil.");

        boolean result= matcher.find();

        System.out.println(result)


        return title.contains(searchText) || keyword.contains(searchText);
    }
}
