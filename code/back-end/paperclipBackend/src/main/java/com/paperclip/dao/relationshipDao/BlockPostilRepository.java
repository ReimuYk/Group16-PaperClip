package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.Block;
import com.paperclip.model.Entity.Postil;
import com.paperclip.model.Relationship.BlockPostil;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("blockPRepo")
public interface BlockPostilRepository extends CrudRepository<BlockPostil,Long>{
    List<BlockPostil> findByBlock(Block block);
    List<BlockPostil> findByPostil(Postil postil);

    @Query("select distinct o.postil from BlockPostil o where o.block in (:blocks)")
    List<Postil> findDistinctPostilByBlock(@Param("blocks") List<Block>blocks);
}
