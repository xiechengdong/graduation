package com.xcd.student.service;

import com.xcd.student.bean.Message_details;
import com.xcd.student.common.util.IdWorker;
import com.xcd.student.dao.Message_detailsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author XieChengdong
 * @title
 * @2020/2/17 21:23
 */
@Service
public class Message_detailsService {

    @Autowired
    IdWorker idWorker;

    @Autowired
    Message_detailsDao message_detailsDao;

    /**
     * 保存回复
     */
    public void addMessage(Message_details message_details){
        message_details.setId(idWorker.nextId()+"");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        message_details.setCreate_time(df.format(new Date()));
        message_detailsDao.save(message_details);
    }

    /**
     * 根据父级id查找
     */
    public List<Message_details> findByParentId(String Parent_id){
        return message_detailsDao.findByParent_id(Parent_id);
    }
}
