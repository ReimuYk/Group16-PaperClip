package com.paperclip.controller;

import com.paperclip.service.UserService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/*
 * get info for view: paper, doc, note, user( host want to get client's info )
 * include:
 *
 * .js
 *      userDocDetailPage
 *
 *
 */

@CrossOrigin
@RestController
public class SearchController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/service/search",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray search(@RequestBody JSONObject data){
        return userService.searchPaper(data);
    }
}
