package springPJrestfuls.restfulBarber.repository;



import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springPJrestfuls.restfulBarber.model.Utente;

@Repository
public interface IRepoPrenotazione extends JpaRepository<Utente, Integer> {
	List<Utente> findByDataPrenotazione(Date dataPrenotazione);
}

