package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.DocumentRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.dao.relationshipDao.FollowRepository;
import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.Follow;
import com.paperclip.service.ImgService;
import com.paperclip.service.ViewInfoService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

@Service
public class ViewInfoServiceImpl implements ViewInfoService {

    @Autowired
    FollowRepository followRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    DocumentRepository docRepo;

    @Autowired
    ImgService imgService;

    // get this user's fans
    public JSONArray getUserFans(JSONObject data) {
        JSONArray fans = new JSONArray();

        String username = data.getString("username");
        User user = userRepo.findOne(username);
        List<Follow> followList = followRepo.findByFollowee(user);
        Iterator<Follow> followIterable = followList.iterator();
        while(followIterable.hasNext()){
            Follow follow = followIterable.next();
            User follower = follow.getFollower();
            JSONObject fan = new JSONObject();
            fan.accumulate("username", follower.getUsername());
            fan.accumulate("description", follower.getDescription());
            fan.accumulate("userheader", imgService.getUserHeader(follower));
            fans.add(fan);
        }
        return fans;
    }

    public JSONObject getViewDocDetail(JSONObject data) {
        JSONObject docJson = new JSONObject();
        Long docID = data.getLong("docID");
        Document doc = docRepo.findOne(docID);
        // the doc dose not exist
        if(doc==null)
            return docJson;
        docJson.accumulate("docID", doc.getId());
        docJson.accumulate("title", doc.getTitle());
        docJson.accumulate("content", doc.getContent());
        docJson.accumulate("author", doc.getUser().getUsername());
        docJson.accumulate("userheader", doc.getUser().getAvatar());
        docJson.accumulate("userDescription", doc.getUser().getDescription());
        return docJson;
    }

    public JSONArray getHomeInfo(JSONObject data) {
        JSONArray homeinfo = new JSONArray();
        JSONObject followMement = new JSONObject();
        followMement.accumulate("title", "我关注的人的动态");

        JSONArray followContent = new JSONArray();
        JSONObject followM1 = new JSONObject();
        followM1.accumulate("title", "动态1");
        followM1.accumulate("description", "动态1 描述");

        followContent.add(followM1);
        followMement.accumulate("content", followContent);
        return homeinfo;
    }


    public JSONObject getHostInfo(JSONObject data) {
        JSONObject user = new JSONObject();
        System.out.println("getHostInfo: get data:"+data);
        String username = data.getString("username");
        User host = userRepo.findOne(username);
        String avatar = imgService.getUserHeader(host);
        user.accumulate("userheader", avatar);
        user.accumulate("username",host.getUsername());
        user.accumulate("fensno", host.getFollower());
        user.accumulate("followno", host.getFollowing());
        user.accumulate("userDescription", host.getDescription());
        return user;
    }

    public JSONObject getClientInfo(JSONObject data) {
        JSONObject user = new JSONObject();
        String hostname = data.getString("hostname");
        String clientname = data.getString("clientname");
        User host = userRepo.findOne(hostname);
        User client = userRepo.findOne(clientname);
        Follow follow = followRepo.findDistinctByFolloweeAndFollower(client, host);
        if(follow == null){
            user.accumulate("isStar", 0);
        }else{
            user.accumulate("isStar", 1);
        }
        user.accumulate("userheader", imgService.getUserHeader(client));
        user.accumulate("username", clientname);
        user.accumulate("fensno", client.getFollower());
        user.accumulate("followno", client.getFollowing());
        user.accumulate("userDescriptioin", client.getDescription());
        return user;
    }


    public JSONObject modifyUserInfo(JSONObject data) {
        JSONObject result = new JSONObject();
        String username = data.getString("username");
        String password = data.getString("password");
        String userHeader = data.getString("userheader");
        String description = data.getString("description");
        User user = userRepo.findOne(username);
        if(user == null){
            result.accumulate("result", "fail");
        }else{
            user.setAvatar(userHeader);
            user.setPassword(password);
            user.setDescription(description);
            userRepo.save(user);
            result.accumulate("result", "success");
        }
        return result;
    }
}
