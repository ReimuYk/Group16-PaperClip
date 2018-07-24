package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.DocumentPdfRepository;
import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.dao.entityDao.NoteRepository;
import com.paperclip.dao.relationshipDao.StarPaperRepository;
import com.paperclip.model.Entity.DocumentPdf;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Relationship.StarPaper;
import com.paperclip.service.SearchService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SearchServiceImpl implements SearchService {
    @Autowired
    private PaperRepository paperRepo;

    @Autowired
    private NoteRepository noteRepo;

    @Autowired
    private StarPaperRepository starPaperRepo;
   
    @Autowired
    private DocumentPdfRepository docPdfRepo;

    public JSONArray searchPaper(JSONObject data1) throws UnsupportedEncodingException {
        String searchText = data1.getString("searchText");
        searchText = URLEncoder.encode(searchText, "UTF-8");

        JSONArray data = new JSONArray();
        JSONArray papers = new JSONArray();

        List<String> yearSet = new ArrayList<>();
        List<String> sourceSet = new ArrayList<>();

        Iterable<Paper> allPaper = paperRepo.findAll();

        for(Paper p: allPaper){
            if (docPdfRepo.findOne(p.getId()) == null && match(searchText,p)) {
                String tag = URLDecoder.decode(p.getTag(),"UTF-8");
                String[] taglist = tag.split(";");
                if (!inList(yearSet,taglist[0])){
                    yearSet.add(taglist[0]);
                }
                if(!inList(sourceSet,taglist[1])){
                    sourceSet.add(taglist[1]);
                }

                JSONObject paper = new JSONObject();
                paper.accumulate("paperID", p.getId());
                paper.accumulate("title", URLDecoder.decode(p.getTitle(), "UTF-8"));
                paper.accumulate("author", URLDecoder.decode(p.getAuthor(), "UTF-8"));
                paper.accumulate("keyword", URLDecoder.decode(p.getKeyWords(), "UTF-8"));
                paper.accumulate("noteno", noteRepo.findByPaper(p).size());
                paper.accumulate("starno",starPaperRepo.findByPaper(p).size());
                paper.accumulate("year",taglist[0]);
                paper.accumulate("source",taglist[1]);
                //System.out.println(paper.toString());
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

        JSONObject tag = new JSONObject();
        tag.accumulate("sourceTags", JSONArray.fromObject(sourceSet));

        data.add(paperObject);
        data.add(recommandObject);
        data.add(tag);
        return data;
    }

    private boolean match(String searchText, Paper paper) throws UnsupportedEncodingException {
        String title = URLDecoder.decode(paper.getTitle(),"UTF-8");
        String keyword = URLDecoder.decode(paper.getKeyWords(),"UTF-8");
        String author = URLDecoder.decode(paper.getAuthor(),"UTF-8");


        String[] list = searchText.split("\\s+");
        for(String s:list){
            System.out.println("word: "+s);

            Pattern pattern = Pattern.compile(".*"+s+".*");
            Matcher matcher = pattern.matcher(title);
            boolean result1 = matcher.find();

            matcher = pattern.matcher(keyword);
            boolean result2 = matcher.find();

            matcher = pattern.matcher(author);
            boolean result3 = matcher.find();

            if(result1 || result2 || result3){
                return true;
            }
        }
        return false;
    }

    //使用List判断元素是否已经存在于数组中
    public static boolean inList(List<String> myList, String targetValue){
        String[] arr = myList.toArray(new String[myList.size()]);
        return ArrayUtils.contains(arr,targetValue);
    }
}
