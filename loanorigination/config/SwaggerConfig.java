package com.loanorigination.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Loan Origination System API")
                        .description("Complete API documentation for the Loan Origination Backend System. " +
                                   "This system supports customer registration, loan applications, document uploads, " +
                                   "and a two-tier approval process (Maker-Checker workflow).")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Loan Origination Team")
                                .email("support@loanorigination.com")
                                .url("https://github.com/your-org/loan-origination"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication", 
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("JWT token authentication. " +
                                                   "Login via /api/auth/customer/login or /api/auth/member/login " +
                                                   "to get your JWT token, then use it in the Authorization header.")));
    }
}
