package com.xcd.student.service;

import com.xcd.student.bean.Book;
import com.xcd.student.bean.Stu_Book;
import com.xcd.student.common.util.IdWorker;
import com.xcd.student.dao.BookDao;
import com.xcd.student.dao.Stu_BookDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class Stu_BookService {

    @Autowired
    private Stu_BookDao stu_bookDao;

    @Autowired
    private IdWorker idWorker;

    @Autowired
    private BookDao bookDao;
    /**
     * 添加
     */
    public void Stu_Book_addBook(Stu_Book stu_book){
        String id = idWorker.nextId()+"";
        stu_book.setId(id.substring(0,16));
        stu_bookDao.save(stu_book);
    }


    /**
     * 根据学生id查询课程
     */
    public List<Book> findBookByStuId(String stu_id) {
        List<Stu_Book> stu_books = stu_bookDao.findByStu_id(stu_id);
        List<Book> books = new ArrayList<>();
        for(int i = 0;i<stu_books.size();i++){
            Book book = bookDao.findById1(stu_books.get(i).getBook_id());
            books.add(book);
        }
        return books;
    }



    /**
     * 学生课程根据输入内容模糊查询
     */
    public List<Book> findByConditon(String stu_id, String conditon) {
        List<Stu_Book> stu_books = stu_bookDao.findByStu_id(stu_id);
        List<Book> books = new ArrayList<>();
        for(int i = 0;i<stu_books.size();i++){
            Book book = bookDao.findByConditon(stu_books.get(i).getBook_id(),conditon);
            if(book != null){
                books.add(book);
            }
        }
        return books;
    }

    /**
     * 根据课程id删除学生添加的课程
     */
    public void deleteByBookId(String stu_id,String book_id) {
        stu_bookDao.deleteByBookId(stu_id,book_id);
    }

    /**
     * 根据数据ID查询
     * @param book_id
     * @return
     */
    public Stu_Book findByBookId(String stu_id,String book_id) {
        Stu_Book stu_book = stu_bookDao.findStu_BookByBook_id(stu_id,book_id);
        return stu_book;
    }

    /**
     * 根据书籍id删除
     */
    public void delByBookId(String book_id) {
        stu_bookDao.delByBookId(book_id);
    }
}
