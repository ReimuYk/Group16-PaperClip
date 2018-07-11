package com.paperclip.DaoTest;


import com.paperclip.dao.entityDao.DocumentRepository;
import com.paperclip.dao.relationshipDao.FollowRepository;
import com.paperclip.dao.relationshipDao.StarDocRepository;
import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.User;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.model.Relationship.Follow;
import com.paperclip.model.Relationship.StarDoc;
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
public class StarDocDaoTest {
    @Autowired
    private DocumentRepository docRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private StarDocRepository starDocRepo;

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
        User user1 = userRepo.findOne("apple");
        User user2 = userRepo.findOne("pear");
        User user3 = userRepo.findOne("xiaobai");
        Document doc1 = new Document(user1,"标题1","内容1");
        Document doc2 = new Document(user1,"标题2","内容2");
        Document doc3 = new Document(user2,"标题3","内容3");
        docRepo.save(doc1);
        docRepo.save(doc2);
        docRepo.save(doc3);
        StarDoc sd1 = new StarDoc(user3,doc1);
        StarDoc sd2 = new StarDoc(user3,doc2);
        StarDoc sd3 = new StarDoc(user2,doc2);
        StarDoc sd4 = new StarDoc(user2,doc3);
        starDocRepo.save(sd1);
        starDocRepo.save(sd2);
        starDocRepo.save(sd3);
        starDocRepo.save(sd4);
    }

    @Test
    public void testDelete(){
        User user1 = userRepo.findOne("pear");
        Document doc1 = docRepo.findOne(new Long(4));
        starDocRepo.deleteDistinctByDocumentAndUser(doc1,user1);
        System.out.println("ok 1");

        User user2 = userRepo.findOne("null");
        Document doc2 = docRepo.findOne(new Long(4));
        starDocRepo.deleteDistinctByDocumentAndUser(doc2,user1);
        System.out.println("ok 2");
    }

}
