package com.xcd.student.controller;

import com.xcd.student.bean.Message;
import com.xcd.student.common.entity.Result;
import com.xcd.student.common.entity.StatusCode;
import com.xcd.student.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/message")
public class MessageController {

    @Autowired
    MessageService messageService;

    /**
    *添加
     */
    @RequestMapping(value = "/addmessage",method = RequestMethod.POST)
    public Result addMessage(@RequestBody Message message){
        messageService.addMessage(message);
        return new Result(true, StatusCode.OK,"留言成功");
    }

    /**
     * 根据学生id和书籍id查询
     */
    @RequestMapping(value = "/findbybookid/{book_id}",method = RequestMethod.GET)
    public Result findByBookId(@PathVariable String book_id){
        List<Message> messages = messageService.findByBookId(book_id);
        return new Result(true,StatusCode.OK,"查询成功",messages);
    }
}
