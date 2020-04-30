package com.xcd.student.dao;

import com.xcd.student.bean.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface TeacherDao extends JpaRepository<Teacher,String>, JpaSpecificationExecutor<Teacher> {

    /**
     * 根据教师编号查询
     */
    public Teacher findByNumber(long number);

    /**
     * 根据手机号查询教师
     */
    public Teacher findByPhone(String phone);

    /**
     * 保存修改头像
     */
    @Modifying
    @Query("update Teacher t set t.headimage=?2,t.name=?3,t.department=?4 where t.id=?1")
    public void modifyInfo(String id,String headimage,String name,String department);

    /**
     * 修改手机
     */
    @Modifying
    @Query("update Teacher t set t.phone=?2 where t.id=?1")
    public void changePhone(String id,String phone);

    /**
     * 根据管理员输入模糊查询教师用户
     */
    @Query(value = "select new Teacher(id,name,number,department,phone) from Teacher t where t.name like %?1% or t.number like %?1%")
    List<Teacher> findBySearchContent(String content);

    /**
     * 根据Id进行查询
     */
    @Query(value = "select new Teacher(id,name,number,department,password,phone,headimage) from Teacher t where t.id=?1")
    public Teacher findByTeaId(String id);
}
