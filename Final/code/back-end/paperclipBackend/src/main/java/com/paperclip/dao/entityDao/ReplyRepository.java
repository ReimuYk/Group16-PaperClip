package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.Reply;
import com.paperclip.model.Entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("replyRepo")
public interface ReplyRepository extends CrudRepository<Reply,Long> {
    public List<Reply> findByReceiver(User user);
}
