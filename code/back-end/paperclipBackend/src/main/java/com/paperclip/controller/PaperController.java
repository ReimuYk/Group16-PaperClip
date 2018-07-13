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
}
