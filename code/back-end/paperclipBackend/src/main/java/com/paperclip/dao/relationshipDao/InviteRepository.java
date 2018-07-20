package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.Invite;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("inviteRepo")
public interface InviteRepository extends CrudRepository<Invite,Long>{
    List<Invite> findByDocument(Document document);
    List<Invite> findByUser(User user);
}
