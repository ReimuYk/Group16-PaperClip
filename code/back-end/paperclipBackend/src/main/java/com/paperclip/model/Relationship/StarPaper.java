package com.paperclip.model.Relationship;

import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;

import javax.persistence.*;

@Entity
public class StarPaper {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="username",referencedColumnName = "username")
    private User user;//foreign key

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="paperId",referencedColumnName = "id")
    private Paper paper;//foreign key

    public StarPaper(){}
    public StarPaper(User user,Paper paper){
        this.user = user;
        this.paper = paper;
    }

    public void setPaper(Paper paper) {
        this.paper = paper;
    }

    public Paper getPaper() {
        return paper;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
