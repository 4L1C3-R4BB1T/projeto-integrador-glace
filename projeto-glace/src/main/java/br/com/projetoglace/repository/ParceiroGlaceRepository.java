package br.com.projetoglace.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.model.ParceiroGlace;

@Repository
public interface ParceiroGlaceRepository extends JpaRepository <ParceiroGlace, Long>{
	Optional<ParceiroGlace> findByEmail(String email);
	Optional<ParceiroGlace> findById(Long id);
	
	@Query("select estabelecimentos from ParceiroGlace c where c.id = :id")
	List<EstabelecimentoGlace> buscarEstabelecimentos(Long id);
	
}
