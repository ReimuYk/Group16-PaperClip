package com.paperclip.model.Relationship;

import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.User;

import javax.persistence.*;

@Entity
public class Invite {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="username",referencedColumnName = "username")
    private User user;//foreign key

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="docId",referencedColumnName = "id")
    private Document document;//foreign key

    public Invite(){}
    public Invite(User user, Document document){
        this.user = user;
        this.document = document;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }
}
