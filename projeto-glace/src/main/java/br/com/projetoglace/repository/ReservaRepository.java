package br.com.projetoglace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

	@Query("from Reserva r where cliente.id = :id")
	List<Reserva> listarReservaPorCliente(Long id);
		
}
