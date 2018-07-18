package com.paperclip.controller;

import com.paperclip.service.ImgService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class imgController {

    @Autowired
    ImgService imgService;

    @RequestMapping(value = "/service/uploadAvatar",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject uploadAvatar(@RequestBody JSONObject data){
        return imgService.uploadAvatar(data);
    }
}
