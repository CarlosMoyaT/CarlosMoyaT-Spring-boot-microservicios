Tickets purchasing for events based on microservices

## Architecture design

![Diseño de Arquitectura](inventoryservice/docs/architecture-design/Diagram.png)

TECHNOLOGIES
Java 21, Spring Boot 3, Maven, PostgreSQL, Kafka, Docker, Keycloak, Flyway, Lombok, Resilience 4j, Prometheus, Grafana


# InventoryService
Maneja la información del evento y del lugar
![](inventoryservice/docs/documentationimg/InventoryService%20swagger.JPG)
![](inventoryservice/docs/documentationimg/Metric%20prometheus.JPG)



# OrderService


# BookingService
Recibe una solicitud para realizar un pedido de un evento para un cliente, bookingservice verificará que el cliente realmente exista, y si existe, se obtendrá de inventoryservice información sobre evento específico, capacidad restante, precio de ticket...




