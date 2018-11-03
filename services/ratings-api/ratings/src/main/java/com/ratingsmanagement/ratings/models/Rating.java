
package com.ratingsmanagement.ratings.models;


import java.util.Date;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

/**
 *
 * @author herber230
 */
public class Rating 
{
 
    // <editor-fold defaultstate="uncollapsed" desc="Properties">

    @Id 
    public ObjectId id;

    public String idPurchase;
    public String idStore;
    public String idUser;
    public String opinion;
    public Integer score;
    public Date created;
    public Date modified;
    public Boolean deferredDeletion;
            
    // </editor-fold>
        
    // <editor-fold defaultstate="collapsed" desc="Methods">

    public Rating() 
    {
        this.deferredDeletion = false;  
    };
    
    public Rating( String idPurchase, String idStore, String idUser, Integer score, String opinion) 
    {
        this.deferredDeletion = false;
        this.idPurchase = idPurchase;
        this.idStore = idStore;
        this.idUser = idUser;
        this.score = score;
        this.opinion = opinion;
    };
    
    
    // </editor-fold>
        
    // <editor-fold defaultstate="collapsed" desc="Getters & Setters">

    public String getId() {
        return id.toHexString();
    }

    public void set_id(ObjectId id) {
        this.id = id;
    }

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
    
    public String getOpinion() {
        return opinion;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Boolean getDeferredDeletion() {
        return deferredDeletion;
    }

    public void setDeferredDeletion(Boolean deferredDeletion) {
        this.deferredDeletion = deferredDeletion;
    }
    
    // </editor-fold>

    
}
