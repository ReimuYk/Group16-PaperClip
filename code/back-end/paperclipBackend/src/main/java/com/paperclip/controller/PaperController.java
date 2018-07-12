package com.paperclip.controller;

import com.paperclip.service.PaperService;
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
}
