package com.paperclip.service.impl;

import com.paperclip.dao.entityDao.DocumentRepository;
import com.paperclip.dao.entityDao.NoteRepository;
import com.paperclip.dao.entityDao.UserRepository;
import com.paperclip.dao.relationshipDao.AssistRepository;
import com.paperclip.dao.relationshipDao.FollowRepository;
import com.paperclip.dao.relationshipDao.StarNoteRepository;
import com.paperclip.dao.relationshipDao.StarPaperRepository;
import com.paperclip.model.Entity.Document;
import com.paperclip.model.Entity.User;
import com.paperclip.model.Relationship.Follow;
import com.paperclip.service.ImgService;
import com.paperclip.service.ViewInfoService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.List;

@Service
public class ViewInfoServiceImpl implements ViewInfoService {

    @Autowired
    FollowRepository followRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    DocumentRepository docRepo;

    @Autowired
    ImgService imgService;

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

    // get this user's fans
    public JSONArray getUserFans(JSONObject data) throws UnsupportedEncodingException {
        //System.out.println("\n\n==============\nget json:"+data);

        JSONArray fans = new JSONArray();

        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User user = userRepo.findOne(username);
        List<Follow> followList = followRepo.findByFollowee(user);
        for (Follow follow : followList) {
            User follower = follow.getFollower();
            JSONObject fan = new JSONObject();
            fan.accumulate("username", URLDecoder.decode(follower.getUsername(), "UTF-8"));
            fan.accumulate("description", URLDecoder.decode(follower.getDescription(), "UTF-8"));
            InputStream in = null;
            byte[] inData = null;
            try{
                in = new FileInputStream(follower.getAvatar());
                inData = new byte[in.available()];
                in.read(inData);
                in.close();
                BASE64Encoder encoder = new BASE64Encoder();
                fan.accumulate("userheader", "data:image/jpeg;base64,"+encoder.encode(inData));
            }
            catch (IOException e)
            {
                e.printStackTrace();
               fan.accumulate("userheader", defaultAvatar);
            }
            fans.add(fan);
        }
        //System.out.println("\n\n===================\nreturn: "+fans);
        return fans;
    }

    public JSONObject getViewDocDetail(JSONObject data) throws UnsupportedEncodingException {
        JSONObject docJson = new JSONObject();
        Long docID = data.getLong("docID");
        Document doc = docRepo.findOne(docID);
        // the doc dose not exist
        if(doc==null)
            return docJson;
        docJson.accumulate("docID", doc.getId());
        docJson.accumulate("title", URLDecoder.decode(doc.getTitle(), "UTF-8"));
        docJson.accumulate("content", URLDecoder.decode(doc.getContent(), "UTF-8"));
        docJson.accumulate("author", URLDecoder.decode(doc.getUser().getUsername(), "UTF-8"));
        docJson.accumulate("userheader", doc.getUser().getAvatar());
        docJson.accumulate("userDescription", URLDecoder.decode(doc.getUser().getDescription(), "UTF-8"));
        return docJson;
    }

    public JSONArray getRecentFans(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n====getRecentFans==== \n get data: "+data);
        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User user = userRepo.findOne(username);
        List<Follow> followList = followRepo.findByFolloweeOrderByIdDesc(user);
        JSONArray fansArray = new JSONArray();
        int count=0;
        for(Follow follow: followList){
            count++;
            if(count == 4)
                break;
            JSONObject followJson = new JSONObject();
            followJson.accumulate("username", URLDecoder.decode(follow.getFollower().getUsername(), "UTF-8"));
            followJson.accumulate("avatar",imgService.getUserHeader(follow.getFollower()));
            followJson.accumulate("description",URLDecoder.decode(follow.getFollower().getDescription(),"UTF-8"));
            fansArray.add(followJson);
        }
        System.out.println("return: "+fansArray);
        return fansArray;
    }

    public JSONArray getHomeInfo(JSONObject data) {
        JSONArray homeinfo = new JSONArray();
        JSONObject followMement = new JSONObject();
        followMement.accumulate("title", "我关注的人的动态");

        JSONArray followContent = new JSONArray();
        JSONObject followM1 = new JSONObject();
        followM1.accumulate("title", "动态1");
        followM1.accumulate("description", "动态1 描述");

        followContent.add(followM1);
        followMement.accumulate("content", followContent);
        return homeinfo;
    }

    @Autowired
    private StarPaperRepository starPaperRepo;

    @Autowired
    private StarNoteRepository starNoteRepo;

    @Autowired
    private NoteRepository noteRepo;

    @Autowired
    private AssistRepository assistRepo;

