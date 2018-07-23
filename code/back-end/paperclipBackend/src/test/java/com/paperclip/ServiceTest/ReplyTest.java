package com.paperclip.ServiceTest;

import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.dao.entityDao.PostilCommentRepository;
import com.paperclip.dao.entityDao.PostilRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.Postil;
import com.paperclip.model.Entity.PostilComment;
import com.paperclip.model.Entity.User;
import com.paperclip.service.PaperService;
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

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
@Rollback(false)
public class ReplyTest {
    @Autowired
    private PaperService service;

    @Autowired
    private PostilCommentRepository postilCommRepo;

    @Before
    public void before() {
        System.out.println("test begin!");
    }

    @After
    public void after() {
        System.out.println("test finished!");
    }

    @Test
    public void testSearchPaper() throws UnsupportedEncodingException {
        PostilComment pc = postilCommRepo.findOne(new Long(1));
        String content = "@user2: 我试试";
        content = URLEncoder.encode(content, "UTF-8");
        service.ifReply(content,pc);
    }

}
