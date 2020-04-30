package com.xcd.student.service;

import com.xcd.student.bean.Guanggao;
import com.xcd.student.common.util.IdWorker;
import com.xcd.student.dao.GuanggaoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuanggaoService {

    @Autowired
    IdWorker idWorker;

    @Autowired
    GuanggaoDao guanggaoDao;

    //添加广告
    public void AddGuanggao(Guanggao guanggao){
        String id = idWorker.nextId()+"";
        guanggao.setId(id.substring(0,16));
        guanggaoDao.save(guanggao);
    }

    //查找所有
    public List<Guanggao> findAll(){
        return guanggaoDao.findAll();
    }

    //根据ID删除
    public void delById(String Id){
        guanggaoDao.deleteById(Id);
    }

    /**
     * 根据输入内容模糊查询
     */
    public List<Guanggao> findByContent(String content){
        return guanggaoDao.findByIsContent(content);
    }

    /**
     * 根据id查询
     */
    public Guanggao findById(String id){
        return guanggaoDao.findByGuanggaoId(id);
    }

    /**
     * 管理员修改信息
     */
    public void manageModify(Guanggao guanggao){
        Guanggao guanggao1 = this.findById(guanggao.getId());
        guanggao1.setName(guanggao.getName());
        guanggao1.setStart(guanggao.getStart());
        guanggao1.setOver(guanggao.getOver());
        guanggaoDao.save(guanggao1);
    }
}
