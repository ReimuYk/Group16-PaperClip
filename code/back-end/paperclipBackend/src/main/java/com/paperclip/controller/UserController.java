package com.paperclip.controller;

import com.paperclip.service.UserService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    UserService uService;

    // get user's stared doc according to username
    @RequestMapping(value = "/service/starDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarDoc(@RequestBody JSONObject username){
        return uService.getStarDoc(username);
    }

    // user choose to stop star a doc
    @RequestMapping(value = "/service/quitStar/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarDoc(@RequestBody JSONObject data){
        return uService.quitStarDoc(data);
    }

    // get user's stared note according to username
    @RequestMapping(value = "/service/starNote",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarNote(@RequestBody JSONObject data){
        return uService.getStarNote(data);
    }

    // user choose to stop star a note
    @RequestMapping(value = "/service/quitStar/note",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarNote(@RequestBody JSONObject data){
        return uService.quitStarNote(data);
    }

    // get user's stared paper according to username
    @RequestMapping(value = "/service/starPaper",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarPaper(@RequestBody JSONObject username){
        return uService.getStarPaper(username);
    }

    // user want to quit star this paper
    @RequestMapping(value = "/service/quitStar/paper",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarPaper(@RequestBody JSONObject username){
        return uService.quitStarPaper(username);
    }

    @RequestMapping(value="/service/follow", method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject starUser(@RequestBody JSONObject hostname){
        return uService.starUser(hostname);
    }

    // get user's stared user according to username
    @RequestMapping(value = "/service/starUser",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarUser(@RequestBody JSONObject username){
        return uService.getStarUser(username);
    }

    // user want to quit star this user(clientname)
    @RequestMapping(value = "/service/quitStar/user",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarUser(@RequestBody JSONObject hostname){
        return uService.quitStarUser(hostname);
    }

    // get user's own doc according to username
    @RequestMapping(value = "/service/userDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getUserDoc(@RequestBody JSONObject username){
        return uService.getUserDoc(username);
    }

    // user want to delete all versions of this doc
    @RequestMapping(value = "/service/delete/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteDoc( @RequestBody JSONObject docID){
        return uService.deleteUserDoc(docID);
    }

    // user want to delete particular versions of this doc
    @RequestMapping(value = "/service/delete/docVersion",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteDocVersion( @RequestBody JSONObject docID){
        return uService.deleteUserDocVersion(docID);
    }

    @RequestMapping(value = "/service/userFans",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getUserFans(@RequestBody JSONObject username){
        return uService.getUserFans(username);
    }
    // get user's own note according to username
    @RequestMapping(value = "/service/userNote",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getUserNote(@RequestBody JSONObject username){
        return uService.getUserNote(username);
    }

    // user want to delete this note
    @RequestMapping(value = "/service/delete/note",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteNote(@RequestBody JSONObject noteID){
        return uService.deleteUserNote(noteID);
    }

    @RequestMapping(value = "/service/modify/docDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getDocDetail(@RequestBody JSONObject docID){
        return uService.getDocDetail(docID);
    }

    @RequestMapping(value = "/service/save/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject saveDoc(@RequestBody JSONObject docID){
        return uService.saveDoc(docID);
    }

    @RequestMapping(value = "/service/addDocContributer",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addDocContributer(@RequestBody JSONObject noteID){
        return uService.addDocContributer(noteID);
    }

    @RequestMapping(value = "/service/contributeDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getContributeDoc( @RequestBody JSONObject username){
        return uService.getContributeDoc(username);
    }

    @RequestMapping(value = "/service/modify/noteDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getNoteDetail(@RequestBody JSONObject noteID){
        return uService.getNoteDetail(noteID);
    }

    @RequestMapping(value = "/service/save/note",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject saveNote(@RequestBody JSONObject noteID){
        return uService.saveNote(noteID);
    }

    @RequestMapping(value = "/service/hostInfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getHostInfo(@RequestBody JSONObject username){
        return uService.getHostInfo(username);
    }

    @RequestMapping(value = "/service/clientInfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getClientInfo(@RequestBody JSONObject username){
        return uService.getClientInfo(username);
    }

    @RequestMapping(value = "/service/modify/userinfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject modifyUserInfo(@RequestBody JSONObject username){
        return uService.modifyUserInfo(username);
    }

    @RequestMapping(value = "/service/docDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject viewDocDetail(@RequestBody JSONObject docID){
        return uService.getViewDocDetail(docID);
    }

    @RequestMapping(value = "/service/noteDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject viewNoteDetail(@RequestBody JSONObject noteID){
        return uService.getViewNoteDetail(noteID);
    }

    @RequestMapping(value = "/service/addDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addDoc(@RequestBody JSONObject username){
        return uService.addDoc(username);
    }

    @RequestMapping(value = "/service/findPassword",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject findPassword(@RequestBody JSONObject userEmail){
        return uService.findPassword(userEmail);
    }

    @RequestMapping(value = "/service/register",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addUser(@RequestBody JSONObject username){
        return uService.addUser(username);
    }

    @RequestMapping(value = "/service/login",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject userLogin(@RequestBody JSONObject username){
        return uService.userLogin(username);
    }

    @RequestMapping(value = "/service/homeinfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getHomeInfo(@RequestBody JSONObject username){
        return uService.getHomeInfo(username);
    }

    @RequestMapping(value = "/service/search",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray search(@RequestBody JSONObject searchText){
        return uService.searchPaper(searchText);
    }

    @RequestMapping(value = "/service/messageInfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getMessageInfo(@RequestBody JSONObject username){
        return uService.getMessageInfo(username);
    }

    @RequestMapping(value = "/service/sendMessage",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject sendMessage(@RequestBody JSONObject hostname){
        return uService.sendMessage(hostname);
    }

    @RequestMapping(value = "/service/paperDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getPaperDetail(@RequestBody JSONObject paperID){
        return uService.getPaperDetail(paperID);
    }
}
