package com.paperclip.model.Relationship;

import com.paperclip.model.Entity.DocumentPdf;
import com.paperclip.model.Entity.User;

import javax.persistence.*;

@Entity
public class Assist {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="username",referencedColumnName = "username")
    private User user;//foreign key

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="docId",referencedColumnName = "id")
    private DocumentPdf documentPdf;//foreign key

    public Assist(){}
    public Assist(User user, DocumentPdf documentPdf){
        this.user = user;
        this.documentPdf = documentPdf;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public DocumentPdf getDocumentPdf() {
        return documentPdf;
    }

    public void setDocumentPdf(DocumentPdf documentPdf) {
        this.documentPdf = documentPdf;
    }
}
