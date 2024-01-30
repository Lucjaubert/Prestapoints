package fr.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseApi {
    private String message;
    private boolean responseValid;

    public ResponseApi() {
    }

    public ResponseApi(boolean responseValid, String message) {
        this.message = message;
        this.responseValid = responseValid;
    }
}
