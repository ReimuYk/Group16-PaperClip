package com.paperclip.service.impl;

import com.paperclip.service.UserDocService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class UserDocServiceImpl implements UserDocService {
    // get all the doc that this user has written
    public JSONArray getUserDoc(JSONObject data) {
        JSONArray docs = new JSONArray();
        JSONObject doc = new JSONObject();
        doc.accumulate("get user doc", "ok");
        docs.add(doc);
        return docs;
    }

    // delete this user's doc( which matches this docID and docVersion)
    public JSONObject deleteUserDoc(JSONObject data) {
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
    public JSONArray getUserDocDetail(JSONObject data) {
        return null;
    }

    // delete all version of this doc( whose ID is docID)
    public JSONObject deleteUserDocVersion(JSONObject data) {
        return null;
    }
    // get doc details
    public JSONObject getDocDetail(JSONObject data){
        JSONObject doc = new JSONObject();
        return doc;
    }

    // save doc details (after user has modified it)
    public JSONObject saveDoc(JSONObject data){
        JSONObject result = new JSONObject();
        if(true) {
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    // add a contributer to this doc
    public JSONObject addDocContributer(JSONObject data){
        JSONObject result = new JSONObject();
        if(true) {
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
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
