package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.PostilComment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("postilCommRepo")
public interface PostilCommentRepository extends CrudRepository<PostilComment,Long>{

}
