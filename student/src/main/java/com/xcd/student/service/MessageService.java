package com.xcd.student.service;

import com.xcd.student.bean.Message;
import com.xcd.student.common.util.IdWorker;
import com.xcd.student.dao.MessageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    IdWorker idWorker;

    @Autowired
    MessageDao messageDao;

    /**
    *添加
     */
    public void addMessage(Message message){
        message.setId(idWorker.nextId()+"");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        message.setCreate_time(df.format(new Date()));
        messageDao.save(message);
    }


    /**
     * 根据书籍id查找
     */
    public List<Message> findByBookId(String Book_id){
        return messageDao.findByBook_id(Book_id);
    }
}
