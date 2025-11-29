Tickets purchasing for events based on microservices

## Architecture design

![Diseño de Arquitectura](inventoryservice/docs/architecture-design/Diagram.png)

# Architecture Overview
The platform follows a microservices architecture with the following characteristics:

- Event-Driven Communication: Services communicate asynchronously via Apache Kafka.
- Service Independence: Each microservice can be deployed and scaled independently.
- Centralized Authentication: Keycloak manages authentication and authorization.
- Distributed Monitoring: Prometheus and Grafana provide observability across services.

## Backend
- **Java 21** – Provides modern language features and performance improvements for building robust backend applications.
- **Spring Boot 3** – Core framework for developing production-grade Spring-based microservices with minimal configuration.
- **Maven** – Dependency management and build automation tool used for packaging and managing project lifecycle.
- **Lombok** – Reduces boilerplate code by automatically generating getters, setters, constructors, and more through annotations.
- **Resilience4j** – Implements fault tolerance patterns such as circuit breakers, retries, and rate limiters to improve service resilience.

## Database
- **PostgreSQL** – Primary relational database for transactional data.
- **Flyway** – Database version control and schema migrations.

## Messaging
- **Apache Kafka** – Distributed event streaming platform for asynchronous service communication.

## Security & Authentication
- **Keycloak** – Identity and access management with SSO support.

## Containerization
- **Docker** – Used to containerize microservices, ensuring environment consistency and simplifying deployment and scalability.

## Monitoring & Observability
- Collect metrics from your microservices (latencies, counters, system usage, etc.).
- Centralize metrics in Prometheus.
- Visualize metrics using Grafana.
- Facilitate alerts, dashboards, and proactive monitoring.
  
## Architecture
- **Spring Boot + Actuator: Exposes application metrics at /actuator/prometheus.  
- **Prometheus**: Periodically scrapes these endpoints and stores the collected metrics.  
- **Grafana**: Configured with Prometheus as a data source to display dashboards with relevant metrics (latency, request counts, memory usage, etc.).

## Getting started
Prerequisites:
- Docker and Docker Compose installed
- Git
- Java 21 (for local development)
- Maven (for local development)

```bash
   git clone https://github.com/CarlosMoyaT/CarlosMoyaT-Spring-boot-microservicios.git
   cd CarlosMoyaT-Spring-boot-microservicios

   docker compose up -d
```



# InventoryService
Handles the information of the event and the venue.
![](inventoryservice/docs/documentationimg/InventoryService%20swagger.JPG)
![](inventoryservice/docs/documentationimg/Metric%20prometheus.JPG)



# OrderService
Consume the Kafka messages that are produced in the booking service.


# BookingService
A request is received to place an order for an event for a customer. The booking service will verify that the customer actually exists, and if so, it will retrieve from the inventory service information about the specific event, remaining capacity, ticket price...
produces messages from Kafka to orderservice.




