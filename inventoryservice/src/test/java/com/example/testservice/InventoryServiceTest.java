package com.example.testservice;


import com.example.demo.entity.Event;
import com.example.demo.repository.EventRepository;
import com.example.demo.response.EventInventoryResponse;
import com.example.demo.service.InventoryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static jdk.internal.org.objectweb.asm.util.CheckClassAdapter.verify;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class InventoryServiceTest {

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private InventoryService inventoryService;

    @Test
    void testGetAllEvents() {

        Event1 event1 = new Event();
        event1.setName("Concierto");
        event1.setLeftCapacity(100);
        event1.setVenue("Auditorio");

        when(eventRepository.findAll()).thenReturn(List.of(event1));

        List<EventInventoryResponse> result = yourService.getAllevents();

        assertEquals(2, result.size());
        assertEquals("Concierto", result.get(0).getEvent());
        assertEquals(100, result.get(0).getCapacity());
        assertEquals("Auditorio", result.get(0).getVenue());

        verify(eventRepository, times(1)).findAll();;

    }


}
