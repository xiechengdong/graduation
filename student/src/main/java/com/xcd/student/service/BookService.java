package com.xcd.student.service;

import com.xcd.student.bean.Book;
import com.xcd.student.common.util.IdWorker;
import com.xcd.student.dao.BookDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    Logger log = LoggerFactory.getLogger(BookService.class);

    @Autowired
    private BookDao bookDao;

    @Autowired
    private IdWorker idWorker;

    /**
     * 查询所有,但是不查询课程内容，提高查询效率
     */
    public List<Book> FindAll(){
        return bookDao.findAllBook();
    }

    /**
     * 根据收藏量降序排序查询
     */
    public List<Book> findByFavorite(){
        return bookDao.findByFavorite();
    }


    /**
     * 模糊查询
     */
    public List<Book> findBySearchContent(String searchContent) {
        return bookDao.findBySearchContent(searchContent);
    }

    /**
     * 根据教师id查询
     * @param teacherId
     * @return
     */
    public List<Book> findByTeacher(String teacherId) {
        return bookDao.findByTeacher_id(teacherId);
    }

    public List<Book> SearchBookByTeacherId(String searchContent, String id) {
        /**
         * 根据教师ID模糊查询
         */
        return bookDao.SearchBookByTeacherId(searchContent,id);
    }

    /**
     * 添加课程
     * @param book
     */
    public void addbook(Book book) {
        String id = idWorker.nextId()+"";
        book.setId(id.substring(0,16));
        bookDao.save(book);
    }

    /**
    *根据Id删除
     */
    public void deleteById(String book_id) {
        bookDao.deleteById(book_id);
    }

    /**
     * 根据id查找内容
     * @param id
     * @return
     */
    public String findContentByid(String id) {
        List<Book> books = bookDao.findContentByid(id);
        return books.get(0).getContent();
    }

    /**
     * 根据id将收藏量加1
     */
    public void upFavorite(String book_id){
        bookDao.upFavorite(book_id);
    }

    /**
     * 根据id查询课程内容
     */
    public Book findByBookId(String id){
        return bookDao.findByBookId(id);
    }

    /**
     * 管理员修改课程内容
     */
    public void manageModify(Book book){
        Book book1 = this.findByBookId(book.getId());
        book1.setName(book.getName());
        book1.setTeacher_name(book.getTeacher_name());
        bookDao.save(book1);
    }

}
