package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Block;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("blockRepo")
public interface BlockRepository extends CrudRepository<Block,Long>{

}
