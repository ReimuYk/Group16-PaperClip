package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.DocumentPdfRepository;
import com.paperclip.dao.entityDao.DocumentRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.dao.relationshipDao.AssistRepository;
import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.DocumentPdf;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.Assist;
import com.paperclip.service.UserDocService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

@Service
public class UserDocServiceImpl implements UserDocService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    DocumentRepository docRepo;

    @Autowired
    DocumentPdfRepository docPdfRepo;

    @Autowired
    AssistRepository assistRepo;

    private Boolean hasAccess(User user, Long docID) {
        Document doc = docRepo.findOne(docID);
        if (doc.getUser().getUsername().equals(user.getUsername()))
            return true;
        List<Assist> assistIist = assistRepo.findByDocument(doc);
        Iterator<Assist> assistIterator = assistIist.iterator();
        while(assistIterator.hasNext()){
            Assist assist = assistIterator.next();
            if(assist.getUser().getUsername().equals(user.getUsername()))
                return true;
        }
        return false;
    }
    // get all the doc that this user has written
    public JSONArray getUserDoc(JSONObject data) {
        JSONArray docs = new JSONArray();

        System.out.println("data: "+data);

        String username = data.getString("username");
        System.out.println("username: "+username);
        User user = userRepo.findOne(username);
        List<Document> docList = docRepo.findByUser(user);
        Iterator<Document> docIt = docList.iterator();

        while(docIt.hasNext()){
            Document doc = docIt.next();
            JSONObject docJson = new JSONObject();
            docJson.accumulate("ID", doc.getId());
            docJson.accumulate("title", doc.getTitle());
            docs.add(docJson);
        }
        return docs;
    }

    // delete this user's doc( which matches this docID and docVersion)
    public JSONObject deleteUserDoc(JSONObject data) {
        System.out.println("data: " + data);
        JSONObject result = new JSONObject();

        String username = data.getString("username");
        Long docID = data.getLong("docID");
        System.out.println("username: "+username);
        User user = userRepo.findOne(username);
        Document doc = docRepo.findOne(docID);
        System.out.println("doc author:"+doc.getUser().getUsername());
        if(doc.getUser().getUsername().equals(username)){
            docRepo.delete(doc);
            System.out.println("delete success");
            result.accumulate("result", "success");
        }else{
            System.out.println("delete fail");
            result.accumulate("result", "fail");
        }
        return result;
    }

    // get all versions of this doc
    public JSONArray getUserDocDetail(JSONObject data) {
        JSONArray docDetails = new JSONArray();
        String username = data.getString("username");
        Long docId = data.getLong("docID");
        Document doc = docRepo.findOne(docId);
        System.out.println("username: "+username);
        User user = userRepo.findOne(username);
        // if the user is not the author nor the contributor of this doc, this user does not have access to this doc
        if(!hasAccess(user, docId))
            return null;

        System.out.println("docId: " + doc.getId());
        List<DocumentPdf> docPdfList = docPdfRepo.findByDocument(doc);
        Iterator<DocumentPdf> docPdfIt = docPdfList.iterator();
        while(docPdfIt.hasNext()){
            DocumentPdf docPdf = docPdfIt.next();
            System.out.println("docPdfId: "+docPdf.getId());
            JSONObject docPdfJson = new JSONObject();
            docPdfJson.accumulate("title", docPdf.getTitle());
            java.text.SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            docPdfJson.accumulate("date", sdf.format(docPdf.getDate()));
            docPdfJson.accumulate("author", docPdf.getAuthor());
            docPdfJson.accumulate("version", docPdf.getVersion());
            docPdfJson.accumulate("keywords", docPdf.getKeyWords());
            docDetails.add(docPdfJson);
        }
        return docDetails;
    }

    // delete all version of this doc( whose ID is docID)
    public JSONObject deleteUserDocVersion(JSONObject data) {
        JSONObject result = new JSONObject();
        String username = data.getString("username");
        Long docID = data.getLong("docID");

        Document doc = docRepo.findOne(docID);
        User user = userRepo.findOne(username);
        // check if this user has access
        if(!hasAccess(user, docID)){
            result.accumulate("result", "fail");
            return result;
        }

        List<DocumentPdf> docPdfList = docPdfRepo.findByDocument(doc);
        Iterator<DocumentPdf> documentPdfIterator = docPdfList.iterator();

        while (documentPdfIterator.hasNext()){
            DocumentPdf docPdf = documentPdfIterator.next();
            docPdfRepo.delete(docPdf.getId());
        }
        docRepo.delete(doc.getId());
        result.accumulate("result", "success");
        return result;
    }

    // get doc details
    public JSONObject getDocDetail(JSONObject data){
        String username = data.getString("username");
        Long docID = data.getLong("docID");
        User user = userRepo.findOne(username);
        if(!hasAccess(user, docID))
            return null;
        Document doc = docRepo.findOne(docID);
        JSONObject docJson = new JSONObject();
        docJson.accumulate("docID", docID);
        docJson.accumulate("title", doc.getTitle());
        docJson.accumulate("author", doc.getUser());
        docJson.accumulate("content", doc.getContent());
        return docJson;
    }

    // save doc details (after user has modified it)
    public JSONObject saveDoc(JSONObject data){
        String username = data.getString("username");
        Long docID = data.getLong("docID");
        User user = userRepo.findOne(username);
        JSONObject result = new JSONObject();
        if(!hasAccess(user, docID)) {
            result.accumulate("result", "fail");
        }
        else{
            Document doc = docRepo.findOne(docID);
            String content = data.getString("content");
            String title = data.getString("title");
            doc.setContent(content);
            doc.setTitle(title);
            docRepo.save(doc);
            result.accumulate("result", "success");
        }
        return result;
    }

    // add a contributer to this doc
    public JSONObject addDocContributer(JSONObject data){
        JSONObject result = new JSONObject();
        String hostname = data.getString("hostname");
        String clientname = data.getString("clientname");
        User host = userRepo.findOne(hostname);
        User client = userRepo.findOne(clientname);
        Long docID = data.getLong("docID");
        Document doc = docRepo.findOne(docID);
        if(!doc.getUser().getUsername().equals(hostname)){
            result.accumulate("result", "fail");
        }else{
            Assist assist = new Assist(client, doc);
            assistRepo.save(assist);
            result.accumulate("result", "success");
        }
        return result;
    }

    public JSONArray getContributeDoc(JSONObject data) {
        JSONArray docs = new JSONArray();

        JSONObject doc = new JSONObject();
        doc.accumulate("docID", 7);
        doc.accumulate("title", "doc title");
        doc.accumulate("author", "MKK NB");
        doc.accumulate("date", "2017-06-08");

        docs.add(doc);
        return docs;
    }

    public JSONObject addDoc(JSONObject data) {
        JSONObject result = new JSONObject();
        if(true){
            result.accumulate("result", "success");
        }else{
            result.accumulate("result", "fail");
        }
        return result;
    }

}
