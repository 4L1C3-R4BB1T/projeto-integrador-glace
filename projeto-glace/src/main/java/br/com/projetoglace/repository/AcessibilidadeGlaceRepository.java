package br.com.projetoglace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.Acessibilidade;

@Repository
public interface AcessibilidadeGlaceRepository extends JpaRepository <Acessibilidade, Long>{
	
	@Query("from Acessibilidade a where a.id = :id")
	List<Acessibilidade> bucarAAcessibilidade(Long id);
	
	List<Acessibilidade> findProductByTipoAcessibilidade(String tipAcessibilidade);
	
}
