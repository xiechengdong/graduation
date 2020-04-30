package com.xcd.student.controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.xcd.student.bean.Book;
import com.xcd.student.common.entity.Result;
import com.xcd.student.common.entity.StatusCode;
import com.xcd.student.service.BookService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/book")
public class BookController {

    Logger log = LoggerFactory.getLogger(BookController.class);

    @Autowired
    BookService bookService;

    /**
     * 查询所有，但是不查询课程内容，提高传输效率
     */
    @RequestMapping(value = "/findall")
    public Result FindAll(@RequestParam(name = "content",required = false) String content){
        //根据输入内容判断查询所有还是迷糊查询
        JsonParser jp = new JsonParser();
        if(content != null){
            JsonObject jo = jp.parse(content).getAsJsonObject();
            String content1 = jo.get("content").getAsString();
            if(content1.equals("")){
                List<Book>  books = bookService.FindAll();
                if(books.size() > 0 && books.get(0) != null) {
                    return new Result(true, StatusCode.OK, "查询成功", books);
                }else {
                    return new Result(true,StatusCode.ERROR,"未找到课程",books);
                }
            }else {
                List<Book> books = bookService.findBySearchContent(content1);
                if(books.size() > 0 && books.get(0) != null){
                    return new Result(true,StatusCode.OK,"查询成功",books);
                }else {
                    return new Result(true,StatusCode.ERROR,"未找到相关课程",books);
                }
            }
        }else {
            List<Book>  books = bookService.FindAll();
            if(books.size() > 0 && books.get(0) != null) {
                return new Result(true, StatusCode.OK, "查询成功", books);
            }else {
                return new Result(true,StatusCode.ERROR,"未找到课程",books);
            }
        }
    }

    /**
     * 根据收藏量降序排序查询
     */
    @RequestMapping(value = "/findByfavorite",method = RequestMethod.GET)
    public Result FindByFavorite(){
        List<Book> books = bookService.findByFavorite();
        if(books.size() > 0 && books.get(0) != null) {
            return new Result(true, StatusCode.OK, "查询成功", books);
        }else {
            return new Result(true,StatusCode.ERROR,"未找到课程",books);
        }
    }


    /**
     * 模糊查询
     */
    @RequestMapping(value = "/searchbook/{searchContent}",method = RequestMethod.GET)
    public Result SearchBook(@PathVariable String searchContent){
        List<Book> books = bookService.findBySearchContent(searchContent);
        if(books.size() > 0 && books.get(0) != null){
            return new Result(true,StatusCode.OK,"查询成功",books);
        }else {
            return new Result(true,StatusCode.ERROR,"未找到相关课程",books);
        }
    }

    /**
     * 根据教师ID查询
     */
    @RequestMapping(value = "/findbyteacherid/{teacherId}",method = RequestMethod.GET)
    public Result findByTeacherId(@PathVariable String teacherId){
        List<Book> books = bookService.findByTeacher(teacherId);
        if(books.size() > 0 && books.get(0) != null){
            return new Result(true,StatusCode.OK,"查询成功",books);
        }else {
            return new Result(true,StatusCode.ERROR,"未找到课程",books);
        }
    }

    /**
     * 根据教师ID模糊查询
     */
    @RequestMapping(value = "/searchbookbyteacherid/{searchContent}/{id}",method = RequestMethod.GET)
    public Result SearchBookByTeacherId(@PathVariable String searchContent,@PathVariable String id){
        List<Book> books = bookService.SearchBookByTeacherId(searchContent,id);
        if(books.size() > 0 && books.get(0) != null){
            return new Result(true,StatusCode.OK,"查询成功",books);
        }else {
            return new Result(true,StatusCode.ERROR,"未找到相关课程",books);
        }
    }

    /**
     * 添加课程
     */
    @RequestMapping(value = "/addbook",method = RequestMethod.POST)
    public Result addbook(@RequestBody Book book){
        bookService.addbook(book);
        return new Result(true,StatusCode.OK,"添加课程成功",null);
    }

    /**
     * 根据Id删除课程
     */
    @RequestMapping(value = "/deleteById/{book_id}")
    public Result deletebyId(@PathVariable String book_id){
        bookService.deleteById(book_id);
        return new Result(true,StatusCode.OK,"删除成功！");
    }

    /**
     * 根据课程ID查询课程内容
     */
    @RequestMapping(value = "/findcontentbyid/{id}",method = RequestMethod.GET)
    public Result findContentById(@PathVariable String id){
        String content =  bookService.findContentByid(id);
        return new Result(true,StatusCode.OK,"查询成功",content);
    }

    /**
     * 根据Id查询课程信息
     */
    @RequestMapping(value = "/findById/{id}")
    public Result findByBookId(@PathVariable("id") String id){
        Book book = bookService.findByBookId(id);
        return new Result(true,StatusCode.OK,"查询成功",book);
    }

    /**
     * 管理员修改课程内容
     */
    @RequestMapping("/manageModify")
    public Result manageModify(@RequestBody Book book){
        bookService.manageModify(book);
        return new Result(true,StatusCode.OK,"修改成功");
    }
}
