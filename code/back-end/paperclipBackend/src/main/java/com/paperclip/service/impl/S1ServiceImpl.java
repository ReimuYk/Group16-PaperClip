package com.paperclip.service.impl;


import com.paperclip.service.S1Service;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
/*
@Service
public class S1ServiceImpl implements S1Service {
    @Autowired
    protected ItemaRepository aRepo;

    @Autowired
    protected ItembRepository bRepo;

    public JSONArray getAllItema(){
        Iterable<Itema> itemlist = aRepo.findAll();
        JSONArray res = new JSONArray();
        for (Itema a:itemlist){
            JSONObject it = new JSONObject();
            it.accumulate("name",a.getName());
            it.accumulate("value",a.getValue());
            res.add(it);
        }
        return res;
    }

    public JSONArray getAllItemb(){
        Iterable<Itemb> itemlist = bRepo.findAll();
        JSONArray res = new JSONArray();
        for (Itemb b:itemlist){
            JSONObject it = new JSONObject();
            it.accumulate("name",b.getName());
            it.accumulate("value",b.getValue());
            res.add(it);
        }
        return res;
    }

    public String createdata(){
        Itema a1 = new Itema("A1","VA1");
        Itema a2 = new Itema("A2","VA2");
        Itema a3 = new Itema("A3","VA2");
        Itema a4 = new Itema("A3","VA3");
        Itemb b1 = new Itemb("B1","VB1",a2);
        Itemb b2 = new Itemb("B2","VB2",a1);
        aRepo.save(a1);
        aRepo.save(a2);
        aRepo.save(a3);
        aRepo.save(a4);
        bRepo.save(b1);
        bRepo.save(b2);
        return "Success";
    }

    public JSONArray findtest(){
        List<Itema> itemlist = aRepo.findByName("A3");
        JSONArray res = new JSONArray();
        for (Itema a:itemlist){
            JSONObject it = new JSONObject();
            it.accumulate("id",a.getId());
            it.accumulate("name",a.getName());
            it.accumulate("value",a.getValue());
            res.add(it);
        }
        return res;
    }
}
*/