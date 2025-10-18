package com.orderservice;


import com.orderservice.entity.Order;
import com.orderservice.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.math.BigDecimal;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Testcontainers
@DataJpaTest
@SpringBootTest
class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;

    @Container
    static PostgreSQLContainer<?> pgvector = new PostgreSQLContainer<>("pgvector/pgvector:pg16")
            .withDatabaseName("orders")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void dynamicProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", pgvector::getJdbcUrl);
        registry.add("spring.datasource.username", pgvector::getUsername);
        registry.add("spring.datasource.password", pgvector::getPassword);
    }

    //tests, (write same unit test)

    @Test
    void testSaveAndFindOrder() {
        Order order = Order.builder()
                .totalPrice(new BigDecimal("199.90"))
                .ticketCount(2L)
                .customerId(12L)
                .eventId(3L)
                .build();

        Order saved = orderRepository.save(order);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getPlacedAt()).isNotNull();
        assertThat(orderRepository.findById(saved.getId())).isPresent();

    }




    


}
