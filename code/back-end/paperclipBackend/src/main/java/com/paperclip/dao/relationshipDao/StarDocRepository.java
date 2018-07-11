package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Relationship.StarDoc;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("starDocRepo")
public interface StarDocRepository extends CrudRepository<StarDoc,Long>{

}
