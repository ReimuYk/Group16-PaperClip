package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.UserNote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("userNRepo")
public interface UserNoteRepository extends CrudRepository<UserNote,Long> {
    List<UserNote> findByUser(User user);

    List<UserNote> findByNote(Note note);
    UserNote findDistinctByUserAndNote(User user,Note note);
}
