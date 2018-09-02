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
            return "";
        }
    }
}
