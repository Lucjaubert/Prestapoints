package fr.exception;

import org.json.JSONObject;

import fr.model.ExceptionModel;

public class ExceptionJsonDetail extends RuntimeException {

    public String getNotFound() {
       
        JSONObject object = new JSONObject(new ExceptionModel("Not found"));
        return  object.toString();  
    }

}
