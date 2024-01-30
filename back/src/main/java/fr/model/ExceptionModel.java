package fr.model;


public class ExceptionModel {
    private String detail;
    
    public ExceptionModel() {

    } 
    
    public ExceptionModel(String detail) {
        this.detail = detail;
    } 

    public String getDetail() {
        return  this.detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}
