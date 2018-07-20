package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.model.Entity.User;
import com.paperclip.service.ImgService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import java.io.*;
import java.net.URLEncoder;

@Service
public class ImgServiceImpl implements ImgService {

    private static final String dirPath = "./data/avatar";


    @Autowired
    private UserRepository userRepo;

    //输入:username,imgStr-------------base64字符串转图片保存在服务器
    public JSONObject uploadAvatar(JSONObject data) {
        System.out.println("upload data:"+data);
        JSONObject result = new JSONObject();
        String username = data.getString("username");
        username = URLEncoder.encode(username);
        String imgStr = data.getString("imgStr");
        int pos = imgStr.indexOf(",");
        imgStr = imgStr.substring(pos+1);

        User user = userRepo.findOne(username);
        //对字节数组字符串进行Base64解码并生成图片
        if (imgStr == null || user == null) {//图像数据为空
            result.accumulate("result", "fail");
            return result;
        }
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            //Base64解码
            byte[] b = decoder.decodeBuffer(imgStr);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {//调整异常数据
                    b[i] += 256;
                }
            }
            //生成jpeg图片
            String filename = "\\" + username + ".jpeg";
            String imgFilePath = dirPath + filename;//新生成的图片
            OutputStream out = new FileOutputStream(imgFilePath);
            out.write(b);
            out.flush();
            out.close();

            user.setAvatar(imgFilePath);
            userRepo.save(user);
            result.accumulate("result", "success");
            return result;
        } catch (Exception e) {
            result.accumulate("result", "fail");
            return result;
        }

    }

    //输入:username----------------------图片转化成base64字符串
    public JSONObject getAvatar(JSONObject data1) {//将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        JSONObject avatar = new JSONObject();
        String username = data1.getString("username");

        User user = userRepo.findOne(username);
        if(user == null){
            return avatar;
        }
        String imgFile =  user.getAvatar();//待处理的图片
        InputStream in = null;
        byte[] data = null;
        //读取图片字节数组
        try
        {
            in = new FileInputStream(imgFile);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        //对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        avatar.accumulate("imgStr","data:image/jpeg;base64,"+encoder.encode(data));//返回Base64编码过的字节数组字符串
        return avatar;
    }

    public String getUserHeader(User user){
        String imgFile = user.getAvatar();
        InputStream in = null;
        byte[] data=null;
        try
        {
            in = new FileInputStream(imgFile);
            data = new byte[in.available()];
            in.read(data);
            in.close();
            //对字节数组Base64编码
            BASE64Encoder encoder = new BASE64Encoder();
            return "data:image/jpeg;base64,"+encoder.encode(data);
        }
        catch (IOException e)
        {
            e.printStackTrace();
            return "";
        }
    }
}
