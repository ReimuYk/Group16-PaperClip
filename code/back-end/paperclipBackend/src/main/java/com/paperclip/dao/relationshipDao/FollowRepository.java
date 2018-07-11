package com.paperclip.dao.relationshipDao;

import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.Follow;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("followRepo")
public interface FollowRepository extends CrudRepository<Follow,Long>{
    List<Follow> findByFollowee(User followee);
    List<Follow> findByFollower(User follower);
}

