package com.paperclip.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.paperclip.model.Itema;

import java.util.List;

@Repository("aRepo")
public interface ItemaRepository extends CrudRepository<Itema,Long>{
    List<Itema> findByName(String name);
}
