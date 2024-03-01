package com.alobomnito.comprar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alobomnito.comprar.entity.Compras;

@Repository
public interface ComprasRepository extends JpaRepository <Compras, Integer>{
}
