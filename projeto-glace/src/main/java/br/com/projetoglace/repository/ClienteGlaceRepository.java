package br.com.projetoglace.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.ClienteGlace;

@Repository
public interface ClienteGlaceRepository extends JpaRepository<ClienteGlace, Long> {
	Optional<ClienteGlace> findByEmail(String email);
}
