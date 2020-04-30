package com.xcd.student.dao;

import com.xcd.student.bean.Message_details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author XieChengdong
 * @title
 * @2020/2/17 21:22
 */

@Repository
@Transactional
public interface Message_detailsDao extends JpaRepository<Message_details,String>, JpaSpecificationExecutor<Message_details> {
    /**
     * 根据父id查找
     */
    @Query("select d from Message_details d where d.parent_id=?1")
    List<Message_details> findByParent_id(String parent_id);
}
