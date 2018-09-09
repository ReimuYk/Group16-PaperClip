package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Postil;
import com.paperclip.model.Entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("postilRepo")
public interface PostilRepository extends CrudRepository<Postil,Long>{
    List<Postil> findByUser(User user);
}
