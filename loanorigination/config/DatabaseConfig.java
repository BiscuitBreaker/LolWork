package com.loanorigination.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.loanorigination.repository")
public class DatabaseConfig {
    // PostgreSQL-specific configurations can be added here if needed
}
