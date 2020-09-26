package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoglace.model.Cidade;

public interface CidadeRepository extends JpaRepository <Cidade, Long>{

}
