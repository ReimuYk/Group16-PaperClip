package com.paperclip.DaoTest;


import com.paperclip.dao.relationshipDao.FollowRepository;
import com.paperclip.model.Entity.User;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.model.Relationship.Follow;
import net.sf.json.JSONObject;
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
public class FollowDaoTest {
    @Autowired
    private FollowRepository followRepo;

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
    public void testGetFollower(){
        User user1 = new User("apple","1234","12@qq.com");
        User user2 = new User("pear","12333","11");
        User user3 = new User("tomato","233","222@");
        userRepo.save(user1);
        userRepo.save(user2);
        userRepo.save(user3);

        System.out.println("ok here!");

        Follow f1 = new Follow(user1,user2);
        Follow f2 = new Follow(user1,user3);
        Follow f3 = new Follow(user2,user3);
        followRepo.save(f1);
        followRepo.save(f2);
        followRepo.save(f3);

        List<Follow> l1 = followRepo.findByFollowee(user1);
        System.out.println("Followers of "+user1.getUsername());
        Iterator<Follow> iter = l1.iterator();
        while(iter.hasNext()){  //执行过程中会执行数据锁定，性能稍差，若在循环过程中要去掉某个元素只能调用iter.remove()方法。
            System.out.println(iter.next().getFollower().getUsername());
        }

        List<Follow> l2 = followRepo.findByFollower(user3);
        System.out.println("Followings of "+user3.getUsername());
        Iterator<Follow> iter2 = l2.iterator();
        while(iter2.hasNext()){  //执行过程中会执行数据锁定，性能稍差，若在循环过程中要去掉某个元素只能调用iter.remove()方法。
            System.out.println(iter2.next().getFollowee().getUsername());
        }
    }

    @Test
    public void testGetRecent(){
        User user = userRepo.findOne("7");
        List<Follow> followList = followRepo.findByFolloweeOrderById(user);
        int count=0;
        for(Follow follow : followList){
            count++;
            if(count==5)
                break;
            System.out.println("followee" + follow.getFollowee().getUsername());
            System.out.println("follower" + follow.getFollower().getUsername());
        }
    }
}
