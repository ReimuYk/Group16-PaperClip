package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.DocumentPdf;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository("docPdfRepo")
public interface DocumentPdfRepository extends CrudRepository<DocumentPdf,Long>{

}
