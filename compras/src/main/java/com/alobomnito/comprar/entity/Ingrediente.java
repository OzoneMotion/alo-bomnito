package com.alobomnito.comprar.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity (name = "ingrediente")
@Table (name = "ingrediente")
public class Ingrediente {
	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private Integer id_ingrediente;
		
	@Column(nullable = false)
	private String nombre;
		
	@Column(nullable = false)
	private String funcion;

//--------- Relationships -------
	@ManyToOne
	@JoinColumn(name = "id_administrador", nullable = false)
	private Administrador administrador;
	
	@ManyToMany(mappedBy = "ingrediente")
    private Set<Producto> producto; 
	
	public Ingrediente() {
	}
	
	public Ingrediente(Integer id_ingrediente, String nombre, String funcion) {
		super();
		this.id_ingrediente = id_ingrediente;
		this.nombre = nombre;
		this.funcion = funcion;
	}

	public Integer getId_ingrediente() {
		return id_ingrediente;
	}

	public void setId_ingrediente(Integer id_ingrediente) {
		this.id_ingrediente = id_ingrediente;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getFuncion() {
		return funcion;
	}

	public void setFuncion(String funcion) {
		this.funcion = funcion;
	}
	
	
}
