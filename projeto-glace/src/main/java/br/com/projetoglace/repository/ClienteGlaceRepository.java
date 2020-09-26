package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.ClienteGlace;

@Repository
public interface ClienteGlaceRepository extends JpaRepository<ClienteGlace, Long> {

//	@Query("select email from Cliente c where c.id = :id")
//	List<ClienteGlace> buscarEmailPorId(Long id);
//	

}
