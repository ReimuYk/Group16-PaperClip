package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Relationship.UserPostil;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("userPRepo")
public interface UserPostilRepository extends CrudRepository<UserPostil,Long>{

}
