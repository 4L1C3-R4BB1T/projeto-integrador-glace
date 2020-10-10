package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.Imagem;

@Repository
public interface ImagemRepository  extends JpaRepository<Imagem, Long>{

}
