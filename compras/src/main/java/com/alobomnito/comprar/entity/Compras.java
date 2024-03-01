package com.alobomnito.comprar.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity (name = "comprar")
@Table (name = "comprar")
public class Compras {
	
	@Column(nullable = false)
	private Integer cantidadProducto;
	
	
//------ Relationships
	@ManyToOne
	@JoinColumn(name = "id_cliente", nullable = false)
	private Cliente cliente;
	
	@ManyToOne
	@JoinColumn(name = "id_producto", nullable = false)
	private Producto producto;
	
	public Compras(Integer idCliente, Integer idProducto, Integer cantidadProducto) {
		super();
		this.idCliente = idCliente;
		this.idProducto = idProducto;
		this.cantidadProducto = cantidadProducto;
	}
	
	public Compras() {
	}

	public Integer getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Integer idCliente) {
		this.idCliente = idCliente;
	}

	public Integer getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Integer idProducto) {
		this.idProducto = idProducto;
	}

	public Integer getCantidadProducto() {
		return cantidadProducto;
	}

	public void setCantidadProducto(Integer cantidadProducto) {
		this.cantidadProducto = cantidadProducto;
	}

	
}
