package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.ClienteGlace;

@Repository
public interface ContatoGlaceRepository extends JpaRepository<ClienteGlace, Long> {

}
