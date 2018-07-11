package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.Follow;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("followRepo")
public interface FollowRepository extends CrudRepository<Follow,Long>{
    @Query("select o from Follow o where o.followee = :user")
    List<Follow> findAllFollowers(@Param("user") User user);

    @Query("select o from Follow o where o.follower = :user")
    List<Follow> findAllFollowings(@Param("user") User user);
}

