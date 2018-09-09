package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("docRepo")
public interface DocumentRepository extends CrudRepository<Document,Long>{
    List<Document> findByUser(User user);
}
