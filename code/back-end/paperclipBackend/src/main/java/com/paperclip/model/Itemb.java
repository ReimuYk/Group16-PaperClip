package com.paperclip.model;

import javax.persistence.*;

@Entity
public class Itemb {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;
    @Column(name = "name",nullable = false)
    private String name;
    @Column(name = "value",nullable = false)
    private String value;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="fka_id",referencedColumnName = "id")
    private Itema fka;//foreign key

    public Itemb() {}

    public Itemb(String name,String value,Itema fka){
        this.name = name;
        this.value = value;
        this.fka = fka;
    }

    public void setName(String name){ this.name = name;}
    public void setValue(String value){ this.value = value;}
    public void setFka(Itema fka){ this.fka = fka;}

    public Long getId() { return this.id;}
    public String getName(){ return this.name;}
    public String getValue(){ return this.value;}
}
