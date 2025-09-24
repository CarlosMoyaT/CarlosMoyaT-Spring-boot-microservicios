Tickets purchasing for events based on microservices

## Architecture design

![Diseño de Arquitectura](inventoryservice/docs/architecture-design/Diagram.png)

TECHNOLOGIES
Java 21, Spring Boot 3, Maven, PostgreSQL, Kafka, Docker, Keycloak, Flyway, Lombok, Resilience 4j, Prometheus, Grafana


# InventoryService
Handles the information of the event and the venue.
![](inventoryservice/docs/documentationimg/InventoryService%20swagger.JPG)
![](inventoryservice/docs/documentationimg/Metric%20prometheus.JPG)



# OrderService


# BookingService
A request is received to place an order for an event for a customer. The booking service will verify that the customer actually exists, and if so, it will retrieve from the inventory service information about the specific event, remaining capacity, ticket price...




