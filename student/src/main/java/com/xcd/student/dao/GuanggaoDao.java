package com.xcd.student.dao;

import com.xcd.student.bean.Guanggao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface GuanggaoDao extends JpaRepository<Guanggao,String>, JpaSpecificationExecutor<Guanggao> {

    /**
     * 按照名称模糊查询
     */
    @Query("select new Guanggao(id,name,start,over) from Guanggao g where g.name like %?1%")
    List<Guanggao> findByIsContent(String content);

    /**
     * 根据id查询
     */
    @Query("select new Guanggao(id,name,start,over,content) from Guanggao g where g.id = ?1")
    Guanggao findByGuanggaoId(String id);

}
