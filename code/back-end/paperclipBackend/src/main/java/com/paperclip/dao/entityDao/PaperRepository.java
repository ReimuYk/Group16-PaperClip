package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Paper;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("paperRepo")
public interface PaperRepository extends CrudRepository<Paper,Long>{

}
