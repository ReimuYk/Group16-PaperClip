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

    @RequestMapping(value = "/service/recommendNote",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray recommendNote(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return searchService.getRecommendNote();
    }

    @RequestMapping(value = "/service/starNoteNews",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray starNoteNews(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return searchService.getUserStarNoteNews(data);
    }

    @RequestMapping(value = "/service/starPaperNews",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray starPaperNews(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return searchService.getUserStarPaperNews(data);
    }

    @RequestMapping(value = "/service/likeNoteNews",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray likeNoteNews(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return searchService.getUserLikeNoteNews(data);
    }

    @RequestMapping(value = "/service/writeNoteNews",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray writeNoteNews(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return searchService.getUserWriteNoteNews(data);
    }
}
