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
import org.assertj.core.error.ShouldBeAfterYear;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
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
    public JSONArray getUserFans(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n==============\nget json:"+data);

        JSONArray fans = new JSONArray();

        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User user = userRepo.findOne(username);
        List<Follow> followList = followRepo.findByFollowee(user);
        Iterator<Follow> followIterable = followList.iterator();
        while(followIterable.hasNext()){
            Follow follow = followIterable.next();
            User follower = follow.getFollower();
            JSONObject fan = new JSONObject();
            fan.accumulate("username", URLDecoder.decode(follower.getUsername(), "UTF-8"));
            fan.accumulate("description", URLDecoder.decode(follower.getDescription(), "UTF-8"));
            fan.accumulate("userheader", imgService.getUserHeader(follower));
            fans.add(fan);
        }
        System.out.println("\n\n===================\nreturn: "+fans);
        return fans;
    }

    public JSONObject getViewDocDetail(JSONObject data) throws UnsupportedEncodingException {
        JSONObject docJson = new JSONObject();
        Long docID = data.getLong("docID");
        Document doc = docRepo.findOne(docID);
        // the doc dose not exist
        if(doc==null)
            return docJson;
        docJson.accumulate("docID", doc.getId());
        docJson.accumulate("title", URLDecoder.decode(doc.getTitle(), "UTF-8"));
        docJson.accumulate("content", URLDecoder.decode(doc.getContent(), "UTF-8"));
        docJson.accumulate("author", URLDecoder.decode(doc.getUser().getUsername(), "UTF-8"));
        docJson.accumulate("userheader", doc.getUser().getAvatar());
        docJson.accumulate("userDescription", URLDecoder.decode(doc.getUser().getDescription(), "UTF-8"));
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


    public JSONObject getHostInfo(JSONObject data) throws UnsupportedEncodingException {
        JSONObject user = new JSONObject();
        System.out.println("getHostInfo: get data:"+data);
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User host = userRepo.findOne(username);
        String avatar = imgService.getUserHeader(host);
        user.accumulate("userheader", avatar);
        user.accumulate("username",URLDecoder.decode(host.getUsername(), "UTF-8"));
        user.accumulate("fensno", host.getFollower());
        user.accumulate("followno", host.getFollowing());
        user.accumulate("userDescription", URLDecoder.decode(host.getDescription(), "UTF-8"));
        return user;
    }

    public JSONObject getClientInfo(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("==========================");
        System.out.println("get json: "+data);

        JSONObject user = new JSONObject();
        String hostname = data.getString("hostname");
        String clientname = data.getString("clientname");

//        hostname = URLEncoder.encode(hostname, "UTF-8");
//        clientname = URLEncoder.encode(clientname, "UTF-8");

        User host = userRepo.findOne(hostname);
        User client = userRepo.findOne(clientname);

        System.out.println("client: "+client);
        System.out.println("client name, after decode:"+URLDecoder.decode(clientname, "UTF-8"));

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
        user.accumulate("userDescription", URLDecoder.decode(client.getDescription(), "UTF-8"));
        System.out.println("get client info: "+user.toString());
        return user;
    }


    public JSONObject modifyUserInfo(JSONObject data) throws UnsupportedEncodingException {
        JSONObject result = new JSONObject();
        String username = data.getString("username");
        String password = data.getString("password");
        String userHeader = data.getString("userheader");
        String description = data.getString("description");
        username = URLEncoder.encode(username, "UTF-8");
        password = URLEncoder.encode(password, "UTF-8");
        description = URLEncoder.encode(description, "UTF-8");
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
