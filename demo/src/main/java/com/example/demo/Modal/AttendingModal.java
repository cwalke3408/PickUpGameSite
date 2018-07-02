package com.example.demo.Modal;

public class AttendingModal {
    private Integer user_id;
    private Integer event_id;
    private String author;

    public AttendingModal() {
    }

    public AttendingModal(Integer user_id, Integer event_id, String author) {
        this.user_id = user_id;
        this.event_id = event_id;
        this.author = author;
    }

    public AttendingModal(Integer user_id, Integer event_id) {
        this.user_id = user_id;
        this.event_id = event_id;
        this.author = "";
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getEvent_id() {
        return event_id;
    }

    public void setEvent_id(Integer event_id) {
        this.event_id = event_id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
