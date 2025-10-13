package com.client;

import com.orderservice.client.InventoryServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@SpringBootTest
public class InventoryServiceClientTest {

    @Autowired
    private InventoryServiceClient inventoryServiceClient;

    //write test about RestTemplate, ResponseEntity, etc...
}
