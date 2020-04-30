package com.xcd.student.dao;

import com.xcd.student.bean.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface BookDao extends JpaRepository<Book,String>, JpaSpecificationExecutor<Book> {

    /**
     * 根据id查询
     */
    @Query(value = "select new Book(id,name,cover,teacher_name,teacher_id) from Book b where b.id=?1")
    public Book findById1(String id);

    /**
     * 模糊查询
     */
    @Query(value = "select new Book(id,name,cover,teacher_name,teacher_id,favorite) from Book b where b.name like %?1% or b.teacher_name like %?1%")
    List<Book> findBySearchContent(String searchContent);

    /**
     * 根据教师Id查询课程
     */
    @Query(value = "select new Book(id,name,cover,teacher_name,teacher_id) from Book b where b.teacher_id=?1")
    public List<Book> findByTeacher_id(String id);

    /**
     * 根据教师ID模糊查询
     */
    @Query(value = "select new Book(id,name,cover,teacher_name,teacher_id) from Book b where b.name like %?1% and b.teacher_id=?2" )
    public List<Book> SearchBookByTeacherId(String searchContent,String id);

    /**
     * 查询所有不查询课程内容，提高传输效率
     */
    @Query(value = "select new Book(id,name,cover,teacher_name,teacher_id,favorite) from Book")
    public List<Book> findAllBook();

    /**
     * 根据收藏量降序排序查询
     */
    @Query(value = "select new Book(id,name,cover,teacher_name,teacher_id) from Book order by favorite desc")
    public List<Book> findByFavorite();

    /**
     * 根据id查找内容
     */
    @Query(value = "select new Book(content) from Book b where b.id=?1")
    public List<Book> findContentByid(String id);

    /**
     * 学生课表根据输入的内容模糊查询
     * @param book_id
     * @param conditon
     * @return
     */
    @Query(value = "select new Book(id,name,cover,teacher_name,teacher_id) from Book b where b.name like %?2% and b.id=?1")
    Book findByConditon(String book_id, String conditon);

    /**
     * 根据教师ID删除
     */
    @Modifying
    @Query(value = "delete from Book b where b.teacher_id=?1")
    void deleteByTeacher_id(String id);

    /**
     * 根据Id将收藏加1
     */
    @Modifying
    @Query(value = "update Book b set b.favorite = b.favorite+1 where b.id=?1")
    void upFavorite(String book_id);

    /**
     * 根据课程id查询内容
     */
    @Query(value = "select new Book(id,name,cover,teacher_name,teacher_id,favorite) from Book b where b.id=?1")
    Book findByBookId(String id);
}
