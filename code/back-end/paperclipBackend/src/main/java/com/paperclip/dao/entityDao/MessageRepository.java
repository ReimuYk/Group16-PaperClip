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
public interface MessageRepository extends CrudRepository<Message,Long> {

    @Query("select o from Message o where o.sender in (:users) and o.receiver in (:users)")
    List<Message> getConversation(@Param("users")List<User> users);

    @Query("select o from Message o where  o.receiver=:user and o.hasRead=0 order by o.time DESC ")
    List<Message> getUnreadMessage(@Param("user")User user);

    @Query("select o from Message o where o.receiver=:user or o.sender=:user order by o.time desc")
    List<Message> getAllMessage(@Param("user")User user);

}
