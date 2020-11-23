package br.com.projetoglace.repository;
import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.EstabelecimentoGlace;
@Repository
public interface EstabelecimentoRepository extends JpaRepository <EstabelecimentoGlace, Long>{
	@Query("from EstabelecimentoGlace e join e.acessibilidades a where"
			+ "(:cidade is null or e.endereco.cidade.id = :cidade) and "
			+ "(:estado is null or e.endereco.cidade.estado.id = :estado) and "
			+ "(e.tipoEstabelecimento in (:tipoEstabelecimento)) and "
			+ "(a.id in (:tipoAcessibilidade))")
	List<EstabelecimentoGlace> findAll(Long cidade, Long estado, Set<String> tipoEstabelecimento, Set<Long>tipoAcessibilidade);
	
//	@Query( "select * from nTab  where nColum =:idEstabelecimento ")
//	List<EstabelecimentoGlace> listaAcessibilidade(Long idEstabelecimento);
	
}

