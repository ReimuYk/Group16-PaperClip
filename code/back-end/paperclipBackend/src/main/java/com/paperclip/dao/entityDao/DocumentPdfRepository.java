package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.DocumentPdf;
import com.paperclip.model.Entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("docPdfRepo")
public interface DocumentPdfRepository extends CrudRepository<DocumentPdf,Long>{
    List<DocumentPdf> findByDocument(Document doc);

    @Query("select max(o.version) from DocumentPdf o where o.document=:doc")
    Integer getMaxVersion(@Param("doc")Document doc);
}
