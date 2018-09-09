package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.Assist;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("assistRepo")
public interface AssistRepository extends CrudRepository<Assist,Long>{
    List<Assist> findByDocument(Document document);
    List<Assist> findByUser(User user);
    void deleteDistinctByDocumentAndUser(Document doc,User user);
}
