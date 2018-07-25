package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.DocumentPdfRepository;
import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.dao.entityDao.NoteRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.dao.relationshipDao.StarNoteRepository;
import com.paperclip.dao.relationshipDao.StarPaperRepository;
import com.paperclip.dao.relationshipDao.UserNoteRepository;
import com.paperclip.model.Entity.DocumentPdf;
import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.StarNote;
import com.paperclip.model.Relationship.StarPaper;
import com.paperclip.model.Relationship.UserNote;
import com.paperclip.service.SearchService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
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

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private StarNoteRepository starNoteRepo;

    @Autowired
    private UserNoteRepository userNRepo;


    public JSONArray searchPaper(JSONObject data1) throws UnsupportedEncodingException {
        String searchText = data1.getString("searchText");
        searchText = URLDecoder.decode(searchText, "UTF-8");

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

        JSONArray recommands = getRecommendPaper();

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
        String tag = URLDecoder.decode(paper.getTag(),"UTF-8");

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

            matcher = pattern.matcher(tag);
            boolean result4 = matcher.find();

            if(result1 || result2 || result3 || result4){
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

    public JSONArray getRecommendPaper() throws UnsupportedEncodingException {
        JSONArray recommands = new JSONArray();

        List<Paper> papers = paperRepo.getRecommendPaper();
        int count = 0;
        for(Paper paper:papers) {
            if(docPdfRepo.findOne(paper.getId())!=null){
                continue;
            }
            JSONObject recommand = new JSONObject();
            recommand.accumulate("paperID", paper.getId());
            recommand.accumulate("title", URLDecoder.decode(paper.getTitle(), "UTF-8"));
            recommand.accumulate("author", URLDecoder.decode(paper.getAuthor(), "UTF-8"));
            recommand.accumulate("keyword", URLDecoder.decode(paper.getKeyWords(), "UTF-8"));
            recommand.accumulate("noteno", noteRepo.findByPaper(paper).size());
            recommand.accumulate("starno", starPaperRepo.findByPaper(paper).size());
            recommands.add(recommand);
            if(count >= 14){
                break;
            }
            count += 1;
        }

        return  recommands;
    }

    public JSONArray getRecommendNote() throws UnsupportedEncodingException {
        JSONArray recommands = new JSONArray();

        List<Note> notes = noteRepo.getRecommendNote();
        int count = 0;
        for(Note note:notes) {
            JSONObject recommand = new JSONObject();
            recommand.accumulate("noteID", note.getId());
            recommand.accumulate("title", URLDecoder.decode(note.getTitle(), "UTF-8"));
            recommand.accumulate("author", URLDecoder.decode(note.getUser().getUsername(), "UTF-8"));
            recommand.accumulate("keyword", URLDecoder.decode(note.getKeyWords(), "UTF-8"));
            recommand.accumulate("likeno", note.getAgreement());
            recommand.accumulate("starno", note.getStar());

            int end = 50;
            String intro = URLDecoder.decode(note.getContent(),"UTF-8");
            if (intro.length() < 50) {
                end = intro.length();
            }
            intro = intro.substring(0,end);
            recommand.accumulate("intro",intro);

            recommands.add(recommand);
            if(count >= 8){
                break;
            }
            count += 1;
        }
        return recommands;
    }

    //输入：username ---------- 这个用户最近收藏论文的动态
    public JSONArray getUserStarPaperNews(JSONObject data) throws UnsupportedEncodingException {
        JSONArray news = new JSONArray();
        String username = data.getString("username");
        User user = userRepo.findOne(username);

        List<StarPaper> starPapers = starPaperRepo.findByUserOrderByIdDesc(user);
        for(StarPaper starPaper:starPapers){
            JSONObject obj = new JSONObject();
            Paper paper = starPaper.getPaper();
            obj.accumulate("paperID",paper.getId());
            obj.accumulate("paperTitle",URLDecoder.decode(paper.getTitle(),"UTF-8"));

            news.add(obj);
        }

        return news;
    }

    //输入：username ---------- 这个用户最近收藏笔记的动态
    public JSONArray getUserStarNoteNews(JSONObject data) throws UnsupportedEncodingException {
        JSONArray news = new JSONArray();
        String username = data.getString("username");
        User user = userRepo.findOne(username);

        List<StarNote> starNotes = starNoteRepo.findByUserOrderByIdDesc(user);
        for(StarNote starNote:starNotes){
            JSONObject obj = new JSONObject();
            Note note = starNote.getNote();
            obj.accumulate("noteID",note.getId());
            obj.accumulate("noteTitle",URLDecoder.decode(note.getTitle(),"UTF-8"));

            news.add(obj);
        }

        return news;
    }

    //输入：username ---------- 这个用户最近创作笔记的动态
    public JSONArray getUserWriteNoteNews(JSONObject data) throws UnsupportedEncodingException {
        JSONArray news = new JSONArray();
        String username = data.getString("username");
        User user = userRepo.findOne(username);

        List<Note> notes = noteRepo.findByUserOrderByDateDesc(user);
        for(Note note:notes){
            JSONObject obj = new JSONObject();
            obj.accumulate("noteID",note.getId());
            obj.accumulate("noteTitle",URLDecoder.decode(note.getTitle(),"UTF-8"));
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            obj.accumulate("time",sdf.format(note.getDate()));

            news.add(obj);
        }

        return news;
    }

    //输入：username ---------- 这个用户最近点赞笔记的动态
    public JSONArray getUserLikeNoteNews(JSONObject data) throws UnsupportedEncodingException {
        JSONArray news = new JSONArray();
        String username = data.getString("username");
        User user = userRepo.findOne(username);

        List<UserNote> userNotes = userNRepo.findLikesOfUser(user);
        for(UserNote userNote:userNotes){
            JSONObject obj = new JSONObject();
            Note note = userNote.getNote();
            obj.accumulate("noteID",note.getId());
            obj.accumulate("noteTitle",URLDecoder.decode(note.getTitle(),"UTF-8"));

            news.add(obj);
        }

        return news;
    }
}
