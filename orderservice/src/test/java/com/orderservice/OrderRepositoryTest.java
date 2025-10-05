package com.orderservice;


import com.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@SpringBootTest
public class OrderRepositoryTest {

    @Container
    static PostgreSQLContainer<?> pgvector = new PostgreSQLContainer<>("pgvector/pgvector:pg16");

    @DynamicPropertySource
    static void dynamicProperties(DynamicPropertyRegistry registry) {
        registry.add("server.port", pgvector::getJdbcUrl);
        registry.add("spring.datasource.username", pgvector::getUsername);
        registry.add("spring.datasource.password", pgvector::getPassword);
    }

    @Autowired
    private OrderRepository orderRepository;

    //tests, (se escriben como los unitarios)


}
