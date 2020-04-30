package com.xcd.student.service;

import com.xcd.student.bean.Student;
import com.xcd.student.common.util.MD5Utils;
import com.xcd.student.dao.StuDao;
import com.xcd.student.dao.Stu_BookDao;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import com.xcd.student.common.util.IdWorker;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class StuService {

    Logger log = LoggerFactory.getLogger(StuService.class);

    @Autowired
    private StuDao stuDao;

    @Autowired
    private IdWorker idWorker;

    @Autowired
    RedisTemplate redisTemplate;

    @Autowired
    RabbitTemplate rabbitTemplate;

    @Autowired
    Stu_BookDao stu_bookDao;

    /**
     * 学生用户登录
     * @param student
     */
    public Student stuLogin(Student student) {
        Student backStudent = stuDao.findByNumber(student.getNumber());
        if(backStudent != null && MD5Utils.getSaltverifyMD5(student.getPassword(),backStudent.getPassword())){
            return backStudent;
        }
        return null;
    }

    /**
     * 按手机号查询学生
     * @param number
     */
    public Student findByStuMobile(String number) {
        return stuDao.findByPhone(number);
    }

    /**
     * 按学号查询学生
     * @param number
     */
    public Student findByStuNumber(long number) {
        return stuDao.findByNumber(number);
    }

    /**
     * 学生用户注册
     */
    public void StuAdd(Student stu){
        String id = idWorker.nextId()+"";
        stu.setId(id.substring(0,16));
        stu.setPassword(MD5Utils.getSaltMD5(stu.getPassword()));
        stuDao.save(stu);
    }

    /**
     * 发送短信验证码
     * @param mobile
     */
    public void sendSms(String mobile) {
        //生成6位随机数
        String checkCode = RandomStringUtils.randomNumeric(6);
        //向缓存中放一份验证码的信息
        redisTemplate.opsForValue().set("checkCode_"+mobile,checkCode+"",5, TimeUnit.MINUTES);
        //向消息队列里面放一份
        Map<String,String> map = new HashMap<>();
        map.put("mobile",mobile);
        map.put("checkCode",checkCode);
        rabbitTemplate.convertAndSend("sms",map);
    }

    /**
     * 修改密码
     */
    public void MOdifyPassword(Student student){
        Student student1 = findByStuNumber(student.getNumber());
        student1.setPassword(MD5Utils.getSaltMD5(student.getPassword()));
        log.info("修改密码后的个人信息：{}",student1.toString());
        stuDao.save(student1);
    }

    /**
     * 修改信息
     * @param student
     */
    public void MOdifinfo(Student student) {
        stuDao.addHeadImage(student.getId(), student.getHeadimage(),student.getName(),student.getMajor());
    }

    /**
     * 修改手机
     * @param student
     */
    public boolean changePhone(Student student) {
        Student student2 =  stuDao.findByPhone(student.getPhone());
        if(student2 != null && student2.getId() != null && !student2.getId().equals(student.getId())){
            return false;
        }
        stuDao.changePhone(student.getId(),student.getPhone());
        return true;
    }

    /**
     * 判断就密码是否正确
     * @param student
     * @param oldPassword
     * @return
     */
    public boolean oldPassword(Student student, String oldPassword) {
        Student student1 = stuDao.findByNumber(student.getNumber());
        //判断旧密码是否正确
        if(MD5Utils.getSaltverifyMD5(oldPassword,student1.getPassword())){
            return true;
        }else {
            return false;
        }
    }

    /**
     * 查询所有学生
     */
    public List<Student> findAllStu(){
        return stuDao.findAll();
    }


    /**
     * 根据学生ID删除学生
     */
    public void delByStuId(String id){
        stuDao.deleteById(id);
        //删除学生课表里面的记录
        stu_bookDao.deleteByStu_id(id);
    }

    /**
     * 根据管理员输入内容模糊查询
     */
    public  List<Student> findBySearchContent(String content){
        return stuDao.findBySearchContent(content);
    }

    /**
     * 重置密码
     */
    public void RestePassword(String id){
        Student student = stuDao.findBystuId(id);
        student.setPassword(MD5Utils.getSaltMD5("000000"));
        stuDao.save(student);
    }

    /**
     * 根据学生id查找学生
     */
    public Student findByStuId(String id){
        return stuDao.findBystuId(id);
    }

    /**
     * 管理员修改学生信息
     */
    public int manageModifyStuInfo(Student student){
        //判断学号和手机号是否存在
        Student student1 = stuDao.findByNumber(student.getNumber());
        if(student1 != null && student1.getId() != null && !student1.getId().equals(student.getId())){
            return 1;
        }
        Student student2 =  stuDao.findByPhone(student.getPhone());
        if(student2 != null && student2.getId() != null && !student2.getId().equals(student.getId())){
            return 2;
        }
        Student student3 = stuDao.findBystuId(student.getId());
        student.setHeadimage(student3.getHeadimage());
        student.setPassword(student3.getPassword());
        stuDao.save(student);
        return 0;
    }
}
