package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("noteRepo")
public interface NoteRepository extends CrudRepository<Note,Long>{
    List<Note> findByPaper(Paper paper);
    List<Note> findByUser(User user);
    Note findDistinctByUserAndPaper(User user,Paper paper);

    @Query("select o from Note o order by (o.agreement*0.3 + o.star*0.7) desc")
    List<Note> getRecommendNote();

    List<Note> findByUserOrderByDateDesc(User user);

}
