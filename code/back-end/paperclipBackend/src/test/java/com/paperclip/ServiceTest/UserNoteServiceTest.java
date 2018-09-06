package com.paperclip.ServiceTest;

import com.paperclip.service.UserNoteService;
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
public class UserNoteServiceTest {
    @Autowired
    private UserNoteService service;

    @Before
    public void before() {
        System.out.println("test begin!");
    }

    @After
    public void after() {
        System.out.println("test finished!");
    }

    @Test
    public void testAddNote() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("username","user66");
        data.accumulate("paperID",1);
        JSONObject res = service.addNote(data);
        System.out.println(res);
    }

    @Test
    public void testGetUserNote () throws UnsupportedEncodingException{
        JSONObject data = new JSONObject();
        data.accumulate("username","user1");
        JSONArray res = service.getUserNote(data);
        System.out.println(res);
    }

    @Test
    public  void testDeleteUserNote () throws UnsupportedEncodingException{
        JSONObject data = new JSONObject();
        data.accumulate("noteID",1);
        JSONObject res = service.deleteUserNote(data);
        System.out.println(res);
    }

    @Test
    public void testGetNoteDetail () throws  UnsupportedEncodingException{
        JSONObject data = new JSONObject();
        data.accumulate("noteID",1);
        JSONObject res = service.getNoteDetail(data);
        System.out.println(res);
    }
}
