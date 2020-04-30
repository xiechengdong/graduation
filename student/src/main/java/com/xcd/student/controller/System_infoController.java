package com.xcd.student.controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.xcd.student.bean.Book;
import com.xcd.student.bean.System_info;
import com.xcd.student.common.entity.Result;
import com.xcd.student.common.entity.StatusCode;
import com.xcd.student.service.System_infoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author XieChengdong
 * @title
 * @2020/3/1 19:03
 */
@CrossOrigin
@RestController
@RequestMapping("/systemInfo")
public class System_infoController {

    @Autowired
    System_infoService system_infoService;

    /**
     * 保存
     */
    @RequestMapping(value = "/save")
    public Result save(@RequestBody System_info system_info){
        system_infoService.saveInfo(system_info);
        return new Result(true, StatusCode.OK,"添加成功");
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/findall")
    public Result findAll(@RequestParam(name = "content",required = false) String content){
        //根据输入内容判断查询所有还是迷糊查询
        JsonParser jp = new JsonParser();
        if(content != null){
            JsonObject jo = jp.parse(content).getAsJsonObject();
            String content1 = jo.get("content").getAsString();
            if(content1.equals("")){
                List<System_info> system_infos = system_infoService.findall();
                if(system_infos.size()>0 && system_infos.get(0) != null) {
                    return new Result(true, StatusCode.OK, "查找成功", system_infos);
                }else {
                    return new Result(true,StatusCode.ERROR,"未找到数据");
                }
            }else {
                List<System_info> system_infos = system_infoService.findByContent(content1);
                if(system_infos.size()>0 && system_infos.get(0) != null) {
                    return new Result(true, StatusCode.OK, "查找成功", system_infos);
                }else {
                    return new Result(true,StatusCode.ERROR,"未找到数据");
                }
            }
        }else {
            List<System_info> system_infos = system_infoService.findall();
            if(system_infos.size()>0 && system_infos.get(0) != null) {
                return new Result(true, StatusCode.OK, "查找成功", system_infos);
            }else {
                return new Result(true,StatusCode.ERROR,"未找到数据");
            }
        }
    }

    /**
     * 根据Id删除
     */
    @RequestMapping("/deleteById/{id}")
    public Result deleteById(@PathVariable("id") String id){
        system_infoService.deleteById(id);
        return new Result(true,StatusCode.OK,"删除成功");
    }

    /**
     * 根据id查询
     */
    @RequestMapping("/findBySysId/{id}")
    public Result findBySysId(@PathVariable("id") String id){
        System_info system_info = system_infoService.findBySysId(id);
        return new Result(true,StatusCode.OK,"查询成功",system_info);
    }

    /**
     * 管理员修改
     */
    @RequestMapping("/manageModify")
    public Result manageModify(@RequestBody System_info system_info){
        system_infoService.manageModify(system_info);
        return new Result(true,StatusCode.OK,"修改成功");
    }
}
