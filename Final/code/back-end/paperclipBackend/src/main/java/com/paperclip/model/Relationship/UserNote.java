package com.paperclip.model.Relationship;

import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.Postil;
import com.paperclip.model.Entity.User;

import javax.persistence.*;

@Entity
public class UserNote {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="username",referencedColumnName = "username")
    private User user;//foreign key

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="noteId",referencedColumnName = "id")
    private Note note;//foreign key

    @Column(name="agreement")
    private Integer agreement;/* 表示user对这个note的赞踩：1表示赞，0表示没有操作 */


    public UserNote(){}
    public UserNote(User user, Note note){
        this.user = user;
        this.note = note;
        this.agreement = 0;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setNote(Note note) {
        this.note = note;
    }

    public Note getNote() {
        return note;
    }

    public Integer getAgreement() {
        return agreement;
    }

    public void setAgreement(Integer agreement) {
        this.agreement = agreement;
    }

}
