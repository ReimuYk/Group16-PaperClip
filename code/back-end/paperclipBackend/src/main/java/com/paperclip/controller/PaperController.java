package com.paperclip.controller;

import com.paperclip.service.PaperService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class PaperController {

    @Autowired
    PaperService paperService;

    @RequestMapping(value = "/service/paperDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject getPaperDetail(@RequestBody JSONObject data){
        return paperService.getPaperDetail(data);
    }

    @RequestMapping(value = "/service/blockPostils",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getBlockPostils(@RequestBody JSONObject data){
        return paperService.getBlockPostils(data);
    }

    @RequestMapping(value = "/service/statPostil",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject markPostil(@RequestBody JSONObject data){
        return paperService.statPostil(data);
    }

    @RequestMapping(value = "/service/addPostil",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addPostil(@RequestBody JSONObject data){
        return paperService.addPostil(data);
    }

    @RequestMapping(value = "/service/addPostilComment",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addPostilComment(@RequestBody JSONObject data){
        return paperService.addPostilComment(data);
    }

    @RequestMapping(value = "/service/starThePaper",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject starPaper(@RequestBody JSONObject data){
        return paperService.starPaper(data);
    }
}
