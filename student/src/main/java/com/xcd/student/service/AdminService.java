package com.xcd.student.service;

import com.xcd.student.bean.Admin;
import com.xcd.student.common.util.IdWorker;
import com.xcd.student.common.util.MD5Utils;
import com.xcd.student.dao.AdminDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    AdminDao adminDao;

    @Autowired
    IdWorker idWorker;

    //添加管理员
    public void AddAdmin(Admin admin){
        String id = idWorker.nextId()+"";
        admin.setId(id.substring(0,16));
        admin.setPassword(MD5Utils.getSaltMD5(admin.getPassword()));
        adminDao.save(admin);
    }

    /**
     * 管理员登录
     */
    public boolean AdminLogin(Admin admin){
        Admin admin1 = adminDao.findByName(admin.getName());
        if(admin1 != null && MD5Utils.getSaltverifyMD5(admin.getPassword(),admin1.getPassword())){
            return true;
        }
        return false;
    }
}
