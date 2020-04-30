package com.xcd.student.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "book")
public class Book implements Serializable {

    @Id
    private String id;
    private String name;
    private String cover;
    private String teacher_name;

    public Book(String id, String name, String cover, String teacher_name, String teacher_id, String content, int favorite) {
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.teacher_name = teacher_name;
        this.teacher_id = teacher_id;
        this.content = content;
        this.favorite = favorite;
    }

    private String teacher_id;
    private String content;
    private int favorite;

    public Book() {
    }

    public Book(String id, String name, String cover, String teacher_name, String teacher_id, String content) {
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.teacher_name = teacher_name;
        this.content = content;
        this.teacher_id = teacher_id;
    }

    public Book(String id, String name, String cover, String teacher_name, String teacher_id) {
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.teacher_name = teacher_name;
        this.teacher_id = teacher_id;
    }

    public Book(String id, String name, String cover, String teacher_name, String teacher_id, int favorite) {
        this.id = id;
        this.name = name;
        this.cover = cover;
        this.teacher_name = teacher_name;
        this.teacher_id = teacher_id;
        this.favorite = favorite;
    }

    public Book(String content) {
        this.content = content;
    }

    public String getTeacher_id() {
        return teacher_id;
    }

    public void setTeacher_id(String teacher_id) {
        this.teacher_id = teacher_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getTeacher_name() {
        return teacher_name;
    }

    public void setTeacher_name(String teacher_name) {
        this.teacher_name = teacher_name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getFavorite() {
        return favorite;
    }

    public void setFavorite(int favorite) {
        this.favorite = favorite;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", cover='" + cover + '\'' +
                ", teacher_name='" + teacher_name + '\'' +
                ", teacher_id='" + teacher_id + '\'' +
                ", content='" + content + '\'' +
                ", favorite=" + favorite +
                '}';
    }
}
