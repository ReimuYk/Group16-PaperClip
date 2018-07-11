package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.NoteComment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("noteCommRepo")
public interface NoteCommentRepository extends CrudRepository<NoteComment,Long>{

}
