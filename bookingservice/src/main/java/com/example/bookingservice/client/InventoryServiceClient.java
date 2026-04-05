package com.example.bookingservice.client;


import com.example.bookingservice.response.InventoryResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

@Service
public class InventoryServiceClient {

    private final RestClient restClient;

    public InventoryServiceClient(@Value("${inventory.service.url}") String inventoryServiceUrl) {
        this.restClient = RestClient.builder()
                .baseUrl(inventoryServiceUrl)
                .build();
    }

    public InventoryResponse getInventory(final Long eventId) {
        return restClient.get()
                .uri("/event/{eventId}", eventId)
                .retrieve()
                .body(InventoryResponse.class);
    }
}
