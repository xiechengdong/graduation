package com.xcd.student.service;

import com.xcd.student.bean.System_info;
import com.xcd.student.common.util.IdWorker;
import com.xcd.student.dao.System_infoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author XieChengdong
 * @title
 * @2020/3/1 18:57
 */
@Service
public class System_infoService {

    @Autowired
    IdWorker idWorker;

    @Autowired
    System_infoDao system_infoDao;

    /**
     * 添加
     * @param system_info
     */
    public void saveInfo(System_info system_info){
        String id = idWorker.nextId()+"";
        system_info.setId(id.substring(0,16));
        system_infoDao.save(system_info);
    }

    /**
     * 查询所有
     */
    public List<System_info> findall(){
        return system_infoDao.findAll();
    }

    /**
     * 根据id删除
     */
    public void deleteById(String id){
        system_infoDao.deleteById(id);
    }

    /**
     * 根据id查询
     */
    public System_info findBySysId(String id){
        return system_infoDao.findBySysId(id);
    }

    /**
     * 管理员修改信息
     */
    public void manageModify(System_info system_info){
        system_infoDao.save(system_info);
    }

    /**
     * 模糊查询
     */
    public List<System_info> findByContent(String content){
        return system_infoDao.findByContent(content);
    }
}
