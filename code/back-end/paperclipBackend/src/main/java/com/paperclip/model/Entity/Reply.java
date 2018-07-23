package com.paperclip.model.Entity;

import com.paperclip.model.Entity.User;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Reply {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="receiverName",referencedColumnName = "username")
    private User receiver;//foreign key

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="pComId",referencedColumnName = "id")
    private PostilComment comment;//foreign key

    public Reply(){};
    public Reply(User receiver,PostilComment comment){
        this.comment = comment;
        this.receiver = receiver;
    }

    public Long getId() {
        return id;
    }


    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public PostilComment getComment() {
        return comment;
    }

    public void setComment(PostilComment comment) {
        this.comment = comment;
    }
}

