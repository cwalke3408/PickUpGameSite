package com.example.demo.Modal;

public class UserInfoModel {
        private Integer id;
        private String username;
        private String password;
        private String userdescription;
        private String photolink;
        private String email;

    public UserInfoModel() {
    }

    public UserInfoModel(Integer id, String username, String password, String userdescription, String photolink, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.userdescription = userdescription;
        this.photolink = photolink;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserdescription() {
        return userdescription;
    }

    public void setUserdescription(String userdescription) {
        this.userdescription = userdescription;
    }

    public String getPhotolink() {
        return photolink;
    }

    public void setPhotolink(String photolink) {
        this.photolink = photolink;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
