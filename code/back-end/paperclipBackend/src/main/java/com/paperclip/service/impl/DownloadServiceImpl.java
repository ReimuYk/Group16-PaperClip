package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.BlockRepository;
import com.paperclip.dao.entityDao.PaperPageRepository;
import com.paperclip.dao.entityDao.PaperRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.dao.relationshipDao.BlockPostilRepository;
import com.paperclip.dao.relationshipDao.UserPostilRepository;
import com.paperclip.model.Entity.*;
import com.paperclip.model.Relationship.BlockPostil;
import com.paperclip.model.Relationship.UserPostil;
import com.paperclip.service.DownloadService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;

@Service
public class DownloadServiceImpl implements DownloadService{
    @Autowired
    UserRepository userRepo;
    @Autowired
    PaperRepository paperRepo;
    @Autowired
    PaperPageRepository paperPageRepo;
    @Autowired
    BlockRepository blockRepo;
    @Autowired
    BlockPostilRepository blockPRepo;
    @Autowired
    UserPostilRepository userPRepo;

    public JSONArray parsePoint(String ptrStr){
        ptrStr = ptrStr.substring(1,ptrStr.length()-1);
        String[] p = ptrStr.split(",");
        int x = Integer.parseInt(p[0]);
        int y;
        if (p[1].charAt(0)==' '){
            y = Integer.parseInt(p[1].substring(1));
        }else{
            y = Integer.parseInt(p[1]);
        }
        JSONArray res = new JSONArray();
        res.add(x);
        res.add(y);
        return res;
    }

    public String getExportPaperUri(JSONObject data) throws UnsupportedEncodingException {
        String option = data.getString("option");
        String username = data.getString("username");
        Long paperID = data.getLong("paperID");
        if (option.equals("paperOnly")){
            return String.format("./data/pdf/%d.pdf",paperID);
        }
        //create json_body to POST
        JSONObject json_body = new JSONObject();
        json_body.accumulate("paperID",paperID);
        json_body.accumulate("username",username);
        JSONArray json_pagelist = new JSONArray();
        User user = userRepo.findOne(username);
        Paper paper = paperRepo.findOne(paperID);
        //create "pagelist" array
        List<PaperPage> pagelist = paperPageRepo.findByPaper(paper);
        int order = 1;//postil order number
        for (PaperPage pp:pagelist){
            //each "page" has "filename" & "postils"
            JSONObject json_page = new JSONObject();
            json_page.accumulate("filename",pp.getContentUrl());
            JSONArray json_postils = new JSONArray();
            List<Block> blocklist = blockRepo.findByPaperPage(pp);
            List<Postil> postillist = blockPRepo.findDistinctPostilByBlock(blocklist);
            List<UserPostil> uplist = userPRepo.findByUserAndMarkAndPostilIn(user,1,postillist);
            for (UserPostil up:uplist){
                JSONObject json_pos = new JSONObject();
                json_pos.accumulate("order",order);
                order += 1;
                json_pos.accumulate("content", URLDecoder.decode(up.getPostil().getContent(),"UTF-8"));
                JSONArray json_blocks = new JSONArray();
                List<BlockPostil> pos_blk_list = blockPRepo.findByPostil(up.getPostil());
                for (BlockPostil bp:pos_blk_list){
                    JSONObject b = new JSONObject();
                    b.accumulate("start",parsePoint(bp.getBlock().getStartPoint()));
                    b.accumulate("end",parsePoint(bp.getBlock().getEndPoint()));
                    json_blocks.add(b);
                }
                json_pos.accumulate("blocks",json_blocks);
                json_postils.add(json_pos);
            }
            json_page.accumulate("postils",json_postils);
            json_pagelist.add(json_page);
        }
        json_body.accumulate("pagelist",json_pagelist);
        //ready to POST data
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8000/outputPDF/";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        String body = json_body.toString();
        HttpEntity<String> entity = new HttpEntity<>(body,headers);
        ResponseEntity<JSONObject> resp = restTemplate.exchange(url, HttpMethod.POST, entity, JSONObject.class);
        JSONObject resp_body = resp.getBody();
        System.out.println(resp_body);
        return String.format("../../py-pdf/paperclip/temp/%d-%s/%d-%s.pdf",paperID,username,paperID,username);
    }
}
