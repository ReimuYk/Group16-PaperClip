package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.PaperPage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("paperPageRepo")
public interface PaperPageRepository extends CrudRepository<PaperPage,Long>{

}
