package com.client;


import com.orderservice.client.InventoryServiceClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class InventoryServiceClientTest {


    @Autowired
    private InventoryServiceClient inventoryServiceClient;

    @Container
    static GenericContainer<?> inventoryServiceContainer = new GenericContainer<>("nginxdemos/hello:latest")
            .withExposedPorts(80);

    @DynamicPropertySource
    static void dynamicProperties(DynamicPropertyRegistry registry) {
        String url = String.format("http://%s:%d",
                inventoryServiceContainer.getHost(),
                inventoryServiceContainer.getMappedPort(80));
        registry.add("inventory.service.url", () -> url);
    }



    //write integration test
    @Test
    void updateInventory_shouldCallInventoryService() {

    }







}
