package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Paper;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("paperRepo")
public interface PaperRepository extends CrudRepository<Paper,Long>{
    @Query("select o from Paper o order by o.star desc")
    List<Paper> getRecommendPaper();
}
