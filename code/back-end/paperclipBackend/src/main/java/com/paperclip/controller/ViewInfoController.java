package com.paperclip.controller;

import com.paperclip.service.ViewInfoService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@Controller
@CrossOrigin
public class ViewInfoController {
    @Autowired
    ViewInfoService viewInfoService;
    /***************************************************** user ************************************************************/
    /*
     * userPage
     */
    // get user own user page info
    @RequestMapping(value = "/service/hostInfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getHostInfo(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return viewInfoService.getHostInfo(data);
    }

    // get other user page info
    @RequestMapping(value = "/service/clientInfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getClientInfo(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return viewInfoService.getClientInfo(data);
    }

    /***************************
     * userSettingPage
     *****************************/
    @RequestMapping(value = "/service/modify/userinfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject modifyUserInfo(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return viewInfoService.modifyUserInfo(data);
    }

    /********************************************** home ************************************************/
    /****************
     * homePage
     **************/
    @RequestMapping(value = "/service/homeinfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getHomeInfo(@RequestBody JSONObject data){
        return viewInfoService.getHomeInfo(data);
    }

    /************************************************ fans *************************************************/
    /*****************
     *  userFensPage
     ********************/
    @RequestMapping(value = "/service/userFans",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getUserFans(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return viewInfoService.getUserFans(data);
    }

    /*********************************************** doc *************************************************/
    /******************
     * viewDocPage
     ******************/
    @RequestMapping(value = "/service/docDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getViewDocDetail(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return viewInfoService.getViewDocDetail(data);
    }
}
