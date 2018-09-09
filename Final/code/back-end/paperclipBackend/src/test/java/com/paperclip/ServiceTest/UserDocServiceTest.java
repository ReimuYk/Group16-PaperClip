package com.paperclip.ServiceTest;

import com.paperclip.service.UserDocService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.junit.After;
import org.junit.Assert;
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
@Rollback(true)
public class UserDocServiceTest {
    @Autowired
    private UserDocService service;

    @Before
    public void before() {
        System.out.println("test begin!");
    }

    @After
    public void after() {
        System.out.println("test finished!");
    }

    @Test
    public void testGetUserDoc() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("username","user66");
        JSONArray res = service.getUserDoc(data);
        System.out.println(res);
    }

    @Test
    public void testDeleteUserDoc () throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("username","user66");
        data.accumulate("docID",1);
        JSONObject res = service.deleteUserDoc(data);
        System.out.println(res);
    }

    @Test
    public void testGetUserDocDetail () throws UnsupportedEncodingException{
        JSONObject data = new JSONObject();
        data.accumulate("username","user66");
        data.accumulate("docID",1);
        JSONObject res = service.getUserDocDetail(data);
        System.out.println(res);
    }

    @Test
    public void testAddDocContributer () throws UnsupportedEncodingException{
        JSONObject data = new JSONObject();
        data.accumulate("hostname","user66");
        data.accumulate("clientname","user1");
        data.accumulate("docID",1);
        JSONObject res = service.addDocContributer(data);
        System.out.println(res);
    }

    @Test
    public void testAddDoc () throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("username","user66");
        data.accumulate("content","this is unit test doc content");
        data.accumulate("title","unittesttitle");
        JSONObject res = service.addDoc(data);
        System.out.println(res);
    }
}
