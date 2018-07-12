package com.paperclip.model.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Postil {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="username",referencedColumnName = "username")
    private User user;//foreign key

    @Column(name = "content",nullable = false)
    private String content;
    @Column(name = "agreement",nullable = false)
    private Integer agreement;
    @Column(name = "disagreement",nullable = false)
    private Integer disagreement;
    @Column(name = "date",nullable = false)
    private Date date;

    public Postil(){}
    public Postil(User user,String content){
        this.user = user;
        this.content = content;
        this.agreement = 0;
        this.disagreement = 0;
        this.date = new Date();
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

    public void setAgreement(Integer agreement) {
        this.agreement = agreement;
    }

    public Integer getAgreement() {
        return agreement;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getDisagreement() {
        return disagreement;
    }

    public void setDisagreement(Integer disagreement) {
        this.disagreement = disagreement;
    }
}
