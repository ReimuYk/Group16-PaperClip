package com.paperclip.controller;

import com.paperclip.modal.Itema;
import com.paperclip.service.S1Service;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
public class initdataController {
    protected static Logger logger=LoggerFactory.getLogger(initdataController.class);

    @Autowired
    private S1Service s1Service;

    @RequestMapping(value = "/createdata",method = RequestMethod.GET)
    public
    @ResponseBody
    String createdata(){
        return s1Service.createdata();
    }
}
