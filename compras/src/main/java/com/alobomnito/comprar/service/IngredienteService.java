package com.alobomnito.comprar.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alobomnito.comprar.entity.Compras;
import com.alobomnito.comprar.entity.Ingrediente;
import com.alobomnito.comprar.repository.IngredienteRepository;

@Service
public class IngredienteService {
	@Autowired
	IngredienteRepository ingredienteRepository;
	
	public List<Ingrediente> getIngredientes(){
		return ingredienteRepository.findAll();
	}
	
	public Optional<Ingrediente> getIngrediente(Integer id){
		return ingredienteRepository.findById(id);
	}
	
	public void saveOrUpdate(Ingrediente ingrediente) {
		ingredienteRepository.save(ingrediente);
	}
	
	public void delete(Integer id) {
		ingredienteRepository.deleteById(id);
	}
}
