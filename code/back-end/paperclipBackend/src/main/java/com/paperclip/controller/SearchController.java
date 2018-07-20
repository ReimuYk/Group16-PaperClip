package com.paperclip.controller;

import com.paperclip.service.SearchService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

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
    SearchService searchService;

    @RequestMapping(value = "/service/search",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray search(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return searchService.searchPaper(data);
    }
}
