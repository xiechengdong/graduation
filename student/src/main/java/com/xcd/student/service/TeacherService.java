package com.xcd.student.service;

import com.xcd.student.bean.Student;
import com.xcd.student.bean.Teacher;
import com.xcd.student.common.util.IdWorker;
import com.xcd.student.common.util.MD5Utils;
import com.xcd.student.dao.BookDao;
import com.xcd.student.dao.TeacherDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    Logger log = LoggerFactory.getLogger(TeacherService.class);

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    BookDao bookDao;

    @Autowired
    private IdWorker idWorker;

    /**
     * 教师注册
     */
    public void addTeacher(Teacher teacher){
        String id = idWorker.nextId()+"";
        teacher.setId(id.substring(0,16));
        teacher.setPassword(MD5Utils.getSaltMD5(teacher.getPassword()));
        teacherDao.save(teacher);
    }

    /**
     * 按编号查询教师
     */
    public Teacher findByNumber(long number){
        return teacherDao.findByNumber(number);
    }

    /**
     * 按手机号查询教师
     */
    public Teacher findByPhone(String phone){
        return teacherDao.findByPhone(phone);
    }

    /**
     * 教师登录
     * @param teacher
     * @return
     */
    public Teacher teacherLogin(Teacher teacher) {
        Teacher teacher1 = teacherDao.findByNumber(teacher.getNumber());
        if(teacher1 != null && MD5Utils.getSaltverifyMD5(teacher.getPassword(),teacher1.getPassword())){
            return teacher1;
        }
        return null;
    }

    /**
     * 修改密码
     */
    public void MOdifyPassword(Teacher teacher){
        Teacher teacher1 = findByNumber(teacher.getNumber());
        teacher1.setPassword(MD5Utils.getSaltMD5(teacher.getPassword()));
        log.info("修改密码后的个人信息：{}",teacher1.toString());
        teacherDao.save(teacher1);
    }

    /**
     * 修改信息
     * @param teacher
     */
    public void MOdifinfo(Teacher teacher) {
        teacherDao.modifyInfo(teacher.getId(),teacher.getHeadimage(),teacher.getName(),teacher.getDepartment());
    }

    /**
     * 修改手机
     * @param teacher
     */
    public boolean changePhone(Teacher teacher) {
        Teacher teacher1 =  teacherDao.findByPhone(teacher.getPhone());
        if(teacher1 != null && teacher1.getId() != null && !teacher1.getId().equals(teacher.getId())){
            return false;
        }
        teacherDao.changePhone(teacher.getId(),teacher.getPhone());
        return true;
    }

    /**
     * 判断旧密码是否正确
     */
    public boolean oldPassword(Teacher teacher, String oldpassword){
         Teacher teacher1 = teacherDao.findByNumber(teacher.getNumber());
         //判断旧密码是否正确
        if(MD5Utils.getSaltverifyMD5(oldpassword,teacher1.getPassword())){
            return true;
        }else {
            return false;
        }
    }

    /**
     * 查询所有教师
     */
    public List<Teacher> findAllTeach(){
        return teacherDao.findAll();
    }

    /**
     * 根据管理员输入模糊查询教师用户
     */
    public List<Teacher> findBySearchContent(String content){
        return teacherDao.findBySearchContent(content);
    }

    /**
     * 根据id删除教师用户
     */
    public void delById(String id){
        teacherDao.deleteById(id);
        //删除教师对应的课程
        bookDao.deleteByTeacher_id(id);
    }

    /**
     * 根据Id重置密码
     */
    public void RestePassword(String id){
        Teacher teacher = teacherDao.findByTeaId(id);
        teacher.setPassword(MD5Utils.getSaltMD5("000000"));
        teacherDao.save(teacher);
    }

    /**
     * 根据教师id查询教师
     */
    public Teacher findByTeacherId(String id){
        return teacherDao.findByTeaId(id);
    }

    /**
     * 管理员修改教师用户
     */
    public int managerModifyInfo(Teacher teacher){
        //判断编号和手机号是否已经存在
        Teacher teacher1 = this.findByNumber(teacher.getNumber());
        if(teacher1 != null && teacher1.getId() != null && !teacher1.getId().equals(teacher.getId())){
            return 1;
        }
        Teacher teacher2 = this.findByPhone(teacher.getPhone());
        if(teacher2 != null && teacher2.getId() != null && !teacher2.getId().equals(teacher.getId())){
            return 2;
        }
        Teacher teacher3 = teacherDao.findByTeaId(teacher.getId());
        teacher.setHeadimage(teacher3.getHeadimage());
        teacher.setPassword(teacher3.getPassword());
        teacherDao.save(teacher);
        return 0;
    }
}
