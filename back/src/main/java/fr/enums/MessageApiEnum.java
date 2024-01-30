package fr.enums;

public enum MessageApiEnum {
    
    EMAIL_EXISTING("L'email existe déjà !"),
    EMAIL_NOT_VALID("L'email n'est pas conforme."),
    REGISTRATION_FULL("Désolé, il n'y a plus de place disponible pour cette prestation"),
    REGISTRATION_ALREADY("Vous êtes déjà inscrit à cette prestation"),
    NEED_TO_BE_CONNECTED("Vous devez être connecté pour utiliser le service."),
    DELETE_SUCCESS("La suppression a été réalisé avec succès."),
    ERROR("Une erreur a été rencontrée."),
    DELETE_FAILED("La suppression n'a pu être effectuée."),
    UPDATE_FAILED("La modification n'a pu être effectuée."),
    UPDATE_SUCCESS("La modification a été réalisée avec succès."),
    CREATION_SUCCESS("La création a été réalisée avec succès.");
    
    private String message;

    MessageApiEnum(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}