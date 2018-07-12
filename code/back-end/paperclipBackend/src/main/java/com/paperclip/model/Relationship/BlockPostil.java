package com.paperclip.model.Relationship;

import com.paperclip.model.Entity.Block;
import com.paperclip.model.Entity.Postil;
import com.paperclip.model.Entity.User;

import javax.persistence.*;

@Entity
public class BlockPostil {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="blockId",referencedColumnName = "id")
    private Block block;//foreign key

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="postilId",referencedColumnName = "id")
    private Postil postil;//foreign key

    public BlockPostil(){}
    public BlockPostil(Block block, Postil postil){
        this.block = block;
        this.postil = postil;
    }

    public Postil getPostil() {
        return postil;
    }

    public void setPostil(Postil postil) {
        this.postil = postil;
    }

    public Block getBlock() {
        return block;
    }

    public void setBlock(Block block) {
        this.block = block;
    }
}
