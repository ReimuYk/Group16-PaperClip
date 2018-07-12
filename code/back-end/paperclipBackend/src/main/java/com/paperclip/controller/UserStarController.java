package com.paperclip.controller;

import com.paperclip.service.UserStarService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/* get, modify user stars
 * include:
 *      get star info: paper, doc, note, user
 *      quit star:     paper, doc, note, user
 *      add star:      user
 * .js
 *      StarDocPage
 *      StarNotePage
 *      StarPaperPage
 *      StarUserPage
 *
 */

@CrossOrigin
@RestController
public class UserStarController {

    @Autowired
    UserStarService userStarService;

    /*****************
     * starDocPage
     *****************/
    // get user's stared doc according to username
    /*@RequestMapping(value = "/service/starDoc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarDoc(@RequestBody JSONObject data){
        return userStarService.getStarDoc(data);
    }

    // user choose to stop star a doc
    @RequestMapping(value = "/service/quitStar/doc",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarDoc(@RequestBody JSONObject data){
        return userStarService.quitStarDoc(data);
    }*/

    /*****************
     * StarNotePage
     ****************/
    // get user's stared note according to username
    @RequestMapping(value = "/service/starNote",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarNote(@RequestBody JSONObject data){
        return userStarService.getStarNote(data);
    }

    // user choose to stop star a note
    @RequestMapping(value = "/service/quitStar/note",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarNote(@RequestBody JSONObject data){
        return userStarService.quitStarNote(data);
    }

    /******************
     * starPaperPage
     */
    // get user's stared paper according to username
    @RequestMapping(value = "/service/starPaper",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarPaper(@RequestBody JSONObject data){
        return userStarService.getStarPaper(data);
    }

    // user want to quit star this paper
    @RequestMapping(value = "/service/quitStar/paper",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarPaper(@RequestBody JSONObject data){
        return userStarService.quitStarPaper(data);
    }

    /****************
     * StarUserPage
     ****************/

    // get user's stared user according to username
    @RequestMapping(value = "/service/starUser",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONArray getStarUser(@RequestBody JSONObject data){
        return userStarService.getStarUser(data);
    }


     // user want to quit star this user(clientname)
    @RequestMapping(value = "/service/quitStar/user",method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject quitStarUser(@RequestBody JSONObject data){
        return userStarService.quitStarUser(data);
    }

    @RequestMapping(value="/service/follow", method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject addStarUser(@RequestBody JSONObject data){
        return userStarService.starUser(data);
    }
}
