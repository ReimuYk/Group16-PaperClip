package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.model.Entity.Paper;
import com.paperclip.model.Entity.User;
import com.paperclip.service.ImgService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.validation.constraints.Null;
import java.io.*;
import java.net.URLEncoder;

@Service
public class ImgServiceImpl implements ImgService {

    private static final String dirPath = "./data/avatar";

    private static final String defaultAvatar = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEBAAEAAAD//gAmUGFpbnQgVG9vbCAtU0FJLSBKUEVHIEVuY29kZXIgdjEuMDAA/9sAhAAjGhoaGholJSUlMzMzMzNERERERERVVVVVVVVVampqampqamqCgoKCgoKCmpqampqatra2trbV1dXV9PT0////ATwsLCwsLD8/Pz9WVlZWVnFxcXFxcY+Pj4+Pj4+ysrKysrKystjY2NjY2Nj/////////////////////////////wAARCADYANgDAREAAhEBAxEB/8QBogAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoLEAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUW" +
            "EHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+foBAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKCxEAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmq" +
            "srO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDdoAjM8QlEZPzYz+FADXuoEAJb+LHQ9c4oCxNQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAEaTxyAlT0JH5UBYDNGFyTxQFgWaNpCgPzAZoAkoAKACgAoAKACgAoAz8Z1OVvSJR+ZNCGhrL5lxbL/tu35UAzSoEFABQAUAFABQAUAFABQAUAJQAZHrQBDc3H2dFO0tlgo/GgCOVr2OXeDH5Q6jnOPWgCWeXZHlercCgERqFijA9BQMhYjGWOFX5m+gpAS2MbCNpXGGkO4+w7CmIt0AFABQAUAFABQAUAUwB9rnP+zH/WgaEjx9pi/3H/mKAZJPfQW77WJzjJ" +
            "wM4HvQIsAhgCDwaAFoAKACgAoAQkCgCNrmBB80ij8aAKjavb79icn1PAoDYf8AapZF+RTn6HH64oC5GbQy8ys7/VgB+QoFcQafCpyo2n2osHMSG3mZGXzSwPZgKATJEnzGu9TyOaVxkSw20ZDxjJGBnOaBjnbc2Ow5oAaqi4kEY+6MM/8AQUCL9MAoAKACgAoAKACgAoApt8t44/vRL+hNA0RTSm3kVypIB7enegBLKTERZ+pG5s+/P8qQi3ZndbIQBjtj07UwJ6ACgAoAry3G1tiDc2PwH1oAiELSHMrbvbHFBNxxtbVhgxL+VA0xn2KFCCg2kUA2PDyDhh+VAhwagVxC1AXHK1A0xIfuY9Gb+dIpEU8SYLdKBkLu0a4+8WPFAE9hNFtMWCsg5bcOT70xF2gAoAKA" +
            "CgAoAKACgAoAp3fyXFu/YkofxFAIJeEJ9KQypMHdJ0HVyo/PigDVRQiKo6AYpiHUAFAEFzOYUG0ZdjhR70AQxx+UuCcseWPqaCGySgA3UBcXdmgdxp5oEM3bTzQAHOaBEiDigaHKuxce5NI0RXnkU5z91eTQBFbgyv5zenyD2/8Ar00TJkkqBsEnBB4PcGglOxagmMgKtww6/wCNBadyagAoAKACgAoAKACgCvexGa2dR94cr9RQBEW8+3Dr/EoNICuSPtcHo5/lQhmrTEFACE4FAFOD9/M07dBlU+nc0E3JCCzGgQh6UAMzQIkVdw60DWo00AIx3DBoEQLGVPyEgjsTxQC3LcAlKZl2g+goNEhLhzjC0hmbcLcSMq+SxXrjIwT70Ceo94JRA5d9zsMKq9BQKyRZwd" +
            "oDc8UyCGR3iG5eWTp7igadjRgmS4iWRehFBZJQAUAFABQAUAFABQBQtgYzNAf4HyP91uaBkVxGyruH8B3CkBoxuJEDDvTEPoAp30r4EUf3n7+g9aBMapEYVF6AYFBFyWNzuoGmNegREzbVJ9KAFjfegP40APyaAGmgBDyM9xQA+KTPBpMuLuNJeRgVAxzQUQvMEcqv7xz2Hb60CbHIjAl3O5z1P+FMhu5KelAiKUZXPpQBHpsvlXDwno3zL/WgqLujWoKCgAoAKACgAoAilnSJlU5LNnAHtQBDK6ZWdcEfdb6f/WoAdIuD9aQysjvasGAJTow9PemBfWRHTcrAj1oEZ4bzH8w9X6f7ooJkKTzQSSRNzQCHMaAIZv8AUv8A7poAisJA8H0NAFqgBpOKAEBwc0ARyOI2" +
            "DA9+aBoim+3XEhXcFT24pD5mWo4UjTaqgCmLcQmgQ7ORQAnUUAZ05aCRZB1jbP4d6Ai7SN5GV1DA8EZoNB1ABQAUAFABQBTusRXEM7A7VDKcds96AHNDa3XzFQ3uDQBKwO3GKBkDhee/HI9RQBA8C4UFDuY43Kcce9AmwYgzvjooAoIZCsu6V09MGgT2LEZoBDieKAIp2Agk/wB0/wAqAW5n6ZJ5LlGP3hkUk7mlSDgzTEgL7fbIoIHMQKYhtAENxGXTK9R+tAIZZz712H7y/wAqBsuhs0CGSjBoBiI2RQCH9RQBVuk5z60CZY0qXMJiJ5jOPw7UGid0aFAwoAKACgAoASgCJ7aCQ5K8+o4P6UANW0Rekkv/AH2aAK8wnt8F/njz97+JfrQMkD736ggLnj3oIkVVPz" +
            "zH/b/oKBPoUg4WZnz0wD9DSvqVyPluX0NMgdmgCteviAj+8QKT2KpK80VLeLzZ1A7AmoTsdFZJxJpvOQj+8vI/+tVJnO4tEzTi5tWZDh15/KmIijupIjsk+bjIPqKBNFyKWOUZU5pgRTW+1xKg+YfrQBYQgigB7jMefSgfQrj5WxQSSo1AxJ03IaAaKEMrW12jdm+U/wBKAi9DfByM0GgtABQAUAFABQAUAFACGgDOgjRHnCDA8zAoJluVpJDH5uOplx+eKQupnOoJbnvU3szqjG8F6FuzuCRsb7y1VzmnFxZdJAoJKF4+6VF9ATSkzbDrVsn0yPLO/wCFSXVeti/LCkq4IzRsQZslpPBJ5kfzD9apNEONhoUeWFcdM4H+yadxNDBbuil4mzt7Z5oJHw3txjpuH0/w" +
            "oCxMl4jE4GDTCzLaXEJU5YDigdiJip5U5oE0OU0CJl+YUDMy8iYZx16igFozV0+4WeBT7ZoLWxboGFABQAUAFABQAlABSAoQ8iQ/9NG/nQS9yle/u5M+ro364oArxwedEXjOSCcipe5tTqWViDncCOGFCbRcoxqI0ILlJQFPyt6VSaZzTpyiypcxtHLnqG4H+FJo0ozSNezhMMCqevekEndk9AgwKBjHiRxyAaQjOmD2k24D5TVJkSVhkEMcpcKSGByCKonoT/6Uh+ZFkH60AXLaVGODGVPuKCosSYLvYZGfSgTRAARQKzJ0NAEVzEW59qAa0K+nsYLlou33h9D1oKi9jboKCgAoAKACgAoASgBDSApQ/cf/AK6N/Oglle8RJAqtwT0NAr2Kmmkx3csbeh/Q0pFw6m" +
            "hcWUU/PQ+oqS1JozJ7OWLqNy+ooNFOMtyWxt2uC24nyxx9ad2ZzUL6GrHGI0Cgk49aCStczXJOy3XnuTRoBAlrqbnL3OPpRddgsSxqsbYa9LEdiRR8gLDwpPGVJyDQD1MpEks7xQ3Q8Z+tUiGrGn3pkE8RoKRm6pnz2UgEYBGRSNEZu+ReFdl+jGmOyFW6u16Sn8cGgXKiddUnQASKH9xRawnEHvoGlikAZSpOeOxoJ5dDRXXLJVAJfOPSgoDr1j6P+VAGhBMlxEsi5w3rQBJQAUAFACUAIaQGejbZpk/2s0EPcWaJZ4ypoAy7KYJdZkU5wRkUmrlRdjbDBhkHNIoXANAAqgdKAFxQAdKAM+8lmJEaxvz/AHSMmmgKSQXsrMu5YghwVFDsiZTsTpbX6fduM/Wlddhc" +
            "9+gifaLh5BMQ3l+lPaxe8S+oIUZ9Koye5JEckj2NAIq6l0ifHYqaDSDMdjyaChooC4Mu70FO4nIWO2km+4C38qQi9aaOZgGZk2n05NAGjHo1hGc7M/U0AXwAowKAFoAKACgBKACkBmXP7u//AN9BQTMlQ5oJRlWbhL0E9w38qHsXHcutLfvllVI1/wBrrU6FFiCZiP3hXPqvSgdiyOaBC4oAQigBkMIRncnLN39vSmBDc2rlzLFjd3HrRYiUbkDP5O0urZGdqnHU1NhxXQWyX92xI5Y5PvTZZOudoz2qlsZSVmIp2SCmIZfputnH905oKTsUYLCGVPmd8jrzQJTY86bEP+Wr/pQPmJY9PthyQW+poFckm2xxbVAGeBQOO4tnIYp9n8L/AKGhqxbNKgQtABQAUAFACU" +
            "AFAGbqgxLA3+8P5UClsMeTy4Xf0BoIW5TsEJmEh7ED8TSZUSXUPtUkqqm04zgf1/CkrMvYZDbt5av5oOR/dFJsj2jvsWYpZraQrjcByV9vVaLlq0loaUciSoGU5BpgKRQA113DGSPpQBAbNCxbc/P+1QAxLCONmO5iG9f8aT1Hcs7eKLCI2HSnEU1oQTEqAwqjMlBWaIj1GKATKFqxSUqe/wDOgC46FkOOtADI5NwBoAWZBIhXOPegE7MbZFkLFwM7sfpmi5pzXRp0AFAC0AFABQAUAJQBn6oMiH6n+VApbFG8bFuF/vP/ACoIW5I8ZtrFF6MXB/GkVewqOsv71MiVD83JP+QaWzLTUkOE1uxJIMbNnOF3BvwoauJwu7klqjuxbkIBgD1+tKySGlYtW+FllQdtp/Om" +
            "tEDJ6AEoAWgAoASgCKQcGlswauiGQb4zj61ZkUoJ/IuNp+43IoBBdqYZw46HmgOpdRsigCv/AKuZl7HkUCZLmgYkePNP0B/I0FQ2NCM5jX6UFDqAFoAKACgAoAKAKN+QWhX1J/lQTLYopH58rOR8kSlj9eooCK0LFz80tsv+3n8hQLoV4Ld7bdOT0Y8f7OallxRo+RA53bFOe9IdyRUCgADAFAD1UBie5pgOoASgAoAKACgBrDNDBFQOI5PLP4U09CJqzKc8X3l7ocj6GmSSJ/pUBjP305FA90OtXzGAeo4oEF4p8sOvVeaABHDoGHcUCGM22VG/u9fp3oKiaFk5eHnszD9aCyxQAtABQAUAFABQBjTyG6u2Cc/wD/2Y0EvV2Ls8YgsJFX+7j86CuhWkYfbY19FP9K" +
            "CLkd5NLE5VWAB56UrDcrIk0q53o0LfeTp/u0MpO6NKkMKACgAoAKACgBKACgDNvgJofNjP3D/KhPUUleIwS+fEso+8vDfSqMyHLQSgqenI9xQC0LRKhhKn3JOvsaBtaEpAZSPWgRQhYxM8Z/hOfwoEShh9oT0NA1uWtNYo0sB/gOR9DQWjQoGFABQAUAFAGfqd6II/LU/Ow/IetAm7DdLtmRfMYY4+Ue1AJFi+5gA9ZE/9CFA3sUC3/EyP+6R/KgzFvV+aJ+2cGgGVJkktZVnj7H/IoY4uxtW1xHcxB0PWpLJqBiMdqk4zQBXAvHGSyp7Yz/WgehOgcD5iD9BQIXNABQBBcFyoROrdT6Ci4JCiNUjCgcAYqRmR81ncso6HpVp3MpKzLJjjkQEfdPT2piGxMYJDG/3G" +
            "/nQNEzObdTvB2jvQBSvfkmSVejCgQK/zxn0NAluXQwiuYpex+Q/j0oLizUoKCgAoASgBknm7Tsxn3oAp2+mKshlnbzHJz7UAaFAFW+GY4/8Arqn86AexjXjvFflh25oIL4ZLmDg9eRQId5QePBoCxUjjltJi0bYz2PRv/r0rDUrGhDfwyEK3yN6Gixady1SGFACUAFAEE9wkOB1Y9BQCVxIdzIGbqaQ9iagRn6lbmSHco+ZeaFowkropWt0B15B+8P61Zk1YvFVkXaeePzFADlGU8pzkEYBoGZ0sEkcTIeinIpCYyM/KpoEy85DKFJ4daZS6GlZzGe3Vj97ofqKC0T0AFABQAUAFABQBXvRm3Y/3cN+RzQBk6pHtuEk7HigjuQwtNEcLyPSgW5ZS8PdTzQBYAMiZag" +
            "Cm+1uvIoBMEuJ7c/u24/unkUrFKTL0Op28mA58tvfp+dFik0y4DkZpDKF1qIUmOD5m7nsKdhNpGapnjmMm8vu+9mhoSmbcc0bxeYD8tTYq9yD7a0rfuImkH97oP1p2AUnUXHEUa/Vs0WQGVdWd1C5l8rC99pyKaJaH2lyPlBOBng+hpkNWZpMAoOR8vcelAbDJoi6buvY+4oHuZIyhZD2pCZpQjzUjHrkfof8ACmOOqJ9PkO9lP8XP4jg0FI0aBhQAUAFABQAUAIwDAg96AM65g823MTdR0P0oJasygu5cHGD3oJaLUSRSc7RQBNJlY2+hoAzbc74Afc0A1qK1AERUGgBAmBgFgPQE4oHzMeoAGAMCgVxxwATQBas7JpV3yn922CE9fc0jSKsjTCgDAFBQoFIB2MjF" +
            "AjJvNNPmGSHAz94UXsJxUiKG9a3YRTg4HAPcU0yWmi9kIN6cqfSmSVbu0Eg8yL/9dAbhYEgx57PQOG5Ow8m5kI/hYP8AgetBS0Zp0DCgAoAKACgAoAKAIZYt/Q4NANXM6aPOeMEdaDNkULmNvY0CLjfMh+lAzIsj+7dffNA5EjGgQ2gAoAcBQBLaw/arnafuJy3uewpMqCNnGKDQXpQIUUgFoAawzQCKtxbQ3C7ZFzS2HZMoxrNZTGMfOnWqTM5RsWY3VHAByj9PY0ydgWIRTfVgf1oGtyW5KreR8f6xGH5UFMvUDCgAoAKACgAoAKACgCrdxceYB06/SgTVzPlTByOhoIJ4G3R89qAMqEeXcMv+0RQMlcYNAhtABmgB60AaOlR7bXf3kYtSZoti7QMKAHCkAUANoA" +
            "awoBFO6jPEo/h6/ShBJXRHJHnK9CefrVGb0JA7SW+T95f6UDQzUJVFzZODwWP60DZq0DCgAoAKACgAoAKACgBDQBmsm1pIv7p4+hoIkiKI7JMetBJTvIyly2P4sEUDJWAkQOO4oAhIIoAAKAEkbYh55waBpXZvWqbLaJfRBSNCXFIAoAWgAoAQ0ANNAEZAJwe9IZXEashhJ+ZPumqWqM3o2hLVsgqwww4P1FMWzM/U2K+VH3Qtj6cYpFPY6KmMKACgAoAKACgAoAKACgCF7ZHkLknJAFAmrkZsYic7m/SgXIgm0+CYoWLZX0xQPlQ1NNgRdoZ8Zz2/woDlQh0y3P8AE/6f4UC5UH9mQD+J/wBP8KB8qHNptqY3QAru6kdf1oGtCyqBVAHalYBdoosFwwKLAGKLAGBR" +
            "YA2iiwCbBRYBPKX3o5UO5E1nG0ok3MCPTFNKxLV3cU2kZm8zJBxg+9ANJkVxptvclSxbIBHGO/4UBbQ//9k=";

