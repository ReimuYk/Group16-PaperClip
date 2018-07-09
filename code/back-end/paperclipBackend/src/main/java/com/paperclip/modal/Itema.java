package com.paperclip.modal;

import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.*;

@Entity
public class Itema {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;
    @Column(name = "name",nullable = false)
    private String name;
    @Column(name = "value",nullable = false)
    private String value;

    public Itema() {}

    public Itema(String name,String value){
        this.name = name;
        this.value = value;
    }

    public void setName(String name){ this.name = name;}
    public void setValue(String value){ this.value = value;}

    public Long getId(){ return this.id;}
    public String getName(){ return this.name;}
    public String getValue(){ return this.value;}
}
