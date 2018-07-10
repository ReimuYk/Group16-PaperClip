package com.paperclip.service.impl;

import com.paperclip.service.UserService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

;

@Service
public class UserServiceImpl implements UserService {

    // get all the docs that this user has stared
    public JSONArray getStarDoc(String username){
        JSONArray docs = new JSONArray();
        JSONObject doc = new JSONObject();
        doc.accumulate("get star doc","ok");
        docs.add(doc);
        return docs;
    }

    // user choose to stop star ths doc(whose ID is docID)
    public JSONObject quitStarDoc(String username, int docID){
        JSONObject result = new JSONObject();
        if(true) {
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    // get all the notes that the user has stared
    public JSONArray getStarNote(String username) {
        JSONArray notes = new JSONArray();
        return notes;
    }

    // user want to stop star this note(whose ID is noteID)
    public JSONObject quitStarNote(String username, int noteID){
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
    public JSONArray getStarPaper(String username) {
        JSONArray papers = new JSONArray();
        JSONObject paper = new JSONObject();
        paper.accumulate("get star paper:","ok");
        papers.add(paper);
        return papers;
    }

    // user want to stop star this paper
    public JSONObject quitStarPaper(String username, int paperID){
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
    public JSONArray getStarUser(String username) {
        JSONArray users = new JSONArray();
        JSONObject user = new JSONObject();
        user.accumulate("get star user", "ok");
        users.add(user);
        return users;
    }

    // hostname want to stop star clientname
    //(hostname used to star clientname
    public JSONObject quitStarUser(String hostname, String clientname){
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
    public JSONObject starUser(String hostname, String clientname) {
        return null;
    }

    // get all the doc that this user has written
    public JSONArray getUserDoc(String username) {
        JSONArray docs = new JSONArray();
        JSONObject doc = new JSONObject();
        doc.accumulate("get user doc", "ok");
        docs.add(doc);
        return docs;
    }

    // delete this user's doc( which matches this docID and docVersion)
    public JSONObject deleteUserDoc(int docID) {
        JSONObject result = new JSONObject();
        if(true) {
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    // delete all version of this doc( whose ID is docID)
    public JSONObject deleteUserDocVersion(int docID, int docVersion) {
        return null;
    }

    // get this user's fans
    public JSONArray getUserFans(String username) {
        JSONArray fans = new JSONArray();
        return fans;
    }

    // get all the notes that this user has written
    public JSONArray getUserNote(String username){
        JSONArray notes = new JSONArray();
        return notes;
    }

    // delete this note with ID(noteID)
    public JSONObject deleteUserNote(int noteID){
        JSONObject result = new JSONObject();
        if(true) {
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    // get doc details
    public JSONObject getDocDetail(int docID){
        JSONObject doc = new JSONObject();
        return doc;
    }

    // save doc details (after user has modified it)
    public JSONObject saveDoc(int docID, String docTitle, String docContent){
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
    public JSONObject addDocContributer(int docID, String contributerName){
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
    public JSONObject getNoteDetail(int noteID) {
        return null;
    }

    @Override
    public JSONObject saveNote(int noteID, String noteTitle, String noteContent) {
        return null;
    }

    @Override
    public JSONObject getUserInfo(String username) {
        return null;
    }

    @Override
    public JSONObject modifyUserInfo(String username, String password, String userHeader, String userDescription) {
        return null;
    }

    @Override
    public JSONObject getViewDocDetail(int docID, int version) {
        return null;
    }

    @Override
    public JSONObject getViewNoteDetail(int noteID) {
        return null;
    }

    @Override
    public JSONObject addDoc(String username, String title, String content) {
        return null;
    }

    @Override
    public JSONObject findPassword(String userEmail) {
        return null;
    }

    @Override
    public JSONObject addUser(String username, String password, String email) {
        return null;
    }

    @Override
    public JSONObject userLogin(String username, String password) {
        return null;
    }

    @Override
    public JSONArray getHomeInfo(String username) {
        return null;
    }

    @Override
    public JSONArray searchPaper(String searchText) {
        return null;
    }

    @Override
    public JSONArray getMessageInfo(String username) {
        return null;
    }

    @Override
    public JSONObject sendMessage(String hostname, String clientname, String content) {
        return null;
    }

    @Override
    public JSONObject getPaperDetail(String username, int paperID, int pagination) {
        return null;
    }
}
