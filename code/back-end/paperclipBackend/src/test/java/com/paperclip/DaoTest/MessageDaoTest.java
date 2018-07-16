package com.paperclip.DaoTest;

import com.paperclip.dao.entityDao.MessageRespository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.model.Entity.Message;
import com.paperclip.model.Entity.User;
import org.junit.AfterClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoRestTemplateCustomizer;
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
public class MessageDaoTest {
    @Autowired
    MessageRespository messageRepo;

    @Autowired
    UserRepository userRepo;

    @Test
    public void addMessage(){
        User user0 = userRepo.findOne("user0");
        User user1 = userRepo.findOne("user1");
        User user2 = userRepo.findOne("user2");

        Message m1 = new Message(user0,user1,"1-1");
        Message m2 = new Message(user1,user0,"1-2");
        Message m3 = new Message(user1,user0,"1-3");
        Message m4 = new Message(user1,user2,"2-1");
        Message m5 = new Message(user2,user1,"2-2");

        messageRepo.save(m1);
        messageRepo.save(m2);
        messageRepo.save(m3);
        messageRepo.save(m4);
        messageRepo.save(m5);
    }

    @Test
    public void getConversation() {
        User user0 = userRepo.findOne("user0");
        User user1 = userRepo.findOne("user1");

        List<User> users = new ArrayList<>();
        users.add(user0);
        users.add(user1);
        List<Message> c = messageRepo.getConversation(users);
        Iterator<Message> it = c.iterator();
        while (it.hasNext()){
            System.out.println(it.next().getContent());
        }
    }
}
