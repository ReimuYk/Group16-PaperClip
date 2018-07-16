package com.paperclip.DaoTest;

import com.paperclip.dao.entityDao.MessageRespository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.model.Entity.Message;
import org.junit.AfterClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoRestTemplateCustomizer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

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
        Message message1 = new Message(userRepo.findOne("7"), userRepo.findOne("apple"), "balabala");
        Message message2 = new Message(userRepo.findOne("guoguo"), userRepo.findOne("7"), "balabala");

        messageRepo.save(message1);
        messageRepo.save(message2);
    }
}
