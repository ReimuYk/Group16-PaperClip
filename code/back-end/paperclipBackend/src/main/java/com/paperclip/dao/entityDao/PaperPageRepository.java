package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.PaperPage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("paperPageRepo")
public interface PaperPageRepository extends CrudRepository<PaperPage,Long>{
    List<PaperPage> findByPaper(Paper paper);
}
