package fr.enums;

public enum RegexEnum {

    REGEX_EMAIL("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~\\-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"),
    REGEX_PASSWORD("^(?=.*[0-9]).{8,}$");

    private String string;

    RegexEnum(String string) {
        this.string = string;
    }

    public String getString() {
        return string;
    }
}
