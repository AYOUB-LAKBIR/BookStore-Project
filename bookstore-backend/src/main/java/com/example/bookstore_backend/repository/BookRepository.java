package com.example.bookstore_backend.repository;

import com.example.bookstore_backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}