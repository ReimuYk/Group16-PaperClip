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
import com.paperclip.service.UserStarService;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
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


    // get all the notes that the user has stared
    public JSONArray getStarNote(JSONObject data) {
        String username = data.getString("username");

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
            note.accumulate("title", n.getTitle());
            note.accumulate("author", n.getUser().getUsername());
            note.accumulate("starno", starNoteRepo.findByNote(n).size());
            note.accumulate("date", n.getDate());
            note.accumulate("keywords", n.getKeyWords());
            note.accumulate("paperID", n.getPaper().getId());
            note.accumulate("paperTitle", n.getPaper().getTitle());
            notes.add(note);
        }
        return notes;
    }

    // user want to stop star this note(whose ID is noteID)
    public JSONObject quitStarNote(JSONObject data){
        JSONObject result = new JSONObject();
        try {
            String username = data.getString("username");
            Long noteID = data.getLong("noteID");

            User user = userRepo.findOne(username);
            Note note = noteRepo.findOne(noteID);
            starNoteRepo.deleteDistinctByNoteAndUser(note,user);
            result.accumulate("result", "success");
        }catch (JSONException e){
            result.accumulate("result", "fail");
        }

        return result;
    }

    // get all papers that this user has stared
    public JSONArray getStarPaper(JSONObject data) {
        String username = data.getString("username");

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
            paper.accumulate("noteno",noteRepo.findByPaper(p).size());
            paper.accumulate("postilno",getPostilNo(p));
            paper.accumulate("keywords",p.getKeyWords());
            paper.accumulate("tag",p.getTag());
            papers.add(paper);
        }
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
    public JSONObject quitStarPaper(JSONObject data){
        JSONObject result = new JSONObject();
        try {
            String username = data.getString("username");
            Long paperID = data.getLong("paperID");

            User user = userRepo.findOne(username);
            Paper paper = paperRepo.findOne(paperID);
            starPaperRepo.deleteDistinctByPaperAndUser(paper,user);
            result.accumulate("result", "success");
        }catch (JSONException e){
            result.accumulate("result", "fail");
        }

        return result;
    }

    //
    public JSONArray getStarUser(JSONObject data) {
        String username = data.getString("username");

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
            user.accumulate("username",uu.getUsername());
            user.accumulate("avatar",uu.getAvatar());
            users.add(user);
        }
        return users;
    }

    // hostname want to stop star clientname
    //(hostname used to star clientname
    public JSONObject quitStarUser(JSONObject data){
        JSONObject result = new JSONObject();
        String hostname = data.getString("hostname");
        String clientname = data.getString("clientname");

        User followee = userRepo.findOne(clientname);
        User follower = userRepo.findOne(hostname);
        Follow ff = followRepo.findDistinctByFolloweeAndAndFollower(followee,follower);

        if(ff != null) {
            followRepo.delete(ff);
            userRepo.updateFollowings(follower.getFollowing()-1,hostname);
            userRepo.updateFollowers(followee.getFollower()-1,clientname);
            result.accumulate("result", "success");
        }
        else{
            result.accumulate("result", "fail");
        }
        return result;
    }

    // hostname want to star clientname
    public JSONObject starUser(JSONObject data) {
        String hostname = data.getString("hostname");
        String clientname = data.getString("clientname");

        User followee = userRepo.findOne(clientname);
        User follower = userRepo.findOne(hostname);
        userRepo.updateFollowers(followee.getFollower()+1,clientname);
        userRepo.updateFollowings(follower.getFollowing()+1,hostname);

        Follow f = new Follow(followee,follower);
        followRepo.save(f);

        JSONObject result = new JSONObject();
        if(true){
            result.accumulate("result", "success");
        }else{
            result.accumulate("result", "fail");
        }
        return result;
    }
}