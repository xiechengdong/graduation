package com.xcd.student.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.xcd.student.bean.Student;
import com.xcd.student.bean.Teacher;
import com.xcd.student.service.StuService;
import com.xcd.student.common.entity.Result;
import com.xcd.student.common.entity.StatusCode;
import com.xcd.student.service.TeacherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.regex.Pattern;

@RestController
@CrossOrigin
@RequestMapping("/stu")
public class UserController {

    Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private StuService stuService;

    @Autowired
    TeacherService teacherService;

    @Autowired
    RedisTemplate redisTemplate;

    //10位数或11位数正则表达式
    private String regex1 = "\\d{10}";
    private String regex2 = "\\d{11}";
    private String regex3 = "\\d{5}";

    /**
     * 用户注册
     * @param student
     * @return
     */
    @RequestMapping(value = "/register/{code}",method = RequestMethod.POST)
    public Result StuRegister(@PathVariable String code,@RequestBody Student student){
        log.info("接受到的对象数据：{}",student.toString());
        //得到缓存中的验证码
        String checkCodeRedis = (String) redisTemplate.opsForValue().get("checkCode_"+student.getPhone());
        if(checkCodeRedis==null){
            return new Result(false,StatusCode.ERROR,"验证码过期，请重新获取手机验证码");
        }
        if(!checkCodeRedis.equals(code)){
            return new Result(false,StatusCode.ERROR,"验证码错误");
        }
        if(Pattern.matches(regex1,String.valueOf(student.getNumber()))){
            //学生用户注册
            log.info("学生注册：{}",student.toString());
            stuService.StuAdd(student);
        }else {
            //教师用户注册
            Teacher teacher = new Teacher(student.getId(),student.getName(),student.getNumber(),student.getMajor(),student.getPassword(),student.getPhone());
            log.info("教师注册信息：{}",teacher.toString());
            teacherService.addTeacher(teacher);
        }
        return new Result(true, StatusCode.OK,"注册成功");
    }

    /**
     * 发送验证码
     */
    @RequestMapping(value = "/sendsms/{mobile}",method = RequestMethod.POST)
    public Result sendSms(@PathVariable String mobile){
        stuService.sendSms(mobile);
        return new Result(true, StatusCode.OK,"发送成功");
    }

    /**
     * 按学号或者电话查询
     */
    @RequestMapping(value = "/findByStuNumber/{number}",method = RequestMethod.GET)
    public Result findStuByNumber(@PathVariable long number){
        log.info("查询的学号或者电话：{}",number);
        Student student = null;
        Teacher teacher = null;
        if(Pattern.matches(regex1,String.valueOf(number))){
            student = stuService.findByStuNumber(number);
        }else if(Pattern.matches(regex3,number+"")){
            teacher = teacherService.findByNumber(number);
        }else {
            student = stuService.findByStuMobile(number+"");
            teacher = teacherService.findByPhone(number+"");
        }
        if(student == null && teacher == null){
            return new Result(true,StatusCode.OK,"查询成功",null);
        }else {
            return new Result(true,StatusCode.OK,"查询成功","not null");
        }
    }

    /**
     * 学生用户登录
     */
    @RequestMapping(value = "/stulogin",method = RequestMethod.POST)
    public Result StuLogin(@RequestBody Student student){
        Student backStudent = stuService.stuLogin(student);
        if(backStudent != null){
            return new Result(true,StatusCode.OK,"登录成功",backStudent);
        }
        return new Result(true,StatusCode.LOGINERROR,"学号或密码错误");
    }

    /**
     * 教师用户登录
     */
    @RequestMapping(value = "/teacherlogin",method = RequestMethod.POST)
    public Result TeacherLogin(@RequestBody Teacher teacher){
        Teacher backTeacher = teacherService.teacherLogin(teacher);
        if(backTeacher != null){
            return new Result(true,StatusCode.OK,"登录成功",backTeacher);
        }
        return new Result(true,StatusCode.LOGINERROR,"编号或密码错误");
    }

    /**
     * 忘记密码功能根据手机号查找学生或者教师
     */
    @RequestMapping(value = "/finduserbyphone/{phone}/{code}",method = RequestMethod.GET)
    public Result findUserByphone(@PathVariable String phone,@PathVariable String code){
        log.info("接收到的手机号和密码：{},{}",phone,code);
        //得到缓存中的验证码
        String checkCodeRedis = (String) redisTemplate.opsForValue().get("checkCode_"+phone);
        if(checkCodeRedis==null){
            return new Result(false,StatusCode.ERROR,"验证码过期，请重新获取手机验证码");
        }
        if(!checkCodeRedis.equals(code)){
            log.info("从redis中获取的验证码：{}",checkCodeRedis);
            return new Result(false,StatusCode.ERROR,"验证码错误");
        }
        Student student = stuService.findByStuMobile(phone);
        Teacher teacher = teacherService.findByPhone(phone);
        if(student != null){
            return new Result(true,StatusCode.OK,"查找成功1",student);
        }else if (teacher != null){
            return new Result(true,StatusCode.OK,"查找成功2",teacher);
        }else {
            return new Result(true,StatusCode.OK,"该手机号未注册");
        }
    }

