package com.alobomnito.comprar.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alobomnito.comprar.entity.Ingrediente;
import com.alobomnito.comprar.service.IngredienteService;

@RestController
@RequestMapping(path = "api/v1/ingrediente")

public class IngredienteController {
	
	
	@Autowired
	private IngredienteService ingredienteService;
	
	@GetMapping
	public List<Ingrediente> getAll(){
		return ingredienteService.getIngredientes();
	}
	
	@GetMapping("/{id_inrgediente}")
	public Optional<Ingrediente> getbyId(@PathVariable("id_ingrediente") Integer id_ingrediente){
		return ingredienteService.getIngrediente(id_ingrediente);
	}
	
	@PostMapping
	public void saveUpdate(@RequestBody Ingrediente ingrediente){
		ingredienteService.saveOrUpdate(ingrediente);
	}
	
	@DeleteMapping ("/{id_ingrediente}")
	public void saveUpdate(@PathVariable Integer id_ingrediente){
		ingredienteService.delete(id_ingrediente);
	}

}
