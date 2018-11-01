
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
 
    // <editor-fold defaultstate="collapsed" desc="Properties">

    @Id 
    public ObjectId _id;

    public String idPurchase;
    public String idStore;
    public String idUser;
    public String opinion;
    public Date created;
    public Boolean deferredDeletion;
            
    // </editor-fold>
        
    // <editor-fold defaultstate="collapsed" desc="Methods">

    public Rating() 
    {
        this.deferredDeletion = false;  
    };
    
    public Rating( String idPurchase, String idStore, String idUser, String opinion) 
    {
        this.deferredDeletion = false;
        this.idPurchase = idPurchase;
        this.idStore = idStore;
        this.idUser = idUser;  
    };
    
    
    // </editor-fold>
        
    // <editor-fold defaultstate="collapsed" desc="Getters & Setters">

    public String get_id() {
        return _id.toHexString();
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
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
