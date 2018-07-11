package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Relationship.BlockPostil;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("blockPRepo")
public interface BlockPostilRepository extends CrudRepository<BlockPostil,Long>{

}
