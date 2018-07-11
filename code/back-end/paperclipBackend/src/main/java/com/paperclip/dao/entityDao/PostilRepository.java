package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Postil;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("postilRepo")
public interface PostilRepository extends CrudRepository<Postil,Long>{

}
