package com.xcd.student.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "student")
public class Student implements Serializable {

    @Id
    private String id;
    private String name;
    private long number;
    private String major;
    private String password;
    private String phone;
    private String headimage;

    public Student(String id, String name, long number, String major, String password, String phone, String headimage) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.major = major;
        this.password = password;
        this.phone = phone;
        this.headimage = headimage;
    }

    public Student(String id, String name, long number, String major, String password, String phone) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.major = major;
        this.password = password;
        this.phone = phone;
    }

    public Student(String id, String name, long number, String major, String phone) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.major = major;
        this.phone = phone;
    }



    public Student() {
    }

    public String getHeadimage() {
        return headimage;
    }

    public void setHeadimage(String headimage) {
        this.headimage = headimage;
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

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
        this.number = number;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", number=" + number +
                ", major='" + major + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", headimage='" + headimage + '\'' +
                '}';
    }
}
