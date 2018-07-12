package com.paperclip.DaoTest;


import com.paperclip.dao.entityDao.DocumentPdfRepository;
import com.paperclip.dao.entityDao.DocumentRepository;
import com.paperclip.dao.relationshipDao.FollowRepository;
import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.DocumentPdf;
import com.paperclip.model.Entity.User;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.model.Relationship.Follow;
import org.assertj.core.util.Compatibility;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
@Rollback(false)
public class DocumentPdfDaoTest {
    @Autowired
    private DocumentPdfRepository docPdfRepo;

    @Autowired
    private DocumentRepository docRepo;

    @Autowired
    private UserRepository userRepo;

    @Before
    public void before(){
        System.out.println("test begin!");
    }

    @After
    public void after(){
        System.out.println("test finished!");
    }

    @Test
    public void testSave(){
        User user = userRepo.findOne("xiaobai");
        Document doc = new Document(user,"web","online bookshop");
        DocumentPdf dp = new DocumentPdf(doc,1);
        dp.setKeyWords("oh no");
        dp.setPageNum(2);

        userRepo.save(user);
        docRepo.save(doc);
        docPdfRepo.save(dp);

    }

}
