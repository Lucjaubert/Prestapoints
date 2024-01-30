package fr.enums;

public enum RoleEnum {
    
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_USER("ROLE_USER");
    
    private String role;

    RoleEnum(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
