package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.StarNote;
import com.paperclip.model.Relationship.StarPaper;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("starPaperRepo")
public interface StarPaperRepository extends CrudRepository<StarPaper,Long>{
    List<StarPaper> findByPaper(Paper paper);
    List<StarPaper> findByUser(User user);
    void deleteDistinctByPaperAndUser(Paper paper, User user);
}
