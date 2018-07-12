package com.paperclip.model.Relationship;

import com.paperclip.model.Entity.Postil;
import com.paperclip.model.Entity.User;

import javax.persistence.*;

@Entity
public class UserPostil {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="username",referencedColumnName = "username")
    private User user;//foreign key

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="postilId",referencedColumnName = "id")
    private Postil postil;//foreign key

    @Column(name="agreement")
    private Integer agreement;/* 表示user对这个postil的赞踩：1表示赞，-1表示踩，0表示没有操作 */

    @Column(name="mark")
    private Integer mark;/* 表示user是否标记了这个postil：1表示标记了，0表示没有标记 */

    public UserPostil(){}
    public UserPostil(User user, Postil postil){
        this.user = user;
        this.postil = postil;
        this.agreement = 0;
        this.mark = 0;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setPostil(Postil postil) {
        this.postil = postil;
    }

    public Postil getPostil() {
        return postil;
    }

    public Integer getAgreement() {
        return agreement;
    }

    public void setAgreement(Integer agreement) {
        this.agreement = agreement;
    }

    public Integer getMark() {
        return mark;
    }

    public void setMark(Integer mark) {
        this.mark = mark;
    }
}
