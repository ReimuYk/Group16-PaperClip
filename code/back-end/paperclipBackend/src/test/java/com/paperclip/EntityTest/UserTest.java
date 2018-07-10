package com.paperclip.EntityTest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.paperclip.model.Entity.User;

@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations = {"classpath:application.properties"})
public class UserTest {
    @Test
    public void test(){
        System.out.println("test begin!");
        User user = new User("apple","12345","12@qq.com");
        System.out.println(user.getUsername()+" "+user.getPassword()+" "+user.getFollower());
    }
}
