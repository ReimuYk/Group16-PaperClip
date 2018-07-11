package com.paperclip.DaoTest;

import com.paperclip.dao.entityDao.*;

import com.paperclip.dao.relationshipDao.BlockPostilRepository;
import com.paperclip.dao.relationshipDao.StarPaperRepository;
import com.paperclip.model.Entity.*;

import com.paperclip.model.Relationship.BlockPostil;
import com.paperclip.model.Relationship.StarPaper;
import org.junit.After;
import org.junit.Assert;
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
public class BlockPostilDaoTest {
    @Autowired
    private PaperRepository paperRepo;

    @Autowired
    private PaperPageRepository paperPageRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BlockRepository blockRepo;

    @Autowired
    private PostilRepository postilRepo;

    @Autowired
    private BlockPostilRepository blockPRepo;

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
        Paper p = paperRepo.findOne(new Long(3));
        PaperPage pp = new PaperPage(p,3,"1.img");
        paperPageRepo.save(pp);
        Block b1 = new Block(pp,1,"(1,1)","(3,3)","Eat");
        Block b2 = new Block(pp,2,"(1,2)","(3,3)","big");
        Block b3 = new Block(pp,3,"(1,3)","(3,3)","apple");
        blockRepo.save(b1);
        blockRepo.save(b2);
        blockRepo.save(b3);
        User user = userRepo.findOne("apple");
        Postil pos = new Postil(user,"很不错呀");
        postilRepo.save(pos);
        BlockPostil bp1 = new BlockPostil(b1,pos);
        BlockPostil bp2 = new BlockPostil(b2,pos);
        BlockPostil bp3 = new BlockPostil(b3,pos);
        blockPRepo.save(bp1);
        blockPRepo.save(bp2);
        blockPRepo.save(bp3);

    }

    @Test
    public void testCount(){
        PaperPage p = paperPageRepo.findOne(new Long(1));
        List<Block> l = blockRepo.findByPaperPage(p);
        Integer num = blockPRepo.findDistinctPostilByBlock(l).size();
        System.out.println(num);
    }

}
