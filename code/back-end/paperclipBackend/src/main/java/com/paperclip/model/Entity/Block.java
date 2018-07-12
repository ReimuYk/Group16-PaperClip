package com.paperclip.model.Entity;

import javax.persistence.*;

@Entity
public class Block {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name="paperPageId",referencedColumnName = "id")
    private PaperPage paperPage;//foreign key

    @Column(name = "location",nullable = false)
    private Integer location;
    @Column(name = "startPoint",nullable = false)
    private String startPoint;
    @Column(name = "endPoint",nullable = false)
    private String endPoint;
    @Column(name = "content",nullable = false)
    private String content;

    public Block(){}
    public Block(PaperPage paperPage, Integer location, String startPoint,String endPoint,String content){
        this.paperPage = paperPage;
        this.content = content;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.location = location;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getLocation() {
        return location;
    }

    public void setLocation(Integer location) {
        this.location = location;
    }

    public PaperPage getPaperPage() {
        return paperPage;
    }

    public void setPaperPage(PaperPage paperPage) {
        this.paperPage = paperPage;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }
}
