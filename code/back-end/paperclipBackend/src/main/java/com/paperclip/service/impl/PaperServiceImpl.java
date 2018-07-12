package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.BlockRepository;
import com.paperclip.dao.entityDao.PaperPageRepository;
import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.model.Entity.Block;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.PaperPage;
import com.paperclip.service.PaperService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;



@Service
public class PaperServiceImpl implements PaperService {
    @Autowired
    PaperRepository paperRepo;

    @Autowired
    PaperPageRepository paperPageRepo;

    @Autowired
    BlockRepository blockRepo;


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
}
