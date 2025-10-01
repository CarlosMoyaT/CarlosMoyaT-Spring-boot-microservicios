package com.example.orderservice;


import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
public class OrderRepositoryTest {

    @Container
    static PostgreSQLContainer<?> pgvector = new PostgreSQLContainer<>("pgvector/pgvector:pg16");


}
