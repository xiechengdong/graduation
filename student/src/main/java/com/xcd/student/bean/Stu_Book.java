package com.xcd.student.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "stu_book")
public class Stu_Book implements Serializable {

    @Id
    private String id;
    private String stu_id;
    private String book_id;

    public Stu_Book() {
    }

    public Stu_Book(String id, String stu_id, String book_id) {
        this.id = id;
        this.stu_id = stu_id;
        this.book_id = book_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStu_id() {
        return stu_id;
    }

    public void setStu_id(String stu_id) {
        this.stu_id = stu_id;
    }

    public String getBook_id() {
        return book_id;
    }

    public void setBook_id(String book_id) {
        this.book_id = book_id;
    }

    @Override
    public String toString() {
        return "Stu_Book{" +
                "id='" + id + '\'' +
                ", stu_id='" + stu_id + '\'' +
                ", book_id='" + book_id + '\'' +
                '}';
    }
}
