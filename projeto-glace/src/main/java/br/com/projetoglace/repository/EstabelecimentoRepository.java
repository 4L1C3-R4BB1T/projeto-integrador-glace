package br.com.projetoglace.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetoglace.model.Cidade;
import br.com.projetoglace.model.Estabelecimento;

public interface EstabelecimentoRepository extends JpaRepository <Estabelecimento, Long>{

}
