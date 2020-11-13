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
public class ClienteGlaceIT {
	@LocalServerPort
	private int port;
	
	private String token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoxLCJ1c2VyX25hbWUiOiJhbGluZUBhbGluZS5jb20iLCJzY29wZSI6WyJ3cml0ZSIsInJlYWQiXSwiZXhwIjoxNjA1MjE1NDEyLCJhdXRob3JpdGllcyI6WyJVRyJdLCJqdGkiOiJjZWQwMzUzNC0wNjYxLTRkYmYtOTY3Yy0wOTNlMWZiZGMxNWIiLCJub21lX2NvbXBsZXRvIjoiQWxpbmUgRmVycmVpcmEiLCJjbGllbnRfaWQiOiJmcm9udGVuZEdsYWNlLWNsaWVudCJ9.cMr_Dx5QHOB9n0QN6OZMPY8lPVJyMz93LqC4C3jJIzY";
	
	@Before
	public void setUp() {
		RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
		RestAssured.port = port;
		RestAssured.basePath = "/cliente";	
	}
	
	@Test
	public void deveRetornarStatus200_QuandoConsultarClientes() {
				
		RestAssured.given()			
			.accept(ContentType.JSON)	
			.header("Authorization", token)
		.when()
			.get("/usuarioAdm")
		.then()
			.statusCode(200);
	}
	@Test
	public void deveConter3Clientes_QuandoConsultarClientes() {
				
		RestAssured.given()
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get()
		.then()
			.body("", Matchers.hasSize(3))
			.body("nome", Matchers.hasItems("Amanda"));
	}
	
	@Test
	public void deveRetornarRespostaEStatusCorretos_QuandoConsultarClienteExistente() {
				
		RestAssured.given()
			.pathParam("id", 2)
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get("/{id}")
		.then()
			.statusCode(HttpStatus.OK.value())
			.body("nome", Matchers.equalTo("Aparecida"));
	}
	
	@Test
	public void deveRetornarStatus201_QuandoCadastrarCliente() {
		RestAssured.given()
			.basePath("/estado")
			.port(port)
			.body("{ \"nome\": \"São Paulo\" }")
			.contentType(ContentType.JSON)
			.accept(ContentType.JSON)
		.when()
			.post()
		.then()
			.statusCode(HttpStatus.CREATED.value());
	}
}