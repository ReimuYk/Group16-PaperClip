package com.paperclip.dao.entityDao;

import com.paperclip.model.Entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository("userRepo")
public interface UserRepository extends CrudRepository<User,String>{
    @Modifying
    @Query("update User o set o.follower = :num where username = :username")
    void updateFollowers(@Param("num") Integer num, @Param("username") String username);

    @Modifying
    @Query("update User o set o.following = :num where username = :username")
    void updateFollowings(@Param("num")Integer num, @Param("username")String username);
    
}
