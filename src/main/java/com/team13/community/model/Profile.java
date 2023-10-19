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

    public Long getId(){
        return id;
    }

    public String getName(){
        return name;
    }
}
