package com.paperclip.model.Relationship;

import com.paperclip.model.Entity.User;

import javax.persistence.*;

@Entity
public class Follow {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="followee",referencedColumnName = "username")
    private User followee;//foreign key

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="follower",referencedColumnName = "username")
    private User follower;//foreign key

    public Follow(){}
    public Follow(User followee,User follower){
        this.followee = followee;
        this.follower = follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollowee(User followee) {
        this.followee = followee;
    }

    public User getFollowee() {
        return followee;
    }
}
