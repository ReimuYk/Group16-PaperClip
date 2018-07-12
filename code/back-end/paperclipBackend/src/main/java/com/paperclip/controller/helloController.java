package com.paperclip.controller;

//import com.paperclip.service.S1Service;
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
public class helloController {
    protected static Logger logger=LoggerFactory.getLogger(helloController.class);

    //@Autowired
    //private S1Service s1Service;

    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public
    @ResponseBody
    String hello(){
        return "this is a hello world page";
    }

    /*@RequestMapping(value = "/findtest",method = RequestMethod.GET)
    public
    @ResponseBody
    JSONArray findtest(){
        return s1Service.findtest();
    }*/
}
