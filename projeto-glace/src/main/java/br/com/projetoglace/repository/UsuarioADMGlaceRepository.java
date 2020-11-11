package br.com.projetoglace.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetoglace.model.UsuarioADMGlace;

@Repository
public interface UsuarioADMGlaceRepository extends JpaRepository<UsuarioADMGlace, Long> {

	Optional<UsuarioADMGlace> findByEmail(String email);
}
