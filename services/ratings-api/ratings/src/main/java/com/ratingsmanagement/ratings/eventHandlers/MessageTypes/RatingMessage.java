/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ratingsmanagement.ratings.eventHandlers.MessageTypes;

import java.io.Serializable;

/**
 *
 * @author herber230
 */
public class RatingMessage implements Serializable {
    
    // <editor-fold defaultstate="uncollapsed" desc="Fields">

    private String idRating;
    private String idPurchase;
    private String idStore;
    private String idUser;
    private Integer score;
    private String action;
    
    // </editor-fold>
    
    // <editor-fold defaultstate="uncollapsed" desc="Properties">

    public RatingMessage( ) { }
    
    public RatingMessage(String idRating, String idPurchase, String idStore, String idUser, Integer score, String action ) {
        this.idRating = idRating;
        this.idPurchase = idPurchase;
        this.idStore = idStore;
        this.idUser = idUser;
        this.score = score;
        this.action = action;
    }
    
    @Override
    public String toString() {
        return "RatingMessage{" +
                "idRating ='" + idRating + '\'' +
                ", idPurchase='" + idPurchase + '\'' +
                ", idStore=" + idStore + '\'' +
                ", idUser=" + idUser + '\'' +
                ", score=" + score + '\'' +
                ", action=" + action +
                '}';
    }
                
    // </editor-fold>
    
    // <editor-fold defaultstate="uncollapsed" desc="Properties">

    public String getIdPurchase() {
        return idPurchase;
    }

    public void setIdPurchase(String idPurchase) {
        this.idPurchase = idPurchase;
    }

    public String getIdStore() {
        return idStore;
    }

    public void setIdStore(String idStore) {
        this.idStore = idStore;
    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
    
    public String getIdRating() {
        return idRating;
    }

    public void setIdRating(String idRating) {
        this.idRating = idRating;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }


    // </editor-fold>    
    

}
