package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.*;
import com.paperclip.dao.relationshipDao.BlockPostilRepository;
import com.paperclip.dao.relationshipDao.UserPostilRepository;
import com.paperclip.model.Entity.*;
import com.paperclip.model.Relationship.UserPostil;
import com.paperclip.service.PaperService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;



@Service
public class PaperServiceImpl implements PaperService {
    @Autowired
    PaperRepository paperRepo;

    @Autowired
    PaperPageRepository paperPageRepo;

    @Autowired
    BlockRepository blockRepo;

    @Autowired
    BlockPostilRepository blockPRepo;

    @Autowired
    PostilRepository postilRepo;

    @Autowired
    PostilCommentRepository postilCommRepo;

    @Autowired
    UserPostilRepository userPRepo;

    @Autowired
    UserRepository userRepo;


    public String GetImageStrFromPath(String imgPath) {
        InputStream in = null;
        byte[] data = null;
        // 读取图片字节数组
        try {
            in = new FileInputStream(imgPath);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        // 返回Base64编码过的字节数组字符串
        return encoder.encode(data);
    }

    public JSONArray parsePoint(String ptrStr){
        ptrStr = ptrStr.substring(1,ptrStr.length()-1);
        String[] p = ptrStr.split(",");
        int x = Integer.parseInt(p[0]);
        int y = Integer.parseInt(p[1].substring(1));
        JSONArray res = new JSONArray();
        res.add(x);
        res.add(y);
        return res;
    }

    public JSONObject getPaperDetail(JSONObject data) {
        Long paperID = data.getLong("paperID");
        String username = data.getString("username");
        int pagination = data.getInt("pagination");

        Paper p = paperRepo.findOne(paperID);
        List<PaperPage> pagelist = paperPageRepo.findByPaper(p);
        PaperPage page = null;
        for (PaperPage pp:pagelist){
            if (pp.getPagination()==pagination){
                page = pp;
                break;
            }
        }
        List<Block> blist = blockRepo.findByPaperPage(page);
        String pageurl = page.getContentUrl();
        pageurl = "C:\\Users\\Administrator\\Desktop\\pdfSplit\\page-0.jpeg";
        String b64str = this.GetImageStrFromPath(pageurl);
        b64str = "data:image/jpg;base64,"+b64str;

        JSONObject paper = new JSONObject();
        JSONArray blocklist = new JSONArray();
        for (Block b:blist){
            JSONObject blk = new JSONObject();
            blk.accumulate("id",b.getId());
            String st = b.getStartPoint();
            blk.accumulate("start",parsePoint(st));
            String ed = b.getEndPoint();
            blk.accumulate("end",parsePoint(ed));
            blocklist.add(blk);
        }
        JSONArray marked = new JSONArray();
        int pagenum = p.getPageNum();

        paper.accumulate("b64str",b64str);
        paper.accumulate("blocklist", blocklist);
        paper.accumulate("marked", marked);
        paper.accumulate("pagenum",pagenum);
        return paper;
    }

    public JSONArray getBlockPostils(JSONObject data){
        Long paperID = data.getLong("paperID");
        String username = data.getString("username");
        int pagination = data.getInt("pagination");
        JSONArray blist = data.getJSONArray("selectid");
        List<Block> blocklist = new ArrayList<Block>();
        for (int i=0;i<blist.size();i++){
            Long bid = blist.getLong(i);
            Block b = blockRepo.findOne(bid);
            blocklist.add(b);
        }
        List<Postil> poslist = blockPRepo.findDistinctPostilByBlock(blocklist);
        JSONArray res = new JSONArray();
        for (Postil p:poslist){
            JSONObject obj = new JSONObject();
            //postils:{user:xxx,content:xxx,agree:xxx,disagree:xxx}
            JSONObject postils = new JSONObject();
            User user = p.getUser();
            postils.accumulate("posID",p.getId());
            postils.accumulate("user",user.getUsername());
            postils.accumulate("content",p.getContent());
            postils.accumulate("agree",p.getAgreement());
            postils.accumulate("disagree",p.getDisagreement());
            obj.accumulate("postils",postils);
            //comments:[{user:xxx,content:xx},{...}]
            List<PostilComment> pclist = postilCommRepo.findByPostil(p);
            JSONArray comments = new JSONArray();
            for (PostilComment pc:pclist){
                JSONObject commitem = new JSONObject();
                User u = pc.getUser();
                commitem.accumulate("user",u.getUsername());
                commitem.accumulate("content",pc.getContent());
                comments.add(commitem);
            }
            obj.accumulate("comments",comments);
            //marked: 0/1
            //agreement:{agreed:T/F,disagreed:T/F}
            List<UserPostil> uplist = userPRepo.findByUserAndPostil(user,p);
            JSONObject agreement = new JSONObject();
            if (uplist.isEmpty()){
                obj.accumulate("marked",0);
                agreement.accumulate("agreed",false);
                agreement.accumulate("disagreed",false);
            }else{
                UserPostil up = uplist.get(0);
                int marked = up.getMark();
                obj.accumulate("marked",marked);
                int agr = up.getAgreement();
                if (agr==-1){
                    agreement.accumulate("agreed",false);
                    agreement.accumulate("disagreed",true);
                }else if (agr==0){
                    agreement.accumulate("agreed",false);
                    agreement.accumulate("disagreed",false);
                }else if (agr==1){
                    agreement.accumulate("agreed",true);
                    agreement.accumulate("disagreed",false);
                }
            }
            obj.accumulate("agreement",agreement);
            res.add(obj);
        }
        return res;
    }

    public JSONObject statPostil(JSONObject data){
        Long posID = data.getLong("posID");
        String username = data.getString("username");
        int marked = data.getInt("marked");
        JSONObject agreement = data.getJSONObject("agreement");

        Postil pos = postilRepo.findOne(posID);
        User user = userRepo.findOne(username);
        List<UserPostil> uplist = userPRepo.findByUserAndPostil(user,pos);
        if (uplist.isEmpty()){
            UserPostil up = new UserPostil(user,pos);
            up.setMark(marked);
            if (agreement.getBoolean("agreed")){
                up.setAgreement(1);
            }else if (agreement.getBoolean("disagreement")){
                up.setAgreement(-1);
            }
            userPRepo.save(up);
        }else{
            UserPostil up = uplist.get(0);
            up.setMark(marked);
            if (agreement.getBoolean("agreed")){
                up.setAgreement(1);
            }else if (agreement.getBoolean("disagreement")){
                up.setAgreement(-1);
            }
            userPRepo.save(up);
        }
        JSONObject res = new JSONObject();
        res.accumulate("stat","success");
        return res;
    }
}
