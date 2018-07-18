package com.paperclip.controller;

import com.paperclip.service.UserService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/*
 * user login, register, findback password
 *
 * .js
 *      findBack
 *      RegisterPage
 *      loginPage
 *
 */
@CrossOrigin
@RestController
public class UserController {

    @Autowired
    UserService userService;
    
    @RequestMapping(value = "/service/findPassword",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject findPassword(@RequestBody JSONObject userEmail){
        return userService.findPassword(userEmail);
    }

    @RequestMapping(value = "/service/register",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addUser(@RequestBody JSONObject username){
        return userService.addUser(username);
    }

    @RequestMapping(value = "/service/login",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject userLogin(@RequestBody JSONObject username){
        return userService.userLogin(username);
    }

    @RequestMapping(value = "/service/user/messageList",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray messageList(@RequestBody JSONObject username){
        return userService.getBriefMessageList(username);
    }

    @RequestMapping(value = "/service/user/messageDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray messageDetail(@RequestBody JSONObject username){
        return userService.getConversation(username);
    }

    @RequestMapping(value = "/service/user/unreadMessage",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray unreadMessage(@RequestBody JSONObject username){
        return userService.getUnreadMessage(username);
    }

    @RequestMapping(value = "/service/sendMessage",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray sendMessage(@RequestBody JSONObject message){
        return userService.sendMessage(message);
    }
}
