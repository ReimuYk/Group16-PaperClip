package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.DocumentPdf;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("docPdfRepo")
public interface DocumentPdfRepository extends CrudRepository<DocumentPdf,Long>{

    List<DocumentPdf> findByDocument(Document doc);
}
