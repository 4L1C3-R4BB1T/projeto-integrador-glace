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
public class AcessibilidadeIT {

		@LocalServerPort
		private int port;
			
		@Before
		public void setUp() {
			RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
			RestAssured.port = port;
			RestAssured.basePath = "/acessibilidade";	
		}
		
		@Test
		public void deveRetornarStatus200_QuandoConsultarAcessibilidades() {
					
			RestAssured.given()			
				.accept(ContentType.JSON)
			.when()
				.get("/listar")
			.then()
				.statusCode(200);
		}
		@Test
		public void deveConter4Acessilibidades_QuandoConsultarAcessilidades() {
					
			RestAssured.given()
				.accept(ContentType.JSON)
			.when()
				.get("/listar")
			.then()
				.body("", Matchers.hasSize(4))
				.body("tipoAcessibilidade", Matchers.hasItems("Motora"));
		}
		
		@Test
		public void deveRetornarRespostaEStatusCorretos_QuandoConsultarAcessibilidadeExistente() {
					
			RestAssured.given()
				.pathParam("id", 1)
				.accept(ContentType.JSON)
			.when()
				.get("/buscarAcessibilidade/{id}")
			.then()
				.statusCode(HttpStatus.OK.value())
				.body("tipoAcessibilidade", Matchers.equalTo("Motora"));
		}
	}