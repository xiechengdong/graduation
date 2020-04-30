package com.xcd.student.dao;

import com.xcd.student.bean.System_info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author XieChengdong
 * @title
 * @2020/3/1 18:54
 */

@Repository
@Transactional
public interface System_infoDao extends JpaRepository<System_info,String>, JpaSpecificationExecutor<System_info> {

    /**
     * 根据id查询
     */
    @Query(value = "select new System_info(id,phone_tel,gongao_time,gongao_info,system_about) from System_info s where s.id=?1")
    System_info findBySysId(String id);

    /**
     * 模糊查询
     */
    @Query(value = "select new System_info(id,phone_tel,gongao_time,gongao_info,system_about) " +
                    "from System_info s where s.gongao_info like %?1% or s.system_about like %?1% or s.phone_tel like %?1%")
    List<System_info> findByContent(String content);
}
