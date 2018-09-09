package com.paperclip.model.Relationship;

import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.User;

import javax.persistence.*;

@Entity
public class StarNote {
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

    public StarNote(){}
    public StarNote(User user,Note note){
        this.user = user;
        this.note = note;
    }

    public Note getNote() {
        return note;
    }

    public void setNote(Note note) {
        this.note = note;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
