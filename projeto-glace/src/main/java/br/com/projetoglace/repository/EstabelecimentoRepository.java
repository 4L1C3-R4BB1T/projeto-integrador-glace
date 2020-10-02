package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoglace.model.EstabelecimentoGlace;

public interface EstabelecimentoRepository extends JpaRepository <EstabelecimentoGlace, Long>{

}
