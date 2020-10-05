package br.com.projetoglace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.Cidade;
import br.com.projetoglace.model.Estado;

@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long>{
	@Query("from Estado where nome like :nome")
	List<Estado> buscarEstado(String nome);
	
	@Query("from Cidade where estado.id = :id")
	List<Cidade> buscarCidades(Long id);
	
}
