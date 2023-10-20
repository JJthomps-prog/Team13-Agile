package com.team13.community.model;

public class Profile {
    private Long id;
    private String name;
    private String type;
    private String description;
    private String location;

    public Profile(Long id, String name, String type){
        this.id = id;
        this.name = name;
        this.type = type;
    }

    public Profile(){

    }

    public void setId(Long id){
        this.id = id;
    }
    public Long getId(){
        return id;
    }

    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
}
