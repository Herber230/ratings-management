package com.ratingsmanagement.stores.eventHandlers.MessageTypes;

import java.io.Serializable;
/**
 *
 * @author herber230
 */
public class PurchaseMessage implements Serializable {
    
     // <editor-fold defaultstate="uncollapsed" desc="Fields">

    private String idPurchase;
    private String idStore;
    private Integer totalScore;
    private Integer countPurchases;
                
    // </editor-fold>
    
     // <editor-fold defaultstate="collapsed" desc="Methods">

    public PurchaseMessage () {}
    
    public PurchaseMessage (String idPurchase, String idStore, Integer totalScore, Integer countPurchases){
        this.idPurchase = idPurchase;
        this.idStore = idStore;
        this.totalScore = totalScore;
        this.countPurchases = countPurchases;
    }
    
    
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Getters & Setters">
   
    
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

    public Integer getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public Integer getCountPurchases() {
        return countPurchases;
    }

    public void setCountPurchases(Integer countPurchases) {
        this.countPurchases = countPurchases;
    }
                    
    // </editor-fold>

}
