package springPJrestfuls.restfulBarber.model;

import java.sql.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="prenotazione")
public class Utente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(length = 30, nullable = false)
	private String nome;
	
	@Column(length = 30, nullable = false)
	private String cognome;
	
	@Column(length = 10, nullable = false)
	private String numeroTelefono;
	
	@Column(nullable = false)
	private Date dataPrenotazione;
	
	@Column(length = 30, nullable = false)
	private String orarioPrenotazione;
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;	
	}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getCognome() {
		return cognome;
	}
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	
	public String getNumeroTelefono() {
		return numeroTelefono;
	}
	public void setNumeroTelefono(String numeroTelefono) {
		this.numeroTelefono = numeroTelefono;
	}
	
	public Date getDataPrenotazione() {
		return dataPrenotazione;
	}
	public void setDataPrenotazione(Date dataPrenotazione) {
		this.dataPrenotazione = dataPrenotazione;
	}
	
	public String getOrarioPrenotazione() {
		return orarioPrenotazione;
	}
	public void setOrarioPrenotazione(String orarioPrenotazione) {
		this.orarioPrenotazione = orarioPrenotazione;
	}
	

}
