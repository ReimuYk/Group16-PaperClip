package com.paperclip.service;

public interface MailService {
    boolean singleMail(String to, String subject, String content);
}
