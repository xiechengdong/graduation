package com.xcd.student.dao;

import com.xcd.student.bean.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface MessageDao extends JpaRepository<Message,String>, JpaSpecificationExecutor<Message> {

    /**
     * 根据书籍id查找
     */
    @Query("select m from Message m where m.book_id=?1")
    List<Message> findByBook_id(String book_id);
}
