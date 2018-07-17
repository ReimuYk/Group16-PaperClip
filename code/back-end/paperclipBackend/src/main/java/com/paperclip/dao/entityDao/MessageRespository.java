package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.Message;
import com.paperclip.model.Entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("messageRepo")
public interface MessageRespository extends CrudRepository<Message,Long> {

    List<Message> findBySender(User sender);

    @Query("select o from Message o where o.sender in (:users) and o.receiver in (:users)")
    List<Message> getConversation(@Param("users")List<User> users);

}
