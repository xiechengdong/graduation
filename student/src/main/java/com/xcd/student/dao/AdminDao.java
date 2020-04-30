package com.xcd.student.dao;

import com.xcd.student.bean.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface AdminDao extends JpaRepository<Admin,String>, JpaSpecificationExecutor<Admin> {

    /**
     * 根据管理员名称查找
     */
    public Admin findByName(String name);
}
