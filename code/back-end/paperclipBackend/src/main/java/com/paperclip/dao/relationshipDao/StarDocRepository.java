package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.StarDoc;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("starDocRepo")
public interface StarDocRepository extends CrudRepository<StarDoc,Long>{
    List<StarDoc> findByDocument(Document doc);
    List<StarDoc> findByUser(User user);
}
