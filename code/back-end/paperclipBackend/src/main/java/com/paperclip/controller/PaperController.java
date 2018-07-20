package com.paperclip.controller;

import com.paperclip.service.PaperService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@CrossOrigin
@RestController
public class PaperController {

    @Autowired
    PaperService paperService;

    @RequestMapping(value = "/service/paperDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getPaperDetail(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return paperService.getPaperDetail(data);
    }

    @RequestMapping(value = "/service/blockPostils",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getBlockPostils(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return paperService.getBlockPostils(data);
    }

    @RequestMapping(value = "/service/statPostil",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject markPostil(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return paperService.statPostil(data);
    }

    @RequestMapping(value = "/service/addPostil",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addPostil(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return paperService.addPostil(data);
    }

    @RequestMapping(value = "/service/addPostilComment",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addPostilComment(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return paperService.addPostilComment(data);
    }

    @RequestMapping(value = "/service/starThePaper",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject starPaper(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return paperService.starPaper(data);
    }

    @RequestMapping(value = "/service/getNoteList",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getNoteList(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return paperService.getNoteList(data);
    }

    @RequestMapping(value = "/service/getKeywords",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getKeywords(@RequestBody JSONObject data){
        return paperService.getKeywords(data);
    }

    @RequestMapping(value = "/service/ifStar",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject ifStar(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return paperService.ifStar(data);
    }

    @RequestMapping(value = "/service/hasAccess",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject hasAccess(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return paperService.hasAccess(data);
    }
}
