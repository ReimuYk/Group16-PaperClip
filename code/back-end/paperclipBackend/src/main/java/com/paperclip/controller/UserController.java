package com.paperclip.controller;

import com.paperclip.service.UserService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

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
    JSONObject addUser(@RequestBody JSONObject username) throws UnsupportedEncodingException {
        return userService.addUser(username);
    }

    @RequestMapping(value = "/service/login",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject userLogin(@RequestBody JSONObject username) throws UnsupportedEncodingException {
        return userService.userLogin(username);
    }

    @RequestMapping(value = "/service/user/messageList",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject messageList(@RequestBody JSONObject username) throws UnsupportedEncodingException {
        return userService.getBriefMessageList(username);
    }

    @RequestMapping(value = "/service/user/messageDetail",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray messageDetail(@RequestBody JSONObject username) throws UnsupportedEncodingException {
        return userService.getConversation(username);
    }

    @RequestMapping(value = "/service/user/unreadMessage",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray unreadMessage(@RequestBody JSONObject username) throws UnsupportedEncodingException {
        return userService.getUnreadMessage(username);
    }

    @RequestMapping(value = "/service/sendMessage",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject sendMessage(@RequestBody JSONObject message) throws UnsupportedEncodingException {
        return userService.sendMessage(message);
    }

    @RequestMapping(value = "/service/getInvitations",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getInvitations(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userService.getInvitations(data);
    }

    @RequestMapping(value = "/service/replyInvitation",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject replyInvitation(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userService.replyInvitation(data);
    }

    @RequestMapping(value = "/service/getReplyInfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getReplyInfo(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userService.getCommentReply(data);
    }

    @RequestMapping(value = "/service/getPostilCommInfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getPostilCommInfo(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userService.getPostilCommentInfo(data);
    }

    @RequestMapping(value = "/service/getNoteCommInfo",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getNoteCommInfo(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return userService.getNoteCommInfo(data);
    }
}
