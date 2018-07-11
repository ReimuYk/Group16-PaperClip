package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Block;
import com.paperclip.model.Entity.PaperPage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("blockRepo")
public interface BlockRepository extends CrudRepository<Block,Long>{
    List<Block> findByPaperPage(PaperPage paperPage);
}