    /**
     * 重置密码接口
     */
    @RequestMapping(value = "/modifypassword",method = RequestMethod.POST)
    public Result modifyPassword(@RequestBody Student student){
        //判断是教师还是学生
        if(Pattern.matches(regex1,student.getNumber()+"")){
            //为学生
            stuService.MOdifyPassword(student);
            return new Result(true,StatusCode.OK,"重置成功",null);
        }else {
            //为教师
            Teacher teacher = new Teacher(student.getId(),student.getName(),student.getNumber(),student.getMajor(),student.getPassword(),student.getPhone());
            teacherService.MOdifyPassword(teacher);
            return new Result(true,StatusCode.OK,"重置成功",null);
        }
    }

    /**
     * 修改信息
     */
    @RequestMapping(value = "/modifyinfo",method = RequestMethod.POST)
    public Result saveHaedImage(@RequestBody Student student){

        System.out.println(student);

        //判断是教师还是学生
        if(Pattern.matches(regex1,student.getNumber()+"")){
            //为学生
            stuService.MOdifinfo(student);
            return new Result(true,StatusCode.OK,"修改成功",null);
        }else {
            //为教师
            Teacher teacher = new Teacher(student.getId(),student.getName(),student.getNumber(),student.getMajor(),student.getPassword(),student.getPhone(),student.getHeadimage());
            teacherService.MOdifinfo(teacher);
            return new Result(true,StatusCode.OK,"修改成功",null);
        }
    }

    /**
     * 修改手机
     */
    @RequestMapping(value = "/changePhone/{code}",method = RequestMethod.POST)
    public Result changePhone(@PathVariable String code,@RequestBody Student student){
        //得到缓存中的验证码
        String checkCodeRedis = (String) redisTemplate.opsForValue().get("checkCode_"+student.getPhone());
        if(checkCodeRedis==null){
            return new Result(false,StatusCode.ERROR,"验证码过期，请重新获取手机验证码");
        }
        if(!checkCodeRedis.equals(code)){
            log.info("从redis中获取的验证码：{}",checkCodeRedis);
            return new Result(false,StatusCode.ERROR,"验证码错误");
        }
        //判断是教师还是学生
        if(Pattern.matches(regex1,student.getNumber()+"")){
            //为学生
            boolean flag =  stuService.changePhone(student);
            if(flag == true){
                return new Result(true,StatusCode.OK,"修改成功",null);
            }else {
                return new Result(false,StatusCode.ERROR,"该手机号已被占用");
            }
        }else {
            //为教师
            Teacher teacher = new Teacher(student.getId(),student.getName(),student.getNumber(),student.getMajor(),student.getPassword(),student.getPhone(),student.getHeadimage());
            boolean flag = teacherService.changePhone(teacher);
            if(flag == true){
                return new Result(true,StatusCode.OK,"修改成功",null);
            }else {
                return new Result(false,StatusCode.ERROR,"该手机号已被占用");
            }
        }
    }

    /**
     * 修改密码
     */
    @RequestMapping(value = "/modifypassword/{oldPassword}",method = RequestMethod.POST)
    public Result ModifyPassword(@PathVariable String oldPassword,@RequestBody Student student){
        //判断是教师还是学生
        if(Pattern.matches(regex1,student.getNumber()+"")){
            //为学生,判断旧密码
            if(stuService.oldPassword(student,oldPassword)){
                //修改密码
                stuService.MOdifyPassword(student);
                return new Result(true,StatusCode.OK,"修改成功,请重新登录",null);
            }else {
                return new Result(true,StatusCode.LOGINERROR,"旧密码错误",null);
            }

        }else {
            //为教师
            Teacher teacher = new Teacher(student.getId(),student.getName(),student.getNumber(),student.getMajor(),student.getPassword(),student.getPhone(),student.getHeadimage());
            //判断
            if(teacherService.oldPassword(teacher,oldPassword)){
                teacherService.MOdifyPassword(teacher);
                return new Result(true,StatusCode.OK,"修改成功,请重新登录",null);
            }else {
                return new Result(true,StatusCode.LOGINERROR,"旧密码错误",null);
            }
        }
    }

    /**
     * 查询所有学生
     */
    @RequestMapping(value = "/findAllStu")
    public Result findAllStu(HttpServletRequest request, @RequestParam(name = "content",required = false) String content){
        //根据输入内容判断查询所有还是迷糊查询
        JsonParser jp = new JsonParser();
        JsonObject jo = jp.parse(content).getAsJsonObject();
        String content1 = jo.get("content").getAsString();
        if(content1.equals("")){
            List<Student> students = stuService.findAllStu();
            if(students.size()>0 && students.get(0) != null){
                return new Result(true,StatusCode.OK,"查询成功",students);
            }else {
                return new Result(true,StatusCode.ERROR,"未找到学生用户");
            }
        }else {
            List<Student> students = stuService.findBySearchContent(content1);
            if(students.size()>0 && students.get(0) != null){
                return new Result(true,StatusCode.OK,"查询成功",students);
            }else {
                return new Result(true,StatusCode.ERROR,"未找到学生用户");
            }
        }
    }

