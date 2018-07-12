package com.paperclip.ServiceTest;

import com.paperclip.service.MailService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class MailServiceTest {
    @Autowired
    private MailService service;

    @Test
    public void test(){
        String to = "1245709462@qq.com";
        String subject = "test";
        String content = "看看能不能收到";
        service.singleMail(to,subject,content);
    }
}
