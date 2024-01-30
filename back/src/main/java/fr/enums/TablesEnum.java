package fr.enums;

public enum TablesEnum {

    USER("'user'"),
    REGISTRATION("'registration'"),
    ROLE("'role'"),
    PARTNER("'partner'"),
    CATEGORY("'category'"),
    TYPE("'type'"),
    LOCATION("'location'"),
    ADDRESS_LOCATION("'address_location'"),
    USER_ROLE("'user_role'"),
    PRESTATION("'prestation'"),
    FAVORY("'favory'"),
    CREATION("'creation'"),
    IMAGE("'images'");

    private String tableName;

    TablesEnum(String tableName) {
        this.tableName = tableName;
    }

    public String getTableName() {
        return tableName;
    }

}
