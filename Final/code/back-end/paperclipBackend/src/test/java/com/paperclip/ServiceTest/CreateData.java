package com.paperclip.ServiceTest;

import com.paperclip.dao.entityDao.*;
import com.paperclip.dao.relationshipDao.*;
import com.paperclip.model.Entity.*;
import com.paperclip.model.Relationship.*;
import com.paperclip.service.SearchService;
import com.paperclip.service.UserService;
import com.paperclip.service.UserStarService;
import com.sun.org.apache.bcel.internal.generic.BREAKPOINT;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
@Rollback(false)
public class CreateData {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PaperRepository paperRepo;

    @Autowired
    private BlockRepository blockRepo;

    @Autowired
    private PostilRepository postilRepo;

    @Autowired
    private BlockPostilRepository blockPRepo;

    @Autowired
    private PostilCommentRepository postilCommRepo;

    @Autowired
    private NoteRepository noteRepo;

    @Autowired
    private NoteCommentRepository noteCommRepo;

    @Autowired
    private StarPaperRepository starPaperRepo;

    @Autowired
    private StarNoteRepository starNoteRepo;

    @Autowired
    private UserStarService service;

    @Autowired
    private UserNoteRepository userNRepo;

    @Autowired
    private UserPostilRepository userPRepo;


    @Before
    public void before() {
        System.out.println("create begin!");
    }

    @After
    public void after() {
        System.out.println("create finished!");
    }

    @Test
    public void createUserData(){
        List<User> uu = new ArrayList<>();
        for(int i = 0;i<100;i++){
            String username = "user"+i;
            String password = "pwd"+i;
            String email = "email"+i;
            User user = new User(username,password,email);
            uu.add(user);
        }
        userRepo.save(uu);
    }

    @Test
    public void createPostilData(){
        Iterable<Block> blocks = blockRepo.findAll();
        Iterable<User> uu = userRepo.findAll();
        Iterator<User> users = uu.iterator();
        List<Postil> postils = new ArrayList<>();
        List<BlockPostil> bps = new ArrayList<>();
        Integer count = 0;
        for(Block block: blocks){
            if(users.hasNext()){
                User user = users.next();
                Postil postil = new Postil(user,"postils for block "+block.getContent());
                postil.setAgreement((count+5)%12+1);
                postil.setDisagreement((count*2)%12+2);
                postils.add(postil);
                BlockPostil bp = new BlockPostil(block,postil);
                bps.add(bp);
            }
            else{
                users = uu.iterator();
            }
            count += 1;
        }
        postilRepo.save(postils);
        blockPRepo.save(bps);
    }

    @Test
    public void createPostilCommentData(){
        Iterable<Postil> postils = postilRepo.findAll();
        Iterable<User> uu = userRepo.findAll();
        Iterator<User> users = uu.iterator();
        List<PostilComment> pcs = new ArrayList<>();
        for(Postil postil:postils){
            if(users.hasNext()){
                User user = users.next();
                PostilComment pc = new PostilComment(postil,user,"我觉得"+postil.getContent()+"是对的");
                pcs.add(pc);
            }
            else{
                users = uu.iterator();
            }
        }
        postilCommRepo.save(pcs);
    }

    @Test
    public void createNoteAndNoteCommentData(){
        Paper paper = paperRepo.findOne(new Long(1));
        Iterable<User> uu = userRepo.findAll();
        Iterator<User> users = uu.iterator();
        List<Note> notes = new ArrayList<>();
        List<NoteComment> ncs = new ArrayList<>();
        for(int i = 0;i<6;i++){
            Note note = new Note(paper,users.next(),"title"+i,"这是笔记内容"+i,paper.getKeyWords());
            notes.add(note);
            for(int j=0;j<3;j++) {
                NoteComment nc = new NoteComment(note, users.next(), "哇说的好好" + (i + j) * 2);
                ncs.add(nc);
            }
        }
        noteRepo.save(notes);
        noteCommRepo.save(ncs);
    }

    @Test
    public void createStarData(){
        Paper paper = paperRepo.findOne(new Long(1));
        Iterable<User> users = userRepo.findAll();
        Iterable<Note> nn = noteRepo.findAll();
        Iterator<Note> notes = nn.iterator();
        List<StarNote> sns = new ArrayList<>();
        List<StarPaper> sps = new ArrayList<>();
        for(User user: users){
            if(notes.hasNext()){
                StarNote sn = new StarNote(user,notes.next());
                sns.add(sn);
            }
            else{
                StarPaper sp = new StarPaper(user,paper);
                sps.add(sp);
                notes = nn.iterator();
            }
        }
        starNoteRepo.save(sns);
        starPaperRepo.save(sps);
    }

    @Test
    public void createFollowData() throws UnsupportedEncodingException {
        Iterable<User> uu = userRepo.findAll();
        Iterator<User> users = uu.iterator();
        for(User user1: uu){
            for(int i=0;i<3;i++){
                if(!users.hasNext()){
                    users = uu.iterator();
                }
                JSONObject data = new JSONObject();
                data.accumulate("hostname",user1.getUsername());
                data.accumulate("clientname",users.next().getUsername());
                service.starUser(data);
            }
        }
    }

    @Test
    public void createUserNoteData(){
        Iterable<User> uu = userRepo.findAll();
        Iterable<Note> nn = noteRepo.findAll();
        Iterator<Note> notes = nn.iterator();
        List<UserNote> uns = new ArrayList<>();
        int count = 0;
        for(User user: uu){
            if(!notes.hasNext()){
                notes = nn.iterator();
            }
            UserNote un = new UserNote(user,notes.next());
            un.setAgreement(count%3-1);
            uns.add(un);
            count += 1;
        }
        userNRepo.save(uns);
    }

    @Test
    public void createUserPostilData(){

    }

}
