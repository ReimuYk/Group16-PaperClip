package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.DocumentRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.dao.relationshipDao.StarDocRepository;
import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.StarDoc;
import com.paperclip.service.UserStarService;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class UserStarServiceImpl implements UserStarService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private DocumentRepository docRepo;

    @Autowired
    private StarDocRepository starDocRepo;

    // get all the docs that this user has stared
    public JSONArray getStarDoc(JSONObject data){
        String username = data.getString("username");

        User user = userRepo.findOne(username);
        List<StarDoc> l1 = starDocRepo.findByUser(user);
        Iterator<StarDoc> it1 = l1.iterator();
        List<Document> l2 = new ArrayList<>();
        while(it1.hasNext()){
            l2.add(it1.next().getDocument());
        }
        Iterator<Document> it2 = l2.iterator();
        JSONArray docs = new JSONArray();
        while(it2.hasNext()) {
            Document dd = it2.next();
            JSONObject doc = new JSONObject();

            doc.accumulate("ID", dd.getId());
            doc.accumulate("title", dd.getTitle());
            doc.accumulate("author", dd.getUser().getUsername());
            doc.accumulate("starno", starDocRepo.findByDocument(dd).size());
            //doc.accumulate("date","aaa");
            //doc.accumulate("keywords", "git commit, git push");
            docs.add(doc);
        }
        return docs;
    }

    // user choose to stop star ths doc(whose ID is docID)
    public JSONObject quitStarDoc(JSONObject data) throws JSONException {
        JSONObject result = new JSONObject();
        try {
            String username = data.getString("username");
            Long docID = data.getLong("docID");

            User user = userRepo.findOne(username);
            Document doc = docRepo.findOne(docID);
            starDocRepo.deleteDistinctByDocumentAndUser(doc, user);
            result.accumulate("result", "success");
        }catch (JSONException e){
            result.accumulate("result", "fail");
        }

        return result;
    }

    // get all the notes that the user has stared
    public JSONArray getStarNote(JSONObject data) {
        JSONArray notes = new JSONArray();
        JSONObject note = new JSONObject();
        note.accumulate("ID", 1);
        note.accumulate("title", "火咖");
        note.accumulate("author", "KIRIN");
        note.accumulate("readno", 440);
        note.accumulate("starno", 55);
        note.accumulate("date", "2018-03-30");
        note.accumulate("keywords","Italian Cafe Latte");
        note.accumulate("paperID", 5);
        note.accumulate("paperTitle", "Coffe Beverage");
        notes.add(note);
        return notes;
    }

    // user want to stop star this note(whose ID is noteID)
    public JSONObject quitStarNote(JSONObject data){
        JSONObject result = new JSONObject();
        if(true) {
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    // get all papers that this user has stared
    public JSONArray getStarPaper(JSONObject data) {
        JSONArray papers = new JSONArray();
        JSONObject paper = new JSONObject();
        paper.accumulate("get star paper:","ok");
        papers.add(paper);
        return papers;
    }

    // user want to stop star this paper
    public JSONObject quitStarPaper(JSONObject data){
        JSONObject result = new JSONObject();
        if(true) {
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    //
    public JSONArray getStarUser(JSONObject data) {
        JSONArray users = new JSONArray();
        JSONObject user = new JSONObject();
        user.accumulate("get star user", "ok");
        users.add(user);
        return users;
    }

    // hostname want to stop star clientname
    //(hostname used to star clientname
    public JSONObject quitStarUser(JSONObject data){
        JSONObject result = new JSONObject();
        if(true) {
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    @Override
    public JSONObject starUser(JSONObject data) {
        JSONObject result = new JSONObject();
        if(true){
            result.accumulate("result", "success");
        }else{
            result.accumulate("result", "fail");
        }
        return result;
    }
}
