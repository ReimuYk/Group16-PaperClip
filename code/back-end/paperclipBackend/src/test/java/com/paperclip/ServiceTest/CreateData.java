package com.paperclip.ServiceTest;

import com.paperclip.dao.entityDao.*;
import com.paperclip.dao.relationshipDao.BlockPostilRepository;
import com.paperclip.model.Entity.*;
import com.paperclip.model.Relationship.BlockPostil;
import com.paperclip.service.SearchService;
import com.paperclip.service.UserService;
import com.paperclip.service.UserStarService;
import com.sun.org.apache.bcel.internal.generic.BREAKPOINT;
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

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
@Rollback(false)
public class CreateData {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PaperRepository paperRepo;

    @Autowired
    private BlockRepository blockRepo;

    @Autowired
    private PostilRepository postilRepo;

    @Autowired
    private BlockPostilRepository blockPRepo;

    @Autowired
    private PostilCommentRepository postilCommRepo;

    @Before
    public void before() {
        System.out.println("create begin!");
    }

    @After
    public void after() {
        System.out.println("create finished!");
    }

    @Test
    public void createUserData(){
        List<User> uu = new ArrayList<>();
        for(int i = 0;i<100;i++){
            String username = "user"+i;
            String password = "pwd"+i;
            String email = "email"+i;
            User user = new User(username,password,email);
            uu.add(user);
        }
        userRepo.save(uu);
    }

    @Test
    public void createPostilData(){
        Iterable<Block> blocks = blockRepo.findAll();
        Iterable<User> uu = userRepo.findAll();
        Iterator<User> users = uu.iterator();
        List<Postil> postils = new ArrayList<>();
        List<BlockPostil> bps = new ArrayList<>();
        Integer count = 0;
        for(Block block: blocks){
            if(users.hasNext()){
                User user = users.next();
                Postil postil = new Postil(user,"postils for block "+block.getContent());
                postil.setAgreement((count+5)%12+1);
                postil.setDisagreement((count*2)%12+2);
                postils.add(postil);
                BlockPostil bp = new BlockPostil(block,postil);
                bps.add(bp);
            }
            else{
                users = uu.iterator();
            }
            count += 1;
        }
        postilRepo.save(postils);
        blockPRepo.save(bps);
    }

    @Test
    public void createPostilCommentData(){
        Iterable<Postil> postils = postilRepo.findAll();
        Iterable<User> uu = userRepo.findAll();
        Iterator<User> users = uu.iterator();
        List<PostilComment> pcs = new ArrayList<>();
        for(Postil postil:postils){
            if(users.hasNext()){
                User user = users.next();
                PostilComment pc = new PostilComment(postil,user,"我觉得"+postil.getContent()+"是对的");
                pcs.add(pc);
            }
            else{
                users = uu.iterator();
            }
        }
        postilCommRepo.save(pcs);
    }

}
