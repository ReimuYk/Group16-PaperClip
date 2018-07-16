package com.paperclip.model.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="senderName",referencedColumnName = "username")
    private User sender;//foreign key

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="receiverName",referencedColumnName = "username")
    private User receiver;//foreign key

    @Column(name = "time",nullable = false)
    private Date time;

    @Column(name = "content",nullable = false)
    private String content;

    // 0 -> not read; 1 -> has read;
    @Column(name = "hasRead",nullable = false)
    private int hasRead;

    public Message(){}

    public Message(User sender, User receiver, String content){
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.time = new Date();
        this.hasRead = 0;
    }

    public User getSender(){
        return sender;
    }

    public void setSender(User sender){
        this.sender = sender;
    }

    public User getReceiver(){
        return receiver;
    }

    public void setReceiver(User receiver){
        this.receiver = receiver;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time){
        this.time = time;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getHasRead() {
        return hasRead;
    }

    public void setHasRead(int hasRead) {
        this.hasRead = hasRead;
    }
}
