package com.paperclip.ServiceTest;

import com.paperclip.service.UserService;
import com.paperclip.service.UserStarService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.util.Iterator;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
@Rollback(false)
public class UserServiceTest {
    @Autowired
    private UserService service;

    @Before
    public void before() {
        System.out.println("test begin!");
    }

    @After
    public void after() {
        System.out.println("test finished!");
    }

    @Test
    public void testFindPassword() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("userEmail", "0@qq.com");
        JSONObject rr = service.findPassword(data);
        System.out.println("result2:\n" + rr.getString("result"));
    }

    @Test
    public void testAddUser() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("username", "guoguo");
        data.accumulate("password", "gg123");
        data.accumulate("email", "gg111@qq.com");
        JSONObject rr = service.addUser(data);
        System.out.println("result:\n" + rr.getString("result"));

        JSONObject data1 = new JSONObject();
        data1.accumulate("username", "guoguo");
        data1.accumulate("password", "gg123");
        data1.accumulate("email", "gg1@qq.com");
        JSONObject rr1 = service.addUser(data1);
        System.out.println("result:\n" + rr1.getString("result"));
    }

    @Test
    public void testLogin() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("username", "guoguo");
        data.accumulate("password", "gg123");
        JSONObject rr = service.userLogin(data);
        System.out.println("result:\n" + rr.toString());

        JSONObject data1 = new JSONObject();
        data1.accumulate("username", "gg111@qq.com");
        data1.accumulate("password", "gg123");
        JSONObject rr1 = service.userLogin(data1);
        System.out.println("result:\n" + rr1.toString());

        JSONObject data2 = new JSONObject();
        data2.accumulate("username", "gg111@qq.com");
        data2.accumulate("password", "g23");
        JSONObject rr2 = service.userLogin(data2);
        System.out.println("result:\n" + rr2.toString());
    }

    @Test
    public void getUnreadMessage() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("username", "user2");
        JSONArray aa = service.getUnreadMessage(data);
        System.out.println(aa.toString());
    }

    @Test
    public void sendMessage() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("senderName", "user2");
        data.accumulate("receiverName","user3");
        data.accumulate("content","3-2");
        service.sendMessage(data);
    }

    @Test
    public void getConversation() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("hostname", "user2");
        data.accumulate("clientname","user1");
        JSONArray aa = service.getConversation(data);
        System.out.println(aa.toString());
    }

    @Test
    public void getBriefMessageList() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("username", "user2");
        JSONObject aa = service.getBriefMessageList(data);
        System.out.println(aa.toString());
    }
}
