package com.paperclip.ServiceTest;


import com.paperclip.service.UserInfoService;
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

import java.util.Iterator;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
@Rollback(false)
public class UserServiceTest {
    @Autowired
    private UserStarService us;

    @Before
    public void before(){
        System.out.println("test begin!");
    }

    @After
    public void after(){
        System.out.println("test finished!");
    }

    @Test
    public void testGetStarDoc(){
        JSONObject data = new JSONObject();
        data.accumulate("username","xiaobai");
        JSONArray aa = us.getStarDoc(data);
        System.out.println("xiaobai:\n"+aa);

        JSONObject data1 = new JSONObject();
        data1.accumulate("username","apple");
        JSONArray bb = us.getStarDoc(data1);
        System.out.println("apple:\n"+bb);

        JSONObject data2 = new JSONObject();
        data2.accumulate("username","null");
        JSONArray cc = us.getStarDoc(data2);
        System.out.println("null:\n"+cc);

    }

    @Test
    public void testQuitStarDoc(){
        JSONObject data = new JSONObject();
        data.accumulate("username","xiaobai");
        data.accumulate("docID",3);
        JSONObject aa = us.quitStarDoc(data);
        System.out.println("result1:\n"+aa.getString("result"));

        JSONObject data1 = new JSONObject();
        data1.accumulate("username","apple");
        JSONObject bb = us.quitStarDoc(data1);
        System.out.println("result2:\n"+bb.getString("result"));
    }
}
