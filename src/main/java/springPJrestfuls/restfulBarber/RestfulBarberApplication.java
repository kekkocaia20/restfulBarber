package springPJrestfuls.restfulBarber;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestfulBarberApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestfulBarberApplication.class, args);
		System.out.println("ciao sono nella porta 8092");
	}
}
