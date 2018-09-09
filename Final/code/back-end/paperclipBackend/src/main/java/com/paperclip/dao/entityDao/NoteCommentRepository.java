package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.NoteComment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("noteCommRepo")
public interface NoteCommentRepository extends CrudRepository<NoteComment,Long>{
    List<NoteComment> findByNote(Note note);
    List<NoteComment> findByNoteOrderByDateDesc(Note note);
}
