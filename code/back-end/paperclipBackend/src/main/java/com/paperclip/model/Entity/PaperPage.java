package com.paperclip.model.Entity;

import javax.persistence.*;

@Entity
public class PaperPage {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="paperId",referencedColumnName = "id")
    private Paper paper;//foreign key

    @Column(name = "pagination",nullable = false)
    private Integer pagination;
    @Column(name = "contentUrl",nullable = false)
    private String contentUrl;

    public PaperPage(){}
    public PaperPage(Paper paper,Integer pagination,String contentUrl){
        this.pagination = pagination;
        this.paper = paper;
        this.contentUrl = contentUrl;
    }

    public Long getId() {
        return id;
    }

    public void setPagination(Integer pagination) {
        this.pagination = pagination;
    }

    public Integer getPagination() {
        return pagination;
    }

    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    public void setPaper(Paper paper) {
        this.paper = paper;
    }

    public Paper getPaper() {
        return paper;
    }
}
