package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Postil;
import com.paperclip.model.Entity.PostilComment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("postilCommRepo")
public interface PostilCommentRepository extends CrudRepository<PostilComment,Long>{
    List<PostilComment> findByPostil(Postil postil);
    List<PostilComment> findByPostilOrderByDateDesc(Postil postil);
}
