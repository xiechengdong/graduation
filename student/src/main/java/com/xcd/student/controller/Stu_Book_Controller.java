package com.xcd.student.controller;

import com.xcd.student.bean.Book;
import com.xcd.student.bean.Stu_Book;
import com.xcd.student.common.entity.Result;
import com.xcd.student.common.entity.StatusCode;
import com.xcd.student.service.BookService;
import com.xcd.student.service.Stu_BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/stu_book")
public class Stu_Book_Controller {

    @Autowired
    Stu_BookService stu_bookService;

    @Autowired
    BookService bookService;

    /**
     * 学生添加
     */
    @RequestMapping(value = "/addbook/{stu_id}/{book_id}",method = RequestMethod.GET)
    public Result addBook(@PathVariable String stu_id,@PathVariable String book_id){
        Stu_Book stu_book = new Stu_Book(null,stu_id,book_id);
        stu_bookService.Stu_Book_addBook(stu_book);
        //将book的收藏加1
        bookService.upFavorite(book_id);
        return new Result(true, StatusCode.OK,"添加课程成功");
    }

    /**
     * 根据学生id查询课程
     */
    @RequestMapping(value = "/findbystuid/{stu_id}",method = RequestMethod.GET)
    public Result findBookByStuId(@PathVariable String stu_id){
        List<Book> books = stu_bookService.findBookByStuId(stu_id);
        if(books.size() > 0 && books.get(0) != null){
            return new Result(true,StatusCode.OK,"查询成功",books);
        }else {
            return new Result(true,StatusCode.ERROR,"未找到课程",books);
        }
    }

    /**
     * 学生课程根据输入内容迷糊查询
     */
    @RequestMapping(value = "/findByCondition/{stu_id}/{conditon}",method = RequestMethod.GET)
    public Result findByConditon(@PathVariable String stu_id,@PathVariable String conditon){
        List<Book> books = stu_bookService.findByConditon(stu_id,conditon);
        if(books.size() > 0 && books.get(0) != null){
            return new Result(true,StatusCode.OK,"查询成功",books);
        }else {
            return new Result(true,StatusCode.ERROR,"未找到课程",books);
        }
    }

    /**
     * 根据课程id删除学生添加的课程
     */
    @RequestMapping(value = "/StudeleteByBookId/{stu_id}/{book_id}",method = RequestMethod.GET)
    public Result deleteByBookId(@PathVariable String stu_id,@PathVariable String book_id){
        stu_bookService.deleteByBookId(stu_id,book_id);
        return new Result(true,StatusCode.OK,"移除成功");
    }

    /**
     *根据书籍id查询
     */
    @RequestMapping(value = "/findbybookidandstuid/{stu_id}/{book_id}",method = RequestMethod.GET)
    public Result findByBookId(@PathVariable String stu_id,@PathVariable String book_id){
        Stu_Book stu_book = stu_bookService.findByBookId(stu_id,book_id);
        return new Result(true,StatusCode.OK,"查询成功",stu_book);
    }

    /**
     * 根据书籍id删除
     */
    @RequestMapping(value = "delByBookId/{book_id}",method = RequestMethod.GET)
    public Result delByBookId(@PathVariable String book_id){
        stu_bookService.delByBookId(book_id);
        return new Result(true,StatusCode.OK,"删除成功");
    }
}
