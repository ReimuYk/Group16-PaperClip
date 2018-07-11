package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Relationship.Assist;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("assistRepo")
public interface AssistRepository extends CrudRepository<Assist,Long>{

}
