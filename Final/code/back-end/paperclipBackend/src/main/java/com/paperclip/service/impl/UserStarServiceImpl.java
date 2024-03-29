package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.*;
import com.paperclip.dao.relationshipDao.BlockPostilRepository;
import com.paperclip.dao.relationshipDao.FollowRepository;
import com.paperclip.dao.relationshipDao.StarNoteRepository;
import com.paperclip.dao.relationshipDao.StarPaperRepository;
import com.paperclip.model.Entity.*;
import com.paperclip.model.Relationship.BlockPostil;
import com.paperclip.model.Relationship.Follow;
import com.paperclip.model.Relationship.StarNote;
import com.paperclip.model.Relationship.StarPaper;
import com.paperclip.service.ImgService;
import com.paperclip.service.UserStarService;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaBuilder;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/*
* 罗宇辰
* 2018/7/11 第一次编辑 getStarNote quitStarNote getStarPaper quitStarPaper getPostilNo
* 2018/7/12 第二次编辑 getStarPaper*/

@Service
public class UserStarServiceImpl implements UserStarService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PaperRepository paperRepo;

    @Autowired
    private StarPaperRepository starPaperRepo;

    @Autowired
    private NoteRepository noteRepo;

    @Autowired
    private StarNoteRepository starNoteRepo;
    
    @Autowired
    private PaperPageRepository paperPageRepo;

    @Autowired
    private BlockRepository blockRepo;

    @Autowired
    private BlockPostilRepository blockPRepo;

    @Autowired
    private FollowRepository followRepo;

    @Autowired
    private ImgService imgService;


    // get all the notes that the user has stared
    public JSONArray getStarNote(JSONObject data) throws UnsupportedEncodingException {
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User user = userRepo.findOne(username);
        List<StarNote> l1 = starNoteRepo.findByUser(user);
        Iterator<StarNote> it1 = l1.iterator();
        List<Note> l2 = new ArrayList<>();
        while(it1.hasNext()){
            l2.add(it1.next().getNote());
        }
        Iterator<Note> it2 = l2.iterator();

        JSONArray notes = new JSONArray();
        while(it2.hasNext()) {
            JSONObject note = new JSONObject();
            Note n = it2.next();
            note.accumulate("ID", n.getId());
            note.accumulate("title", URLDecoder.decode(n.getTitle(), "UTF-8"));
            note.accumulate("author", URLDecoder.decode(n.getUser().getUsername(), "UTF-8"));
            note.accumulate("starno", starNoteRepo.findByNote(n).size());
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            note.accumulate("date", sdf.format(n.getDate()));
            note.accumulate("keywords", URLDecoder.decode(n.getKeyWords(), "UTF-8"));
            note.accumulate("paperID", n.getPaper().getId());
            note.accumulate("paperTitle", URLDecoder.decode(n.getPaper().getTitle(), "UTF-8"));
            notes.add(note);
        }
        return notes;
    }

    // user want to stop star this note(whose ID is noteID)
    @Modifying
    @Transactional
    public JSONObject quitStarNote(JSONObject data){
        JSONObject result = new JSONObject();
        try {
            String username = data.getString("username");
            Long noteID = data.getLong("noteID");
            username = URLEncoder.encode(username, "UTF-8");
            User user = userRepo.findOne(username);
            Note note = noteRepo.findOne(noteID);
            starNoteRepo.deleteDistinctByNoteAndUser(note,user);
            note.setStar(note.getStar()-1);
            noteRepo.save(note);

            result.accumulate("result", "success");
        }catch (JSONException e){
            result.accumulate("result", "fail");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return result;
    }

    // get all papers that this user has stared
    public JSONArray getStarPaper(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n ====getStarPaper==== \n get json:"+data);
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User user = userRepo.findOne(username);
        List<StarPaper> l1 = starPaperRepo.findByUser(user);
        Iterator<StarPaper> it1 = l1.iterator();
        List<Paper> l2 = new ArrayList<>();
        while(it1.hasNext()){
            l2.add(it1.next().getPaper());
        }
        Iterator<Paper> it2 = l2.iterator();
        JSONArray papers = new JSONArray();

        while(it2.hasNext()) {
            JSONObject paper = new JSONObject();
            Paper p = it2.next();
            paper.accumulate("ID",p.getId());
            paper.accumulate("title", URLDecoder.decode(p.getTitle(), "UTF-8"));
            paper.accumulate("noteno",noteRepo.findByPaper(p).size());
            paper.accumulate("postilno",getPostilNo(p));
            paper.accumulate("keywords", URLDecoder.decode(p.getKeyWords(), "UTF-8"));
            paper.accumulate("tags", URLDecoder.decode(p.getTag(), "UTF-8"));
            papers.add(paper);
        }
        System.out.println("return: "+papers);
        return papers;
    }

    /* 计算与一篇论文有关的批注数量 */
    private Integer getPostilNo(Paper paper){
        Integer num = 0;
        List<PaperPage> l1 = paperPageRepo.findByPaper(paper);
        Iterator<PaperPage> it1 = l1.iterator();
        while(it1.hasNext()){
            PaperPage pp = it1.next();
            List<Block> l2 = blockRepo.findByPaperPage(pp);
            num = num + blockPRepo.findDistinctPostilByBlock(l2).size();
        }
        return num;

    }

    // user want to stop star this paper
    @Modifying
    @Transactional
    public JSONObject quitStarPaper(JSONObject data){
        JSONObject result = new JSONObject();
        try {
            String username = data.getString("username");
            Long paperID = data.getLong("paperID");
            username = URLEncoder.encode(username, "UTF-8");
            User user = userRepo.findOne(username);
            Paper paper = paperRepo.findOne(paperID);
            starPaperRepo.deleteDistinctByPaperAndUser(paper,user);
            if(paper == null){
                System.out.println("find null: paper");
                return null;
            }
            System.out.println("paper: "+paper.toString());
            paper.setStar(paper.getStar()-1);
            paperRepo.save(paper);
            result.accumulate("result", "success");
        }catch (JSONException e){
            result.accumulate("result", "fail");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return result;
    }

    //
    public JSONArray getStarUser(JSONObject data) throws UnsupportedEncodingException {
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User u = userRepo.findOne(username);
        List<Follow> l1 = followRepo.findByFollower(u);
        Iterator<Follow> it1 = l1.iterator();
        List<User> l2 = new ArrayList<>();
        while(it1.hasNext()){
            l2.add(it1.next().getFollowee());
        }
        Iterator<User> it2 = l2.iterator();

        JSONArray users = new JSONArray();
        while(it2.hasNext()) {
            User uu = it2.next();
            JSONObject user = new JSONObject();
            user.accumulate("username", URLDecoder.decode(uu.getUsername(), "UTF-8"));
            user.accumulate("avatar",imgService.getUserHeader(uu));
            users.add(user);
        }
        return users;
    }

    public JSONArray getRecentFans(JSONObject data) throws UnsupportedEncodingException {
        JSONArray followArray = new JSONArray();
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User user = userRepo.findOne(username);
        List<Follow> followList = followRepo.findByFolloweeOrderByIdDesc(user);
        int count=0;
        for(Follow follow : followList){
            count++;
            if(count==4)
                break;
            JSONObject followJson = new JSONObject();
            followJson.accumulate("follower", URLDecoder.decode(follow.getFollower().getUsername(), "UTF-8"));
            followArray.add(followJson);
        }
        return followArray;
    }

    // hostname want to stop star clientname
    //(hostname used to star clientname
    public JSONObject quitStarUser(JSONObject data) throws UnsupportedEncodingException {
        JSONObject result = new JSONObject();
        String hostname = data.getString("hostname");
        String clientname = data.getString("clientname");
        hostname = URLEncoder.encode(hostname, "UTF-8");
        clientname = URLEncoder.encode(clientname, "UTF-8");
        User followee = userRepo.findOne(clientname);
        User follower = userRepo.findOne(hostname);
        Follow ff = followRepo.findDistinctByFolloweeAndFollower(followee,follower);

        if(ff != null) {
            followRepo.delete(ff);
//            userRepo.updateFollowings(follower.getFollowing()-1,hostname);
//            userRepo.updateFollowers(followee.getFollower()-1,clientname);
            follower.setFollowing(follower.getFollowing() - 1);
            followee.setFollower(followee.getFollower() - 1);
            userRepo.save(followee);
            userRepo.save(follower);
            result.accumulate("result", "success");
            result.accumulate("fansno", followee.getFollower());
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    // hostname want to star clientname
    public JSONObject starUser(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("data " +data);
        String hostname = data.getString("hostname");
        String clientname = data.getString("clientname");
        hostname = URLEncoder.encode(hostname, "UTF-8");
        clientname = URLEncoder.encode(clientname, "UTF-8");
        System.out.println("before find user");
        User followee = userRepo.findOne(clientname);
        User follower = userRepo.findOne(hostname);

        System.out.println("update user");
        Follow follow = followRepo.findDistinctByFolloweeAndFollower(followee, follower);
        JSONObject result = new JSONObject();
        if(follow != null){
            result.accumulate("result", "fail");
            return result;
        }
        followee.setFollower(followee.getFollower() + 1);
        follower.setFollowing(follower.getFollowing() + 1);
        userRepo.save(followee);
        userRepo.save(follower);

        System.out.println("add follow info");
        Follow f = new Follow(followee,follower);
        followRepo.save(f);

        System.out.println("return");

        result.accumulate("fansno", followee.getFollower());

        result.accumulate("result", "success");

        return result;
    }
}
