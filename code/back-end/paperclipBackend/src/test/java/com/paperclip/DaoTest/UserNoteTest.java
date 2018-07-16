package com.paperclip.DaoTest;

import com.paperclip.dao.entityDao.NoteRepository;
import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.model.Entity.Note;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@SpringBootTest
@Rollback(false)
public class UserNoteTest {
    @Autowired
    NoteRepository noteRepo;
    @Autowired
    PaperRepository paperRepo;
    @Autowired
    UserRepository userRepo;

    @Test
    public void newNote(){
        Long paperID = new Long(1);
        Paper paper = paperRepo.findOne(paperID);
        User user = userRepo.findOne("7");
        Note note = new Note(paper, user, "titleeee", "contenttttt", "keywordsssssss");
        noteRepo.save(note);
    }
}
