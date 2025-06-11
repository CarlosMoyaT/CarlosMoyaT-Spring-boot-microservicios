package com.example.demo.repository;

import com.example.demo.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.ResponseBody;

@ResponseBody
public interface VenueRepository extends JpaRepository<Venue, Long> {


}
