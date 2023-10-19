package com.team13.community.model;

public class User {
    private Long id;

    private String username;
    private String password; // Consider encrypting this before storing

    private boolean enabled;
    private String firstName;
    private String lastName;
    private String email;

    public void setId(Long id){
        this.id = id;
    }
    public Long getId(){
        return this.id;
    }
}
