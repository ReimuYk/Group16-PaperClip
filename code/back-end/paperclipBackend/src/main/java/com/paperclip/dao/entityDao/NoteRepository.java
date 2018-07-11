package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Note;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("noteRepo")
public interface NoteRepository extends CrudRepository<Note,Long>{

}
