package com.team13.community.model;

import java.util.Date;

public class Review {
    private Long id;
    private Long profileId;
    private Long userId;
    private Integer rating;
    private String comment;
    private Date dateCreated;

    public Review(Long id, Long profileId, Long userId){
        this.id = id;
        this.profileId = profileId;
        this.userId = userId;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

}
