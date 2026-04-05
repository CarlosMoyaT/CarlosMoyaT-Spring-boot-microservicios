package com.example.demo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

@Getter
@Setter
@EnableScheduling
@Configuration
@ConfigurationProperties(prefix = "app.kafka")


public class AppConfig {

    private String topicName;

}
