package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.NewTopic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.scheduling.annotation.EnableScheduling;




@RequiredArgsConstructor
@EnableScheduling
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.demo.repository")
@ComponentScan(basePackages = "com.example.demo")
public class InventoryServiceApplication {


	public static void main(String[] args) {
		SpringApplication.run(InventoryServiceApplication.class, args);
	}

}






