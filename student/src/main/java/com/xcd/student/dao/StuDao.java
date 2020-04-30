package com.xcd.student.dao;

import com.xcd.student.bean.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface StuDao extends JpaRepository<Student,String>, JpaSpecificationExecutor<Student> {

    /**
     * 根据学生学号查询
     */
    public Student findByNumber(long number);

    /**
     * 根据学生手机号查询
     */
    public Student findByPhone(String phone);

    /**
     * 根据Id查询
     */
    @Query("select new Student(id,name,number,major,password,phone,headimage) from Student s where s.id=?1")
    public Student findBystuId(String id);

    /**
     * 保存修改
     */
    @Modifying
    @Query("update Student s set s.headimage=?2,s.name=?3,s.major=?4 where s.id=?1")
    public void addHeadImage(String id,String headimage,String name,String major);

    /**
     * 修改手机
     */
    @Modifying
    @Query("update Student s set s.phone=?2 where s.id=?1")
    public void changePhone(String id,String phone);

    /**
     * 根据输入内容模糊查询
     */
    @Query(value = "select new Student(id,name,number,major,phone) " +
            "from Student s where s.name like %?1% or s.number like %?1% or s.major like %?1%")
    List<Student> findBySearchContent(String content);

}
