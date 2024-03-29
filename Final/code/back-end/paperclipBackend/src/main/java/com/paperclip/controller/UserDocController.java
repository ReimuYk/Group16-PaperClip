package com.paperclip.controller;

import com.paperclip.service.UserDocService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@CrossOrigin
@RestController
public class UserDocController {
    @Autowired
    UserDocService userDocService;

    /************************************************** doc ********************************************/

    /****************
     * userDocPage  *
     ****************/
    // get user's own doc according to username( by docID, all versions of one doc only appear once )
    @RequestMapping(value = "/service/userDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getUserDoc(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.getUserDoc(data);
    }

    // user want to delete all versions of this doc
    @RequestMapping(value = "/service/delete/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteDoc( @RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.deleteUserDoc(data);
    }

    /************************
     * userDocDetailPage
     ***********************/
    // get user's one doc, all versions( by docID)
    @RequestMapping(value = "/service/userDocDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject userDocDetail(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.getUserDocDetail(data);
    }
    // user want to delete particular versions of this doc
    @RequestMapping(value = "/service/delete/docVersion",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteDocVersion( @RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.deleteUserDocVersion(data);
    }

    /**************************
     *  userModifyDocPage
     *************************/
    // return the latest version
    @RequestMapping(value = "/service/modify/docDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getDocDetail(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.getDocDetail(data);
    }

    // save this doc ( date and version number are generated by backend)
    @RequestMapping(value = "/service/save/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject saveDoc(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.saveDoc(data);
    }

    // add a contributer to this doc
    @RequestMapping(value = "/service/addDocContributer",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addDocContributer(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.addDocContributer(data);
    }

    // get all docs that this user contributes ( data should contains username)
    @RequestMapping(value = "/service/contributeDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getContributeDoc(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.getContributeDoc(data);
    }

    /*************************
     * writeDocPage
     ************************/
    // add a new doc
    @RequestMapping(value = "/service/addDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addDoc(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.addDoc(data);
    }


    @RequestMapping(value = "/service/publish/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject testpublish(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.publishDoc(data);
    }

    @RequestMapping(value = "/service/docContributors",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getContributors(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.getContributor(data);
    }

    @RequestMapping(value = "/service/deleteContributor",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject deleteContributor(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userDocService.deleteContributer(data);
    }
}
