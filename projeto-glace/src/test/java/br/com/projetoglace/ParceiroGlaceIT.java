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

public class ParceiroGlaceIT {
	@LocalServerPort
	private int port;
	
	private String token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoxLCJ1c2VyX25hbWUiOiJhbGluZUBhbGluZS5jb20iLCJzY29wZSI6WyJ3cml0ZSIsInJlYWQiXSwiYXRpIjoiYjJhM2IyMWQtYTM1Mi00YTA2LWI4YzUtY2Q3OTk2ZjVmNzY2IiwiZXhwIjoxNjA2NzQ1NDU0LCJhdXRob3JpdGllcyI6WyJVRyJdLCJqdGkiOiJkYWExMmNkZi0zOTFkLTQ4ZGMtYWUwZS05MTIyZmRiZGQzNDEiLCJub21lX2NvbXBsZXRvIjoiQWxpbmUgRmVycmVpcmEiLCJjbGllbnRfaWQiOiJmcm9udGVuZEdsYWNlLWNsaWVudCJ9.FngUGpiKWI2la20C1kYMGDkeO5cjZwVP4Zsc55f8PY4";
	
	@Before
	public void setUp() {
		RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
		RestAssured.port = port;
		RestAssured.basePath = "/parceiro";	
	}
	
	@Test
	public void deveRetornarStatus200_QuandoConsultarParceiros() {
				
		RestAssured.given()			
			.accept(ContentType.JSON)	
			.header("Authorization", token)
		.when()
			.get("/")
		.then()
			.statusCode(200);
	}
	@Test
	public void deveConter11Parceiros_QuandoConsultarParceiros() {
				
		RestAssured.given()
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get()
		.then()
			.body("", Matchers.hasSize(11))
			.body("razao", Matchers.hasItems("Verde Fazenda", "Rio das Ostras Hotel"));
	}
	
	@Test
	public void deveRetornarRespostaEStatusCorretos_QuandoConsultarParceiroExistente() {
				
		RestAssured.given()
			.pathParam("id", 1)
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get("/{id}")
		.then()
			.statusCode(HttpStatus.OK.value())
			.body("razao", Matchers.equalTo("Verde Fazenda"));
	}
	
	@Test
	public void deveRetornarStatus201_QuandoCadastrarParceiro() {
		RestAssured.given()
		.basePath("/parceiro")
		.port(port)
			.body("{ \"razao\": \"Mundo Verde\" ,"
					+ "\"cnpj\": \"12154644744111\","
					+ "\"email\": \"mundo@email.com\","
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
					+ "\"senha\": \"$2a$10$v0GWmMhHoW6XMO1d7JKaeOdiRLCt7.x9ti6WJBBKcxZMkd8rKjLZ6\"}")
			.contentType(ContentType.JSON)
			.accept(ContentType.JSON)
		.when()
			.post()
		.then()
			.statusCode(HttpStatus.CREATED.value());
	}
}