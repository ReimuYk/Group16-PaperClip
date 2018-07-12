package com.paperclip.service.impl;

import com.paperclip.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class MailServiceImpl implements MailService{
    private static final String HOST = "smtp.qq.com";
    private static final String SMTP = "smtp";
    private static final String USERNAME = "1245709462@qq.com";
    private static final String PASSWORD = "irpelrmohdomhfic";
    private static final int PORT = 587;//587/465
    private static final String DEFAULTENCODING = "UTF-8";

    private static JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();

    private static Properties prop = new Properties();

    static{
        // 设定mail server
        senderImpl.setHost(HOST);
        senderImpl.setProtocol(SMTP);
        senderImpl.setUsername(USERNAME);
        senderImpl.setPassword(PASSWORD);
        senderImpl.setPort(PORT);
        senderImpl.setDefaultEncoding(DEFAULTENCODING);

        // 设定properties
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.timeout", "25000");
        //设置调试模式可以在控制台查看发送过程
        prop.put("mail.debug", "true");

        senderImpl.setJavaMailProperties(prop);
    }

    /* 发送简单文本邮件
     * @param to 收件人邮箱数组
     * @param subject 主题
     * @param content 内容
     * @return
     */
    public boolean singleMail(String to, String subject, String content){
        boolean result = true;

        String[] array = new String[] {to};
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        // 设置收件人，寄件人 用数组发送多个邮件
        mailMessage.setTo(array);
        mailMessage.setFrom(USERNAME);
        mailMessage.setSubject(subject);
        mailMessage.setText(content);
        // 发送邮件
        try {
            senderImpl.send(mailMessage);
        } catch (MailException e) {
            e.printStackTrace();
            result = false;
        }
        return result;
    }




}