    private static final String defaultImg = "data:image/jpeg;base64,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";
    @Autowired
    private UserRepository userRepo;

    //输入:username,imgStr-------------base64字符串转图片保存在服务器
    public JSONObject uploadAvatar(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("uploadAvatar");
        System.out.println("upload data:"+data);
        JSONObject result = new JSONObject();
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
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
            return defaultAvatar;
        }
    }

    public String getPdfImg(Paper paper){
        String path = "./data/pdf-jpg";
        Long id = paper.getId();
        String path1 = path + "\\" + id+  ".jpg";
        String path2 = path + "\\" + id+  "..jpg";
        InputStream in = null;
        byte[] data=null;
        try
        {
            in = new FileInputStream(path1);
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
        }
        try
        {
            in = new FileInputStream(path2);
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
            return defaultImg;
        }
    }

    public String getPaperAbstract(Paper paper) {
        String filePath = "./data/pdf-txt/"+ paper.getId()+".txt";
        String result = "";
        try {
            File file = new File(filePath);
            if(file.isFile() && file.exists()) {
                InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "utf-8");
                BufferedReader br = new BufferedReader(isr);
                String lineTxt = null;
                while ((lineTxt = br.readLine()) != null) {
                    result += lineTxt;
                }
                br.close();
            } else {
                System.out.println("文件不存在!");
            }
        } catch (Exception e) {
            System.out.println("文件读取错误!");
        }
        if (result.length() < 280){
            return result;
        }
        return result.substring(0,280)+"...";

    }
}
