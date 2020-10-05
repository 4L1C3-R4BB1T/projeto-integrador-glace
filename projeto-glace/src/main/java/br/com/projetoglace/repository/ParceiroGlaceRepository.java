package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.ParceiroGlace;

@Repository
public interface ParceiroGlaceRepository extends JpaRepository <ParceiroGlace, Long>{
	
}
