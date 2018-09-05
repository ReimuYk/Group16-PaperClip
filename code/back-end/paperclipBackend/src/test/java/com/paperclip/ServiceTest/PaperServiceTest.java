package com.paperclip.ServiceTest;

import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.service.PaperService;
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
@Rollback(false)
public class PaperServiceTest {
    @Autowired
    private PaperService service;

    @Autowired
    private PaperRepository paperRepo;

    @Before
    public void before() {
        System.out.println("test begin!");
    }

    @After
    public void after() {
        System.out.println("test finished!");
    }

    @Test
    public void testGetPaperDetail() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("paperID",1);
        data.accumulate("pagination",1);
        JSONObject a = service.getPaperDetail(data);
        Assert.assertEquals(5,a.getInt("pagenum"));
        data.accumulate("username","user1");
        a = service.getPaperDetail(data);
        Assert.assertEquals(5,a.getInt("pagenum"));
    }

    @Test
    public void testGetBlockPostils () throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("paperID",1);
        data.accumulate("pagination",1);
        JSONArray sel = new JSONArray();
        sel.add(5);
        data.accumulate("selectid",sel);
        data.accumulate("username","user1");
        JSONArray res = service.getBlockPostils(data);
        System.out.println(res);
    }
}
