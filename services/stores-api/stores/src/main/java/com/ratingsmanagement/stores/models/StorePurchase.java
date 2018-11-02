/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ratingsmanagement.stores.models;

import java.util.Date;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

/**
 *
 * @author herber230
 */
public class StorePurchase {
   
     // <editor-fold defaultstate="uncollapsed" desc="Properties">

    @Id 
    public ObjectId _id;

    private String idStore;
    private String idPurchase;
    private Double ratingScore;
    
    // </editor-fold>
    
     // <editor-fold defaultstate="uncollapsed" desc="Methods">

    public StorePurchase () { }
    
    public StorePurchase (String idStore, String idPurchase, Double ratingScore ) {
        this.idStore = idStore;
        this.idPurchase = idPurchase;
        this.ratingScore = ratingScore;
    }
        
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Getters & Setters">

    public String get_id() {
        return _id.toHexString();
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }
    
    public String getIdStore() {
        return idStore;
    }

    public void setIdStore(String idStore) {
        this.idStore = idStore;
    }

    public String getIdPurchase() {
        return idPurchase;
    }

    public void setIdPurchase(String idPurchase) {
        this.idPurchase = idPurchase;
    }

    public Double getRatingScore() {
        return ratingScore;
    }

    public void setRatingScore(Double ratingScore) {
        this.ratingScore = ratingScore;
    }
    
    // </editor-fold>

}
