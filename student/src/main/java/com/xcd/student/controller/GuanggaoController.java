package com.xcd.student.controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.xcd.student.bean.Guanggao;
import com.xcd.student.common.entity.Result;
import com.xcd.student.common.entity.StatusCode;
import com.xcd.student.service.GuanggaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "guanggao")
public class GuanggaoController {

    @Autowired
    GuanggaoService guanggaoService;

    //添加广告
    @RequestMapping(value = "/addGuanggao",method = RequestMethod.POST)
    public Result AddGuanggao(@RequestBody Guanggao guanggao){
        guanggaoService.AddGuanggao(guanggao);
        return new Result(true, StatusCode.OK,"添加成功");
    }

    //查找所有
    @RequestMapping(value = "/findAll")
    public Result findAll(@RequestParam(name = "content",required = false) String content){
        if(content != null){
            JsonParser jp = new JsonParser();
            JsonObject jo = jp.parse(content).getAsJsonObject();
            String content1 = jo.get("content").getAsString();
            if(content1.equals("")){
                List <Guanggao> guanggaos = guanggaoService.findAll();
                if(guanggaos.size()>0 && guanggaos.get(0) != null){
                    return new Result(true,StatusCode.OK,"查询成功",guanggaos);
                }else {
                    return new Result(true,StatusCode.ERROR,"未找到数据");
                }
            }else {
                List <Guanggao> guanggaos = guanggaoService.findByContent(content1);
                if(guanggaos.size()>0 && guanggaos.get(0) != null){
                    return new Result(true,StatusCode.OK,"查询成功",guanggaos);
                }else {
                    return new Result(true,StatusCode.ERROR,"未找到数据");
                }
            }
        }else {
            List <Guanggao> guanggaos = guanggaoService.findAll();
            if(guanggaos.size()>0 && guanggaos.get(0) != null){
                return new Result(true,StatusCode.OK,"查询成功",guanggaos);
            }else {
                return new Result(true,StatusCode.ERROR,"未找到数据");
            }
        }
    }

    //根据ID删除
    @RequestMapping(value = "delbyId/{id}")
    public Result delById(@PathVariable String id){
        guanggaoService.delById(id);
        return new Result(true,StatusCode.OK,"删除成功");
    }

    /**
     * 根据id查询
     */
    @RequestMapping("/findById/{id}")
    public Result findById(@PathVariable("id") String id){
        Guanggao guanggao = guanggaoService.findById(id);
        return new Result(true,StatusCode.OK,"查询成功",guanggao);
    }

    /**
     * 管理员修改信息
     */
    @RequestMapping("/manageModify")
    public Result manageModify(@RequestBody Guanggao guanggao){
        guanggaoService.manageModify(guanggao);
        return new Result(true,StatusCode.OK,"修改成功");
    }
}
