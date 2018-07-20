package com.paperclip.model.Entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class DocumentPdf extends Paper{
    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name="documentId",referencedColumnName = "id")
    private Document document;//foreign key

    @Column(name = "version",nullable = false)
    private Integer version;
    @Column(name = "date",nullable = false)
    private Date date;

    public DocumentPdf(){}
    public DocumentPdf(Document document,Integer version){
        this.document = document;
        this.version = version;
        this.date = new Date();
        this.setTitle(document.getTitle());
        this.setAuthor(document.getUser().getUsername());
        this.setStar(0);
        this.setPageNum(0);
        this.setKeyWords("");
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Integer getVersion() {
        return version;
    }

    @Override
    public String getKeyWords() {
        return super.getKeyWords();
    }

    @Override
    public void setKeyWords(String keyWords) {
        super.setKeyWords(keyWords);
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    @Override
    public Long getId() {
        return super.getId();
    }

    @Override
    public Integer getPageNum() {
        return super.getPageNum();
    }

    @Override
    public void setPageNum(Integer pageNum) {
        super.setPageNum(pageNum);
    }

    @Override
    public String getAuthor() {
        return super.getAuthor();
    }

    @Override
    public void setAuthor(String author) {
        super.setAuthor(author);
    }

    @Override
    public String getTitle() {
        return super.getTitle();
    }

    @Override
    public void setTitle(String title) {
        super.setTitle(title);
    }

    @Override
    public Integer getStar() {
        return super.getStar();
    }

    @Override
    public void setStar(Integer star) {
        super.setStar(star);
    }
}
