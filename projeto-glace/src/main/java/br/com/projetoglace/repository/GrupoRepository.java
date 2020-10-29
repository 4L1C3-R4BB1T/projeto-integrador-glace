package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.Grupo;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo, Long>	 {

}
