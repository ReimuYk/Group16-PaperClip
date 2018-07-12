package com.paperclip.model.Entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class User {
    private static final String defaultAvatar = "";
    @Id
    @GeneratedValue(generator  = "usernameStrategy")
    @GenericGenerator(name = "usernameStrategy", strategy = "assigned")
    @Column(name = "username",nullable = false)
    private String username;

    @Column(name = "password",nullable = false)
    private String password;
    @Column(name = "email",nullable = false)
    private String email;
    @Column(name = "avatar")
    private String avatar;
    @Column(name = "description")
    private String description;
    @Column(name = "following",nullable = false)
    private Integer following;
    @Column(name = "follower",nullable = false)
    private Integer follower;

    public User() {}

    public User(String username,String password,String email){
        this.username = username;
        this.password = password;
        this.email = email;
        this.follower = 0;
        this.following = 0;
        this.avatar = defaultAvatar;
        this.description = "welcome to Paperclip";
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setFollower(Integer follower) {
        this.follower = follower;
    }

    public Integer getFollower() {
        return follower;
    }

    public void setFollowing(Integer following) {
        this.following = following;
    }

    public Integer getFollowing() {
        return following;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
