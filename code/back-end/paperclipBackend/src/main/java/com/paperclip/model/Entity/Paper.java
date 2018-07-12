package com.paperclip.model.Entity;

import javax.persistence.*;

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
    @Column(name = "keyWords",nullable = false)
    private String keyWords;

    public Paper() {}

    public Paper(String title,String author,Integer pageNum,String keyWords){
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.keyWords = keyWords;
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

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public String getKeyWords() {
        return keyWords;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getPageNum() {
        return pageNum;
    }
}



