package com.paperclip.controller;

//import com.paperclip.service.S1Service;
import ch.qos.logback.core.util.FileUtil;
import com.paperclip.service.DownloadService;
import com.paperclip.service.UserDocService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.Response;
import java.io.*;

@CrossOrigin
@RestController
public class helloController {
    @Autowired
    protected UserDocService userDocService;
    @Autowired
    protected DownloadService downloadService;

    protected static Logger logger=LoggerFactory.getLogger(helloController.class);

    //@Autowired
    //private S1Service s1Service;


    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public
    @ResponseBody
    String hello(){
        return "this is a hello world page";
    }

    @RequestMapping(value = "/download",method = RequestMethod.GET)
    public ResponseEntity<byte[]> download() throws IOException{
        File file=new File("./data/pdf/1.pdf");
        HttpHeaders headers = new HttpHeaders();
        String filename = new String("test.pdf".getBytes("UTF-8"),"iso-8859-1");
        headers.setContentDispositionFormData("attachment",filename);
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),headers,HttpStatus.CREATED);
    }

    @RequestMapping(value = "/daochuPDF",method = RequestMethod.POST)
    public
    @ResponseBody
    String getPaperDetail(@RequestBody JSONObject data) throws UnsupportedEncodingException {
        return downloadService.getExportPaperUri(data);
    }


    /*@RequestMapping(value = "/findtest",method = RequestMethod.GET)
    public
    @ResponseBody
    JSONArray findtest(){
        return s1Service.findtest();
    }*/
}
