package com.paperclip.model.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Note {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="paperId",referencedColumnName = "id")
    private Paper paper;//foreign key

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name="username",referencedColumnName = "username")
    private User user;//foreign key

    @Column(name = "title",nullable = false)
    private String title;
    @Column(name = "content",nullable = false)
    private String content;
    @Column(name = "keyWords",nullable = false)
    private String keyWords;
    @Column(name = "date",nullable = false)
    private Date date;
    @Column(name = "agreement",nullable = false)
    private Integer agreement;
    @Column(name = "disagreement",nullable = false)
    private Integer disagreement;

    public Note(){};
    public Note(Paper paper,User user){
        this.paper = paper;
        this.user = user;
        this.title = "";
        this.content = "";
        this.keyWords = "";
        this.date = new Date();
        this.agreement = 0;
        this.disagreement = 0;
    }
    public Note(Paper paper,User user,String title,String content,String keyWords){
        this.paper = paper;
        this.user = user;
        this.title = title;
        this.content = content;
        this.keyWords = keyWords;
        this.date = new Date();
        this.agreement = 0;
        this.disagreement = 0;
    }

    public Long getId() {
        return id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Paper getPaper() {
        return paper;
    }

    public void setPaper(Paper paper) {
        this.paper = paper;
    }

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAgreement(Integer agreement) {
        this.agreement = agreement;
    }

    public Integer getAgreement() {
        return agreement;
    }
}
