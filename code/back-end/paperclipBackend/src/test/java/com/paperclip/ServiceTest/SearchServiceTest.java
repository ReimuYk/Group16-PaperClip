package com.paperclip.ServiceTest;

import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.model.Entity.Paper;
import com.paperclip.service.SearchService;
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
public class SearchServiceTest {
    @Autowired
    private SearchService service;

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
    public void testMatch(){
        String search = "no way";
        Paper paper = paperRepo.findOne(new Long(2));
        service.match(search,paper);
    }
}
