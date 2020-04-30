package com.xcd.student.controller;

import com.xcd.student.bean.Admin;
import com.xcd.student.common.entity.Result;
import com.xcd.student.common.entity.StatusCode;
import com.xcd.student.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    //添加管理员
    @RequestMapping(value = "/addadmin",method = RequestMethod.POST)
    public Result AddAdmin(@RequestBody Admin admin){
        adminService.AddAdmin(admin);
        return new Result(true, StatusCode.OK,"添加成功");
    }

    //管理员登录
    @RequestMapping(value = "/adminlogin",method = RequestMethod.POST)
    public Result AdminLogin(@RequestBody Admin admin){
        if (adminService.AdminLogin(admin)){
            return new Result(true,StatusCode.OK,"登录成功");
        }else {
            return new Result(true,StatusCode.LOGINERROR,"用户名或密码错误");
        }
    }
}
