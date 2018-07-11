package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("userRepo")
public interface UserRepository extends CrudRepository<User,String>{

}