    /**
     * 根据学生id删除学生
     */
    @RequestMapping(value = "/delByStuId/{Stu_id}")
    public Result delStuByStuId(@PathVariable("Stu_id") String Stu_id){
        stuService.delByStuId(Stu_id);
        return new Result(true,StatusCode.OK,"注销成功");
    }

    /**
     * 模糊查询
     */
    @RequestMapping(value = "/searchstu/{searchContent}",method = RequestMethod.GET)
    public Result SearchStu(@PathVariable String searchContent){
        List<Student> books = stuService.findBySearchContent(searchContent);
        if(books.size() > 0 && books.get(0) != null){
            return new Result(true,StatusCode.OK,"查询成功",books);
        }else {
            return new Result(true,StatusCode.ERROR,"未找到相关学生");
        }
    }

    /**
     * 查询所有教师
     */
    @RequestMapping(value = "/findAllTea")
    public Result findAllTea(@RequestParam(name = "content",required = false) String content){
        //根据输入内容判断查询所有还是迷糊查询
        JsonParser jp = new JsonParser();
        JsonObject jo = jp.parse(content).getAsJsonObject();
        String content1 = jo.get("content").getAsString();
        if(content1.equals("")){
            List<Teacher> teachers = teacherService.findAllTeach();
            if (teachers.size()>0 && teachers.get(0) != null) {
                return new Result(true,StatusCode.OK,"查询成功",teachers);
            }else {
                return new Result(true,StatusCode.ERROR,"未找到教师用户");
            }
        }else {
            List<Teacher> teachers = teacherService.findBySearchContent(content1);
            if (teachers.size()>0 && teachers.get(0) != null) {
                return new Result(true,StatusCode.OK,"查询成功",teachers);
            }else {
                return new Result(true,StatusCode.ERROR,"未找到教师用户");
            }
        }
    }

    /**
     * 根据管理员输入模糊查询教师用户
     */
    @RequestMapping(value = "/searchtea/{searchContent}",method = RequestMethod.GET)
    public Result SearchTea(@PathVariable String searchContent){
        List<Teacher> teachers = teacherService.findBySearchContent(searchContent);
        if(teachers.size() > 0 && teachers.get(0) != null){
            return new Result(true,StatusCode.OK,"查询成功",teachers);
        }else {
            return new Result(true,StatusCode.ERROR,"未找到相关教师");
        }
    }

    /**
     * 根据id删除教师用户
     */
    @RequestMapping(value = "/delByteaId/{id}")
    public Result delByTeaId(@PathVariable String id){
        teacherService.delById(id);
        return new Result(true,StatusCode.OK,"注销成功");
    }

    /**
     * 根据id重置学生密码
     */
    @RequestMapping("/RestePassword/{id}")
    public Result RestePassword(@PathVariable("id") String id){
        stuService.RestePassword(id);
        return new Result(true,StatusCode.OK,"重置成功");
    }

    /**
     * 根据学生Id查找学生
     */
    @RequestMapping("/findByStuId/{id}")
    public Result findByStuId(@PathVariable("id") String id){
        Student student = stuService.findByStuId(id);
        if(student !=null && student.getId() != null){
            return new Result(true,StatusCode.OK,"查找成功",student);
        }else {
            return new Result(true,StatusCode.ERROR,"未找到学生信息");
        }
    }

    /**
     * 管理员修改学生信息
     */
    @RequestMapping("/manageModifyStuInfo")
    public Result manageModifyStuInfo(@RequestBody Student student){
        int number =  stuService.manageModifyStuInfo(student);
        if(number == 0){
            return new Result(true,StatusCode.OK,"修改成功");
        }else if(number == 1){
            return new Result(false,StatusCode.ERROR,"该学号已经被占用");
        }else{
            return new Result(false,StatusCode.ERROR,"该手机号已经被占用");
        }
    }

    /**
     * 根据教师Id重置教师密码
     */
    @RequestMapping("/ResteTeacherPassword/{id}")
    public Result ResteTeacherPassword(@PathVariable("id") String id){
        teacherService.RestePassword(id);
        return new Result(true,StatusCode.OK,"重置成功");
    }

    /**
     * 根据教师Id查询教师信息
     */
    @RequestMapping("/findByTeacherId/{id}")
    public Result findByTeacherId(@PathVariable("id") String id){
        Teacher teacher = teacherService.findByTeacherId(id);
        return new Result(true,StatusCode.OK,"查询成功",teacher);
    }

    /**
     * 管理员修改教师用户
     */
    @RequestMapping("/manageModifyTeacherInfo")
    public  Result manageModifyTeacherInfo(@RequestBody Teacher teacher){
       int number = teacherService.managerModifyInfo(teacher);
        if(number == 0){
            return new Result(true,StatusCode.OK,"修改成功");
        }else if(number == 1){
            return new Result(false,StatusCode.ERROR,"该编号已经被占用");
        }else{
            return new Result(false,StatusCode.ERROR,"该手机号已经被占用");
        }
    }
}
