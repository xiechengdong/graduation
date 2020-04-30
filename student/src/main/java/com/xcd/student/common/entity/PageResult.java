package com.xcd.student.common.entity;

import org.springframework.stereotype.Component;

import java.util.List;

/*
分页的类
 */
public class PageResult <T> {
    private long total;
    private List<T> rows;

    public PageResult() {
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }

    public PageResult(long total, List<T> rows) {
        this.total = total;
        this.rows = rows;
    }
}
