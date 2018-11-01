package com.ratingsmanagement.stores.models;


import java.util.Date;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

/**
 *
 * @author herber230
 */
public class Store 
{
 
    // <editor-fold defaultstate="collapsed" desc="Properties">

    @Id 
    public ObjectId _id;

    public String name;
    public String address;
    public String idCity;
    public String idCountry;
    public Date created;
    public Date modified;
    public Boolean deferredDeletion;
            
    // </editor-fold>
        
    // <editor-fold defaultstate="collapsed" desc="Methods">

    public Store() 
    {
        this.deferredDeletion = false;  
    };
    
    public Store( String name, String address, String idCity, String idCountry) 
    {
        this.deferredDeletion = false;
        this.name = name;
        this.address = address;
        this.idCity = idCity;
        this.idCountry = idCountry;
    };
    
    
    // </editor-fold>
        
    // <editor-fold defaultstate="collapsed" desc="Getters & Setters">

    public String get_id() {
        return _id.toHexString();
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }
       
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIdCity() {
        return idCity;
    }

    public void setIdCity(String idCity) {
        this.idCity = idCity;
    }

    public String getIdCountry() {
        return idCountry;
    }

    public void setIdCountry(String idCountry) {
        this.idCountry = idCountry;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getModified() {
        return modified;
    }

    public void setModified(Date modified) {
        this.modified = modified;
    }

    public Boolean getDeferredDeletion() {
        return deferredDeletion;
    }

    public void setDeferredDeletion(Boolean deferredDeletion) {
        this.deferredDeletion = deferredDeletion;
    }

    // </editor-fold>

    
}
