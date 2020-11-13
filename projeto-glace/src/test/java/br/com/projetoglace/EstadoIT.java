package br.com.projetoglace;

import javax.validation.ConstraintViolationException;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import br.com.projetoglace.exception.ClienteNaoEncontradoException;
import br.com.projetoglace.model.Estado;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.service.ClienteGlaceService;
import br.com.projetoglace.util.DatabaseCleaner;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestPropertySource("/application-test.properties")
public class EstadoIT {

	@Autowired
	private ClienteGlaceService clienteService;
	@Autowired
	private DatabaseCleaner databaseCleaner;
	@Autowired
	private EstadoRepository estadoRepository;

	@Before
	public void setUp() {
		databaseCleaner.clearTables();
		prepararDados();
	}
	
	private void prepararDados() {
		Estado estado = new Estado();
		estado.setNome("Sergipe");		
		estadoRepository.save(estado);		
		
		Estado estado1 = new Estado();
		estado1.setNome("Bahia");
		estadoRepository.save(estado1);		
	}

	@Test
		public void deveAtribuirId_QuandoCadastrarEstadoComDadosCorretos() {
		
			Estado estado = new Estado();
			estado.setNome("Pará");
			
			estado = clienteService.salvarEstado(estado);
			
			Assertions.assertThat(estado).isNotNull();
			Assertions.assertThat(estado.getId()).isNotNull();
		}
	@Test(expected = ConstraintViolationException.class)
	public void deveFalhar_QuandoCadastrarEstadoSemNome() {
		Estado estado = new Estado();
		estado.setNome(null);
		
		estado = clienteService.salvarEstado(estado);
	}	
	
	@Test(expected = ClienteNaoEncontradoException.class)
	public void deveFalhar_QuandoExcluirClienteInexistente() {
		clienteService.excluirCliente(2L);
	}
}

