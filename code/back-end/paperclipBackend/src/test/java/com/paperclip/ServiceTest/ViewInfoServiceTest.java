package com.paperclip.ServiceTest;

import com.paperclip.service.ViewInfoService;
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

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
@Rollback(false)
public class ViewInfoServiceTest {
    @Autowired
    private ViewInfoService service;

    @Before
    public void before() {
        System.out.println("test begin!");
    }

    @After
    public void after() {
        System.out.println("test finished!");
    }

    @Test
    public void testGetViewDocDetail() throws UnsupportedEncodingException {
        JSONObject data = new JSONObject();
        data.accumulate("versionID",new Long(1));
        JSONObject rr = service.getViewDocDetail(data);
        System.out.println("result:\n" + rr.toString());
    }
}
