package br.com.projetoglace;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class EstabelecimentoIT {
	@LocalServerPort
	private int port;
	
	private String token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoxLCJ1c2VyX25hbWUiOiJhbGluZUBhbGluZS5jb20iLCJzY29wZSI6WyJ3cml0ZSIsInJlYWQiXSwiYXRpIjoiYjJhM2IyMWQtYTM1Mi00YTA2LWI4YzUtY2Q3OTk2ZjVmNzY2IiwiZXhwIjoxNjA2NzQ1NDU0LCJhdXRob3JpdGllcyI6WyJVRyJdLCJqdGkiOiJkYWExMmNkZi0zOTFkLTQ4ZGMtYWUwZS05MTIyZmRiZGQzNDEiLCJub21lX2NvbXBsZXRvIjoiQWxpbmUgRmVycmVpcmEiLCJjbGllbnRfaWQiOiJmcm9udGVuZEdsYWNlLWNsaWVudCJ9.FngUGpiKWI2la20C1kYMGDkeO5cjZwVP4Zsc55f8PY4";
	
	@Before
	public void setUp() {
		RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
		RestAssured.port = port;
		RestAssured.basePath = "/estabelecimento";	
	}
	
	@Test
	public void deveRetornarStatus200_QuandoConsultarEstabelecimentos() {
				
		RestAssured.given()			
			.accept(ContentType.JSON)	
			.header("Authorization", token)
		.when()
			.get("/")
		.then()
			.statusCode(200);
	}
	@Test
	public void deveConter8Estabelecimentos_QuandoConsultarEstabelecimentos() {
				
		RestAssured.given()
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get()
		.then()
			.body("", Matchers.hasSize(8))
			.body("nome", Matchers.hasItems("Viva Verde Fazenda", "Viva Verde Culinária Brasileira"));
	}
	
	@Test
	public void deveRetornarRespostaEStatusCorretos_QuandoConsultarEstabelecimentoExistente() {
				
		RestAssured.given()
			.pathParam("id", 10)
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get("/{id}")
		.then()
			.statusCode(HttpStatus.OK.value())
			.body("nome", Matchers.equalTo("Viva Verde Culinária Brasileira"));
	}
	
	@Test
	public void deveRetornarStatus201_QuandoCadastrarEstabelecimento() {
		RestAssured.given()
		.basePath("/estabelecimento")
		.port(port)
			.body("{ \"nome\": \"Mundo Verde\" ,"
					+ "\"cnpj\": \"12154644744111\","
					+ "\"descricao\": \"Lorem ipsum em design gráfico e editoração é um texto \","
					+ "\"telefone\": \"87968767687\","
					+ "\"endereco\":{\"cep\": \"22222222\","
					+ "\"rua\": \"dfaas\","
					+ "\"numero\": \"112\","
					+ "\"bairro\": \"dffsa\","
					+ "\"cidade\":{\"id\": \"65\","
					+ "\"nome\": \"São Domingos do Norte\","
					+ "\"estado\": {\"id\": \"8\","
					+ "\"nome\": \"Espirito Santo\"}}},"
					+ "\"foto\": {\"id\": \"52\"},"
					+ "\"tipoEstabelecimento\": \"Hotel\","
					+ "\"parceiroGlace\": {\"id\": \"3\"},"
					+ "\"acessibilidades\": [{\"id\": \"3\"},"
					+ "{\"id\": \"4\"}] }")
			.contentType(ContentType.JSON)
			.accept(ContentType.JSON)
		.when()
			.post()
		.then()
			.statusCode(HttpStatus.CREATED.value());
	}
}
