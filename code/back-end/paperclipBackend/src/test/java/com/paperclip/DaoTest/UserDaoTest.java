package com.paperclip.DaoTest;


import com.paperclip.model.Entity.User;
import com.paperclip.dao.entityDao.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
public class UserDaoTest {
    @Autowired
    private UserRepository userRepo;

    @Test
    public void testSave(){
        User user1 = new User("apple","1234","12@qq.com");
        User user2 = new User("pear","12333","11");
        User user3 = new User("tomato","233","222@");
        userRepo.save(user1);
        userRepo.save(user2);
        userRepo.save(user3);

    }

}
