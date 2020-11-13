package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.EstabelecimentoGlace;

@Repository
public interface EstabelecimentoRepository extends JpaRepository <EstabelecimentoGlace, Long>{

}
