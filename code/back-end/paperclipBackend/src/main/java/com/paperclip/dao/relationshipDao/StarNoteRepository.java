package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.StarNote;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("starNoteRepo")
public interface StarNoteRepository extends CrudRepository<StarNote,Long>{
    List<StarNote> findByNote(Note note);
    List<StarNote> findByUser(User user);
    void deleteDistinctByNoteAndUser(Note note, User user);
}
