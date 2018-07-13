package com.paperclip.model.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class PostilComment {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="postilId",referencedColumnName = "id")
    private Postil postil;//foreign key

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name="username",referencedColumnName = "username")
    private User user;//foreign key

    @Column(name = "content",nullable = false)
    private String content;
    @Column(name = "date",nullable = false)
    private Date date;

    public PostilComment(){}
    public PostilComment(Postil postil, User user, String content){
        this.postil = postil;
        this.user = user;
        this.content = content;
        this.date = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Postil getPostil() {
        return postil;
    }

    public void setPostil(Postil postil) {
        this.postil = postil;
    }
}
