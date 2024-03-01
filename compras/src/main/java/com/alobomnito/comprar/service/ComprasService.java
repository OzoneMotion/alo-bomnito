package com.alobomnito.comprar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alobomnito.comprar.entity.Compras;
import com.alobomnito.comprar.repository.ComprasRepository;

@Service
public class ComprasService {
	@Autowired
	ComprasRepository comprasRepository;
	
	public List<Compras> getCompras(){
		return comprasRepository.findAll();
	}
	
	public Optional<Compras> getCompra(Integer id){
		return comprasRepository.findById(id);
	}
	
	public void saveOrUpdate(Compras compra) {
		comprasRepository.save(compra);
	}
	
	public void delete(Integer id) {
		comprasRepository.deleteById(id);
	}
}
