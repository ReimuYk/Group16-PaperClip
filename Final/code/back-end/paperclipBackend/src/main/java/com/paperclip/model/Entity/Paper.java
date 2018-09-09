package com.paperclip.model.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Paper {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;
    @Column(name = "title",nullable = false)
    private String title;
    @Column(name = "author",nullable = false)
    private String author;
    @Column(name = "pageNum",nullable = false)
    private Integer pageNum;
    @Column(name = "keyWords")
    private String keyWords;
    @Column(name = "tag")
    private String tag;
    @Column(name = "star")
    private Integer star;


    public Paper() {}

    public Paper(String title,String author,Integer pageNum,String keyWords,String tag){
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.keyWords = keyWords;
        this.tag = tag;
        this.star = 0;
    }

    public Long getId() {
        return id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthor() {
        return author;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getPageNum() {
        return pageNum;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public String getKeyWords() {
        return keyWords;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public Integer getStar() {
        return star;
    }
}