    public JSONObject getHostInfo(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n====getHostInfo==== \n get data: "+data);

        String username = data.getString("username");
        username = URLEncoder.encode(username, "UTF-8");
        User host = userRepo.findOne(username);
        String avatar = imgService.getUserHeader(host);

        JSONObject user = new JSONObject();
        JSONArray userInfo = new JSONArray();
        JSONArray data1 = new JSONArray();
        JSONObject usernameJson = new JSONObject();
        JSONObject userDescriptionJson = new JSONObject();
        JSONObject userPasswordJson = new JSONObject();
        JSONObject userEmailJson = new JSONObject();

        usernameJson.accumulate("idx", 0);
        usernameJson.accumulate("title", "用户名");
        usernameJson.accumulate("info", URLDecoder.decode(host.getUsername(), "UTF-8"));
        userEmailJson.accumulate("idx", 1);
        userEmailJson.accumulate("title", "邮箱");
        userEmailJson.accumulate("info", URLDecoder.decode(host.getEmail(), "UTF-8"));
        userDescriptionJson.accumulate("idx", 2);
        userDescriptionJson.accumulate("title", "个性签名");
        userDescriptionJson.accumulate("info", URLDecoder.decode(host.getDescription(), "UTF-8"));
        userPasswordJson.accumulate("idx", 3);
        userPasswordJson.accumulate("title", "密码");
        userPasswordJson.accumulate("info", URLDecoder.decode(host.getPassword(), "UTF-8"));

        userInfo.add(usernameJson);
        userInfo.add(userEmailJson);
        userInfo.add(userDescriptionJson);
        userInfo.add(userPasswordJson);

        user.accumulate("userheader", avatar);
        user.accumulate("fansno", host.getFollower());
        user.accumulate("followno", host.getFollowing());

        user.accumulate("starPaperNo", starPaperRepo.findByUser(host).size());
        user.accumulate("starNoteNo", starNoteRepo.findByUser(host).size());
        user.accumulate("writeNoteNo", noteRepo.findByUser(host).size());
        user.accumulate("writeDocNo", docRepo.findByUser(host).size());
        user.accumulate("assistNo", assistRepo.findByUser(host).size());

        user.accumulate("userInfo", userInfo);
        user.accumulate("userDescription", URLDecoder.decode(host.getDescription(), "UTF-8"));
        System.out.println("return: "+user);
        return user;
    }

    public JSONObject getClientInfo(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n==== getClientInfo ====");
        System.out.println("get json: "+data);

        JSONObject user = new JSONObject();
        String clientname = data.getString("clientname");
            User client = userRepo.findOne(clientname);
            if(client == null){
                clientname = URLEncoder.encode(clientname, "UTF-8");
                client = userRepo.findOne(clientname);
            }
        String hostname = "";
        try{
            hostname = data.getString("hostname");
            hostname = URLEncoder.encode(hostname, "UTF-8");
        }catch (Exception e){
            String avatar = imgService.getUserHeader(client);
            user.accumulate("userheader", avatar);
            user.accumulate("username", URLDecoder.decode(clientname, "UTF-8"));
            user.accumulate("fansno", client.getFollower());
            user.accumulate("followno", client.getFollowing());
            user.accumulate("userDescription", URLDecoder.decode(client.getDescription(), "UTF-8"));
            user.accumulate("isStar", 0);
            System.out.println("return: "+user);
            return user;
        }

        User host = userRepo.findOne(hostname);

        Follow follow = followRepo.findDistinctByFolloweeAndFollower(client, host);

        if(follow == null){
            user.accumulate("isStar", 0);
        }else{
            user.accumulate("isStar", 1);
        }
        user.accumulate("userheader", imgService.getUserHeader(client));
        user.accumulate("username", URLDecoder.decode(clientname, "UTF-8"));
        user.accumulate("fansno", client.getFollower());
        user.accumulate("followno", client.getFollowing());
        user.accumulate("userDescription", URLDecoder.decode(client.getDescription(), "UTF-8"));
        System.out.println("get client info: "+user.toString());
        System.out.println("return: "+user);
        return user;
    }


    public JSONObject modifyUserInfo(JSONObject data) throws UnsupportedEncodingException {
        System.out.println("\n\n ====modifyUserIngo====\n get data: "+data);
        JSONObject result = new JSONObject();
        String username = data.getString("username");
        String password = data.getString("password");
        String description = data.getString("description");
        username = URLEncoder.encode(username, "UTF-8");
        password = URLEncoder.encode(password, "UTF-8");
        description = URLEncoder.encode(description, "UTF-8");
        User user = userRepo.findOne(username);
        if(user == null){
            result.accumulate("result", "fail");
        }else{
            user.setPassword(password);
            user.setDescription(description);
            userRepo.save(user);
            System.out.println("user description: "+user.getDescription());
            System.out.println("user password" + user.getPassword());
            result.accumulate("result", "success");
        }
        return result;
    }
}
