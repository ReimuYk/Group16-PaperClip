package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.*;
import com.paperclip.dao.relationshipDao.AssistRepository;
import com.paperclip.model.Entity.*;
import com.paperclip.model.Relationship.Assist;
import com.paperclip.service.UserDocService;
import com.sun.xml.internal.ws.api.server.HttpEndpoint;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.jcp.xml.dsig.internal.dom.DOMCanonicalizationMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.xml.crypto.Data;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    @Autowired
    PaperRepository paperRepo;

    @Autowired
    BlockRepository blockRepo;

    @Autowired
    PaperPageRepository paperPageRepo;

    private Boolean hasAccess(User user, Long docID) {
        Document doc = docRepo.findOne(docID);
        if(doc==null)
            return false;
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

        for (Document doc : docList) {
            JSONObject docJson = new JSONObject();
            docJson.accumulate("ID", doc.getId());
            docJson.accumulate("title", doc.getTitle());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            docJson.accumulate("date", sdf.format(doc.getDate()));
            docs.add(docJson);
        }
        return docs;
    }

    // delete this user's doc( which matches this docID and docVersion)
    public JSONObject deleteUserDoc(JSONObject data) {
        JSONObject result = new JSONObject();
        String username = data.getString("username");
        Long docID = data.getLong("docID");
        Document doc = docRepo.findOne(docID);
        List<DocumentPdf> docPdfList = docPdfRepo.findByDocument(doc);
        for (DocumentPdf docPdf : docPdfList) {

             docPdfRepo.delete(docPdf.getId());
        }
        docRepo.delete(doc.getId());
        result.accumulate("result", "success");
        return result;
    }

    // delete one version( keep others )
    public JSONObject deleteUserDocVersion(JSONObject data) {
        System.out.println("data: " + data);
        JSONObject result = new JSONObject();

        String username = data.getString("username");
        Long versionID = data.getLong("versionID");
        System.out.println("username: "+username);
        User user = userRepo.findOne(username);
        DocumentPdf docPdf = docPdfRepo.findOne(versionID);
        if(docPdf!=null){
            System.out.println("docPdfID" + docPdf.getId());
            System.out.println("pdf title"+docPdf.getTitle());
            docPdfRepo.delete(docPdf);
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    // get all versions of this doc
    public JSONObject getUserDocDetail(JSONObject data) {
        JSONArray docDetails = new JSONArray();
        String username = data.getString("username");
        Long docId = data.getLong("docID");
        Document doc = docRepo.findOne(docId);
        System.out.println("username: "+username);
        User user = userRepo.findOne(username);
        JSONObject result = new JSONObject();
        // if the user is not the author nor the contributor of this doc, this user does not have access to this doc
        if(!hasAccess(user, docId)) {
            result.accumulate("result", "fail");
        }else {
            result.accumulate("result", "success");
            System.out.println("docId: " + doc.getId());
            List<DocumentPdf> docPdfList = docPdfRepo.findByDocument(doc);
            for (DocumentPdf docPdf : docPdfList) {
                System.out.println("docPdfId: " + docPdf.getId());
                JSONObject docPdfJson = new JSONObject();
                docPdfJson.accumulate("result", "success");
                docPdfJson.accumulate("title", docPdf.getTitle());
                docPdfJson.accumulate("docPdfID", docPdf.getId());
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                docPdfJson.accumulate("date", sdf.format(docPdf.getDate()));
                docPdfJson.accumulate("author", docPdf.getAuthor());
                docPdfJson.accumulate("version", docPdf.getVersion());
                docPdfJson.accumulate("keywords", docPdf.getKeyWords());
                docDetails.add(docPdfJson);
            }
        }
        result.accumulate("version", docDetails);
        return result;
    }



    // get doc details
    public JSONObject getDocDetail(JSONObject data){
        String username = data.getString("username");
        Long docID = data.getLong("docID");
        User user = userRepo.findOne(username);
        JSONObject docJson = new JSONObject();

        Document doc = docRepo.findOne(docID);
        if(!doc.getUser().getUsername().equals(username)){
            docJson.accumulate("result", "fail");

        }else{
            docJson.accumulate("result", "success");
            docJson.accumulate("docID", docID);
            docJson.accumulate("title", doc.getTitle());
            docJson.accumulate("author", doc.getUser());
            docJson.accumulate("content", doc.getContent());
        }
        return docJson;
    }

    // save doc details (after user has modified it)
    public JSONObject saveDoc(JSONObject data){
        String username = data.getString("username");
        Long docID = data.getLong("docID");
        Document doc = docRepo.findOne(docID);
        User user = userRepo.findOne(username);
        JSONObject result = new JSONObject();
        if(!doc.getUser().getUsername().equals(username)) {
            result.accumulate("result", "fail");
        }else{

            String content = data.getString("content");
            String title = data.getString("title");
            doc.setContent(content);
            doc.setTitle(title);
            doc.setDate(new Date());
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
        Long docID = data.getLong("docID");
        User host = userRepo.findOne(hostname);
        User client = userRepo.findOne(clientname);
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

        String username = data.getString("username");
        User user = userRepo.findOne(username);
        List<Assist> assistList = assistRepo.findByUser(user);
        for (Assist assist : assistList) {
            Document doc = assist.getDocument();
            JSONObject docJson = new JSONObject();
            docJson.accumulate("docID", doc.getId());
            docJson.accumulate("title", doc.getTitle());
            docJson.accumulate("author", doc.getUser().getUsername());
            docJson.accumulate("result", "success");
            System.out.println("doc: "+docJson.toString());
            docs.add(docJson);
        }
        System.out.println("docs: "+docs.toString());
        return docs;
    }

    public JSONObject addDoc(JSONObject data) {
        JSONObject result = new JSONObject();
        String username = data.getString("username");
        String title = data.getString("title");
        String content = data.getString("content");
        User user = userRepo.findOne(username);
        Document doc = new Document(user, title, content);
        docRepo.save(doc);
        Long docID = doc.getId();
        result.accumulate("docID", docID);
        result.accumulate("result", "success");
        return result;
    }

    public JSONObject publishDoc(JSONObject data){
        System.out.println("get json: "+data);
        String username = data.getString("username");
        String doc_content = data.getString("docContent");
        String title = data.getString("docTitle");
        Long docID = data.getLong("docID");

        //fake data
        username = "user1";
        title = "test title";
        docID = new Long((long)1);
        Document doc = docRepo.findOne(docID);

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8000/html2pdf/";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        //create pdf data
        DocumentPdf pdf = new DocumentPdf();
        pdf.setAuthor(username);
        pdf.setTitle(title);
        pdf.setDocument(doc);
        pdf.setDate(new Date());
        pdf.setVersion(1);
        pdf.setKeyWords("");
        pdf.setTag("");
        pdf.setPageNum(0);
        docPdfRepo.save(pdf);
        //create json_body & POST req
        JSONObject json_body = new JSONObject();
        json_body.accumulate("paperID",pdf.getId());
        json_body.accumulate("data",doc_content);
        String body = json_body.toString();
        HttpEntity<String> entity = new HttpEntity<>(body,headers);
        ResponseEntity<JSONObject> resp = restTemplate.exchange(url, HttpMethod.POST, entity, JSONObject.class);
        JSONObject resp_body = resp.getBody();
        System.out.println(resp_body);
        pdf.setPageNum(resp_body.getInt("pagenum"));
        JSONArray pagelist = resp_body.getJSONArray("blocks");
        //insert blocks
        for (int i=0;i<pagelist.size();i++){
            JSONArray page = pagelist.getJSONArray(i);
            PaperPage newPage = new PaperPage();
            newPage.setPagination(i+1);
            newPage.setPaper(pdf);
            newPage.setContentUrl(String.format("%d-%d.jpeg",pdf.getId(),i));
            paperPageRepo.save(newPage);
            for (int j=0;j<page.size();j++){
                JSONObject b = page.getJSONObject(j);
                Block newblock = new Block();
                newblock.setContent(b.getString("content"));
                newblock.setEndPoint(b.getString("end"));
                newblock.setStartPoint(b.getString("start"));
                newblock.setLocation(b.getInt("location"));
                newblock.setPaperPage(newPage);
                blockRepo.save(newblock);
            }
            paperPageRepo.save(newPage);
        }
        paperRepo.save(pdf);
        return new JSONObject();
    }

}
