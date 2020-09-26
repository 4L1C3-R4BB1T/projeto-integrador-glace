package br.com.projetoglace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import br.com.projetoglace.model.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long>{

	@Query("from Cidade where estado.id = :id")
	List buscarCidades(Long id);

}
