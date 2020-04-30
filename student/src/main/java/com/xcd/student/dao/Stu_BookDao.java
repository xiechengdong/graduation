package com.xcd.student.dao;

import com.xcd.student.bean.Book;
import com.xcd.student.bean.Stu_Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface Stu_BookDao extends JpaRepository<Stu_Book,String>, JpaSpecificationExecutor<Stu_Book> {

    /**
     * 根据学生id查询
     */
    @Query(value = "select s from Stu_Book s where s.stu_id=?1")
    public List<Stu_Book> findByStu_id(String stu_id);

    /**
     * 根据书籍Id和学生id移除
     */
    @Modifying
    @Query(value = "delete from Stu_Book as s where s.stu_id=?1 and s.book_id=?2")
    void deleteByBookId(String stu_id,String book_id);

    /**
     * 根据书籍id查询
     */
    @Query(value = "select s from Stu_Book s where s.book_id=?2 and s.stu_id=?1")
    Stu_Book findStu_BookByBook_id(String stu_id,String book_id);

    /**
     * 根据书籍id删除
     */
    @Modifying
    @Query(value = "delete from Stu_Book as s where s.book_id=?1")
    void delByBookId(String book_id);

    /**
     * 根据学生ID删除
     */
    @Modifying
    @Query(value = "delete from Stu_Book as s where s.stu_id=?1")
    void deleteByStu_id(String id);
}
