package com.paperclip.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.paperclip.modal.Itemb;

import java.util.List;

@Repository("bRepo")
public interface ItembRepository extends CrudRepository<Itemb,Long>{
    List<Itemb> findByName(String name);
    List<Itemb> findByValue(String value);
}
