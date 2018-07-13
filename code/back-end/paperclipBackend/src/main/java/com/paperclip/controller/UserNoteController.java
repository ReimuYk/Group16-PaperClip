package com.paperclip.controller;

import com.paperclip.service.UserNoteService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/*
 * get user own (create): userPaper, userNote, userDoc, userInfo, userFans
 * include
 *      get userPaper, userNote, userDoc, userInfo( user's selfinfo), messages info
 *      delete userNote, userDoc
 *      modify userInfo(e.g. password)
 *      send message
 * .js
 *      UserDocPage
 *      UserDocDetailPage
 *      UserFensPage
 *      UserNotePage
 *      UserModifyDocPage
 *      UserModifyNotePage
 *      UserPage
 *      UserSettingPage
 *      WriteDocPage
 *      HomePage
 *
 */
@CrossOrigin
@RestController
public class UserNoteController {

    @Autowired
    UserNoteService userNoteService;






    /********************************************* note ****************************************************/
    /*******************
     * userNotePage
     *******************/
    // get user's own note according to username
    @RequestMapping(value = "/service/userNote",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getUserNote(@RequestBody JSONObject data){
        return userNoteService.getUserNote(data);
    }

    // user want to delete this note
    @RequestMapping(value = "/service/delete/note",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteNote(@RequestBody JSONObject data){
        return userNoteService.deleteUserNote(data);
    }


    /************************
     * userModifyNotePage
     ************************/
    @RequestMapping(value = "/service/modify/noteDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getNoteDetail(@RequestBody JSONObject data){
        return userNoteService.getNoteDetail(data);
    }

    @RequestMapping(value = "/service/save/note",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject saveNote(@RequestBody JSONObject data){
        return userNoteService.saveNote(data);
    }

    /*********************
     * viewNotePage
     ********************/

    @RequestMapping(value = "/service/noteDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject viewNoteDetail(@RequestBody JSONObject data){
        return userNoteService.getViewNoteDetail(data);
    }

    @RequestMapping(value = "/service/getNoteComment",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getNoteComment(@RequestBody JSONObject data){
        return userNoteService.getNoteComment(data);
    }

    @RequestMapping(value = "/service/addNoteComment",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addNoteComment(@RequestBody JSONObject data){
        return userNoteService.addNoteComment(data);
    }


}
