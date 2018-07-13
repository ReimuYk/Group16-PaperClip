package com.paperclip.ServiceTest;

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

import java.util.Iterator;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
@Rollback(false)
public class UserStarServiceTest {
    @Autowired
    private UserStarService service;

    @Before
    public void before() {
        System.out.println("test begin!");
    }

    @After
    public void after() {
        System.out.println("test finished!");
    }

    @Test
    public void testGetStarNote() {
        JSONObject data = new JSONObject();
        data.accumulate("username", "xiaobai");
        JSONArray aa = service.getStarNote(data);
        System.out.println("xiaobai:\n" + aa);

        JSONObject data1 = new JSONObject();
        data1.accumulate("username", "apple");
        JSONArray bb = service.getStarNote(data1);
        System.out.println("apple:\n" + bb);

        JSONObject data2 = new JSONObject();
        data2.accumulate("username", "null");
        JSONArray cc = service.getStarNote(data2);
        System.out.println("null:\n" + cc);

    }

    @Test
    public void testQuitStarNote() {
        JSONObject data = new JSONObject();
        data.accumulate("username", "xiaobai");
        data.accumulate("noteID", 4);
        JSONObject aa = service.quitStarNote(data);
        System.out.println("result1:\n" + aa.getString("result"));

        JSONObject data1 = new JSONObject();
        data1.accumulate("username", "apple");
        JSONObject bb = service.quitStarNote(data1);
        System.out.println("result2:\n" + bb.getString("result"));
    }

    @Test
    public void testGetStarPaper() {
        JSONObject data = new JSONObject();
        data.accumulate("username", "pear");
        JSONArray aa = service.getStarPaper(data);
        System.out.println("pear:\n" + aa);

    }

    @Test
    public void testQuitStarPaper() {
        JSONObject data = new JSONObject();
        data.accumulate("username", "xiaobai");
        data.accumulate("paperID", 2);
        JSONObject rr = service.quitStarPaper(data);
        System.out.println("result:\n" + rr.getString("result"));
    }

    @Test
    public void testStarUser(){
        JSONObject data = new JSONObject();
        data.accumulate("hostname", "xiaobai");
        data.accumulate("clientname", "pear");
        JSONObject rr = service.starUser(data);
        System.out.println("result:\n" + rr.getString("result"));
    }

    @Test
    public void testQuitStarUser(){
        JSONObject data = new JSONObject();
        data.accumulate("hostname", "tomato");
        data.accumulate("clientname", "pear");
        JSONObject rr = service.quitStarUser(data);
        System.out.println("result:\n" + rr.getString("result"));

        JSONObject data1 = new JSONObject();
        data1.accumulate("hostname", "tomato");
        data1.accumulate("clientname", "xiaobai");
        JSONObject rr1 = service.quitStarUser(data1);
        System.out.println("result:\n" + rr1.getString("result"));
    }

    @Test
    public void testGetStarUser() {
        JSONObject data = new JSONObject();
        data.accumulate("username", "xiaobai");
        JSONArray aa = service.getStarUser(data);
        System.out.println("xiaobai:\n" + aa);

    }
}
