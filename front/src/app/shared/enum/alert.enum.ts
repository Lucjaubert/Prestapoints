export enum AlertEnum {
    TYPE_DANGER = 'danger',
    TYPE_SUCCESS = 'success',
    TYPE_INFO = 'info',
    MESSAGE_SIGNIN_SUCCESS = "Votre inscription est prise en compte, vous pouvez vous connecter",
    MESSAGE_UPDATE_SUCCESS = "Les modifications ont été prises en compte.",
    MESSAGE_LOGIN_SUCCESSED = "Bienvenue ! Vous êtes connecté.",
    MESSAGE_LOGIN_FAILED = "Désolé, impossible de se connecter.",
    MESSAGE_LOGIN_WRONG = "Désolé, les informations renseignées ne permettent pas votre authentification",
    MESSAGE_LOGOUT_SUCCESSED = "Vous êtes maintenant déconnecté.",
    MESSAGE_LOGOUT_FAILED = "La déconnexion a échoué. Veuillez réessayer.",
    MESSAGE_SESSION_EXPIRED = "Session expirée. Veuillez vous identifier à nouveau.",
    MESSAGE_VERIFY_LOGIN_INFORMATION = "Vérifiez vos informations de connexion.", 
    MESSAGE_WRONG_PASSWORD = "Les mots de passe sont différents",
    MESSAGE_EMAIL_ALREADY_EXIST = "L'email existe déjà !",
    MESSAGE_EMAIL_NOT_FOUND = "L'email est introuvable",
    MESSAGE_WRONG_ROLE = "Désolé, vous n'êtes pas autorisé, contactez votre administrateur",
    MESSAGE_NOT_CONNECTED = "Veuillez vous connecter !",
    MESSAGE_RESERVATION_SUCCESS = "Votre réservation a bien été enregistrée.",
    MESSAGE_RESERVATION_DELETE = "Votre réservation a bien été annulée.",
    MESSAGE_DELETE_SUCCESS = "La suppression a été réalisée avec succès.",
    ERROR = "Une erreur s'est produite.",
    TIME_INFINITY = 2147483647,
    TIME_LONG = 10000,
    TIME_MEDIUM = 5000,
    TIME_SHORT = 2000,

}
