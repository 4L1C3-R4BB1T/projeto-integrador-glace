package br.com.projetoglace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.projetoglace.model.Cidade;
import br.com.projetoglace.model.Estado;

public interface CidadeRepository extends JpaRepository <Cidade, Long>{
	
	@Query("from Cidade where estado_id = :id")
	List<Cidade> bucarCidades(Long id);
	
	
	Cidade findById(Estado estado);

}
