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
    JSONArray getStarDoc(@RequestParam String username){
        return uService.getStarDoc(username);
    }

    // user choose to stop star a doc
    @RequestMapping(value = "/service/quitStar/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarDoc(@RequestParam String username, @RequestParam int docID){
        return uService.quitStarDoc(username, docID);
    }

    // get user's stared note according to username
    @RequestMapping(value = "/service/starNote",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarNote(@RequestParam String username){
        return uService.getStarNote(username);
    }

    // user choose to stop star a note
    @RequestMapping(value = "/service/quitStar/note",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarNote(@RequestParam String username, @RequestParam int noteID){
        return uService.quitStarNote(username, noteID);
    }

    // get user's stared paper according to username
    @RequestMapping(value = "/service/starPaper",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarPaper(@RequestParam String username){
        return uService.getStarPaper(username);
    }

    // user want to quit star this paper
    @RequestMapping(value = "/service/quitStar/paper",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarPaper(@RequestParam String username, @RequestParam int noteID){
        return uService.quitStarPaper(username, noteID);
    }

    @RequestMapping(value="/service/follow", method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject starUser(@RequestParam String hostname, @RequestParam String clientname){
        return uService.starUser(hostname, clientname);
    }

    // get user's stared user according to username
    @RequestMapping(value = "/service/starUser",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarUser(@RequestParam String username){
        return uService.getStarUser(username);
    }

    // user want to quit star this user(clientname)
    @RequestMapping(value = "/service/quitStar/user",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarUser(@RequestParam String hostname, @RequestParam String clientname){
        return uService.quitStarUser(hostname, clientname);
    }

    // get user's own doc according to username
    @RequestMapping(value = "/service/userDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getUserDoc(@RequestParam String username){
        return uService.getUserDoc(username);
    }

    // user want to delete all versions of this doc
    @RequestMapping(value = "/service/delete/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteDoc( @RequestParam int docID){
        return uService.deleteUserDoc(docID);
    }

    // user want to delete particular versions of this doc
    @RequestMapping(value = "/service/delete/docVersion",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteDocVersion( @RequestParam int docID, @RequestParam int docVersion){
        return uService.deleteUserDocVersion(docID, docVersion);
    }

    @RequestMapping(value = "/service/userFans",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getUserFans(@RequestParam String username){
        return uService.getUserFans(username);
    }
    // get user's own note according to username
    @RequestMapping(value = "/service/userNote",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getUserNote(@RequestParam String username){
        return uService.getUserNote(username);
    }

    // user want to delete this note
    @RequestMapping(value = "/service/delete/note",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteNote(@RequestParam int noteID){
        return uService.deleteUserNote(noteID);
    }

    @RequestMapping(value = "/service/modify/docDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getDocDetail(@RequestParam int docID){
        return uService.getDocDetail(docID);
    }

    @RequestMapping(value = "/service/save/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject saveDoc(@RequestParam int docID, @RequestParam String docTitle, @RequestParam String docContent){
        return uService.saveDoc(docID, docTitle, docContent);
    }

    @RequestMapping(value = "/service/addDocContributer",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addDocContributer(@RequestParam int noteID, @RequestParam String contributerName){
        return uService.addDocContributer(noteID, contributerName);
    }

    @RequestMapping(value = "/service/modify/noteDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getNoteDetail(@RequestParam int noteID){
        return uService.getNoteDetail(noteID);
    }

    @RequestMapping(value = "/service/save/note",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject saveNote(@RequestParam int noteID, @RequestParam String noteTitle, @RequestParam String noteContent){
        return uService.saveNote(noteID, noteTitle, noteContent);
    }

    @RequestMapping(value = "/service/userinfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getUserInfo(@RequestParam String username){
        return uService.getUserInfo(username);
    }

    @RequestMapping(value = "/service/modify/userinfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject modifyUserInfo(@RequestParam String username, @RequestParam String password,
                              @RequestParam String userheader, @RequestParam String userDescription){
        return uService.modifyUserInfo(username, password, userheader, userDescription);
    }

    @RequestMapping(value = "/service/docDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject viewDocDetail(@RequestParam int docID, @RequestParam int version){
        return uService.getViewDocDetail(docID, version);
    }

    @RequestMapping(value = "/service/noteDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject viewNoteDetail(@RequestParam int noteID){
        return uService.getViewNoteDetail(noteID);
    }

    @RequestMapping(value = "/service/addDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addDoc(@RequestParam String username, @RequestParam String title, @RequestParam String content){
        return uService.addDoc(username, title, content);
    }

    @RequestMapping(value = "/service/findPassword",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject findPassword(@RequestParam String userEmail){
        return uService.findPassword(userEmail);
    }


}
