package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Document;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("docRepo")
public interface DocumentRepository extends CrudRepository<Document,Long>{

}
