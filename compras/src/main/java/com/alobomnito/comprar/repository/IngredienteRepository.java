package com.alobomnito.comprar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alobomnito.comprar.entity.Ingrediente;

@Repository
public interface IngredienteRepository extends JpaRepository <Ingrediente, Integer>{
}
