package com.xcd.student.controller;

import com.xcd.student.bean.Message_details;
import com.xcd.student.common.entity.Result;
import com.xcd.student.common.entity.StatusCode;
import com.xcd.student.service.Message_detailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author XieChengdong
 * @title
 * @2020/2/17 21:39
 */
@RestController
@RequestMapping("/message_details")
public class Message_detailsController {

    @Autowired
    Message_detailsService message_detailsService;

    /**
     * 回复留言
     */
    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public Result addMessage(@RequestBody Message_details message_details){
        message_detailsService.addMessage(message_details);
        return new Result(true, StatusCode.OK,"回复成功");
    }

    /**
     * 根据父级id查询
     */
    @RequestMapping(value = "/findByParentId/{parent_id}",method = RequestMethod.GET)
    public Result findByPrentId(@PathVariable String parent_id){
        List<Message_details> message_details = message_detailsService.findByParentId(parent_id);
        return new Result(true,StatusCode.OK,"查询成功",message_details);
    }
}
