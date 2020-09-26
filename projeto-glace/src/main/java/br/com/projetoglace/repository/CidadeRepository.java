package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoglace.model.Estado;

public interface CidadeRepository extends JpaRepository <Estado, Long>{

}
