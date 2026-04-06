package com.example.testservice;

import com.example.demo.InventoryServiceApplication;
import com.example.demo.entity.Event;
import com.example.demo.entity.Venue;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.VenueRepository;
import com.example.demo.response.EventInventoryResponse;
import com.example.demo.service.InventoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = InventoryServiceApplication.class)
@Testcontainers
@Transactional
class InventoryServiceTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.datasource.driver-class-name", postgres::getDriverClassName);
    }

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private VenueRepository venueRepository;

    @BeforeEach
    void setUp() {
        eventRepository.deleteAll();
        venueRepository.deleteAll();
    }

    @Test
    void testGetAllEvents() {
        Venue venue = Venue.builder()
                .id(1L)
                .name("Auditorio")
                .address("123 Main St")
                .totalCapacity(500L)
                .build();
        venue = venueRepository.save(venue);

        Event event = Event.builder()
                .id(1L)
                .name("Concierto")
                .totalCapacity(200L)
                .leftCapacity(100L)
                .ticketPrice(new BigDecimal("50.00"))
                .venue(venue)
                .build();
        eventRepository.save(event);

        List<EventInventoryResponse> result = inventoryService.getAllEvents();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Concierto", result.get(0).getEvent());
        assertEquals(100L, result.get(0).getCapacity());
        assertEquals("Auditorio", result.get(0).getVenue().getName());
    }
}
