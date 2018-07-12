package com.paperclip.DaoTest;

import com.paperclip.dao.entityDao.PaperRepository;

import com.paperclip.dao.relationshipDao.StarPaperRepository;
import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;
import com.paperclip.dao.entityDao.UserRepository;

import com.paperclip.model.Relationship.StarPaper;
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
public class StarPaperDaoTest {
    @Autowired
    private PaperRepository paperRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private StarPaperRepository starPaperRepo;

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
        /*Paper p1 = new Paper("ics","zangby",3,"cpu");
        Paper p2 = new Paper("web","chenhp",5,"SSH");
        Paper p3 = new Paper("database","jboss",2,"index");
        paperRepo.save(p1);
        paperRepo.save(p2);
        paperRepo.save(p3);
        StarPaper sp1 = new StarPaper(user2,p1);
        StarPaper sp2 = new StarPaper(user2,p2);
        StarPaper sp3 = new StarPaper(user3,p2);
        StarPaper sp4 = new StarPaper(user3,p3);
        starPaperRepo.save(sp1);
        starPaperRepo.save(sp2);
        starPaperRepo.save(sp3);
        starPaperRepo.save(sp4);*/
    }

    @Test
    public void testDelete(){
        User user1 = userRepo.findOne("pear");
        Paper p1 = paperRepo.findOne(new Long(3));
        starPaperRepo.deleteDistinctByPaperAndUser(p1,user1);
        System.out.println("ok 1");

        User user2 = userRepo.findOne("null");
        Paper p2 = paperRepo.findOne(new Long(4));
        starPaperRepo.deleteDistinctByPaperAndUser(p2,user2);
        System.out.println("ok 2");
    }

}
