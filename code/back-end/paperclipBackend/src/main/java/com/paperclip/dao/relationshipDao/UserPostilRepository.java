package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.Postil;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.UserPostil;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("userPRepo")
public interface UserPostilRepository extends CrudRepository<UserPostil,Long>{
    List<UserPostil> findByUser(User user);
    List<UserPostil> findByPostil(Postil postil);
}
