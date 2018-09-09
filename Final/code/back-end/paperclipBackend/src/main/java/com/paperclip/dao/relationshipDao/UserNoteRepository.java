package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.UserNote;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("userNRepo")
public interface UserNoteRepository extends CrudRepository<UserNote,Long> {
    List<UserNote> findByUser(User user);
    List<UserNote> findByNote(Note note);
    UserNote findDistinctByUserAndNote(User user,Note note);

    @Query("select o from UserNote o where o.user=:user and o.agreement=1 order by id desc ")
    List<UserNote> findLikesOfUser(@Param("user")User user);
}
