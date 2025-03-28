package springPJrestfuls.restfulBarber.controller;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import springPJrestfuls.restfulBarber.model.Utente;
import springPJrestfuls.restfulBarber.repository.IRepoPrenotazione;

@Controller
public class GestoreConnesioni {

    @Autowired
    private IRepoPrenotazione iru;
    
    @GetMapping("/")  // Per rendere questa la home page
    public String showIndexPage() {
        return "index";
    }
    
    @GetMapping("/prenotazione")
    public String showPrenotazionePage(@RequestParam(required = false) String dataPrenotazione, Model model) {
        // Recupera tutte le prenotazioni dal database
        List<Utente> utenti = iru.findAll();

        // Crea una mappa che associa ogni data agli orari prenotati
        Map<String, List<String>> orariPerData = utenti.stream()
            .collect(Collectors.groupingBy(utente -> utente.getDataPrenotazione().toString(), 
                Collectors.mapping(Utente::getOrarioPrenotazione, Collectors.toList())));

        // Se una data è selezionata, recupera gli orari prenotati per quella data, altrimenti prendi tutti
        List<String> orariPrenotati = dataPrenotazione != null ? orariPerData.getOrDefault(dataPrenotazione, new ArrayList<>()) : new ArrayList<>();

        // Passa gli orari prenotati al template
        model.addAttribute("orariPrenotati", orariPrenotati);

        // Gli orari disponibili (hardcoded)
        List<String> orariDisponibili = List.of("09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
                                                "12:00", "12:30", "13:00", "15:00", "15:30", "16:00", 
                                                "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", 
                                                "19:30", "20:00", "20:30");

        model.addAttribute("orariDisponibili", orariDisponibili);
        model.addAttribute("dataPrenotazione", dataPrenotazione); // Aggiungi la data al modello

        return "prenotazione"; // Ritorna alla pagina di prenotazione
    }

    
    @GetMapping("/orariPrenotati")
    public ResponseEntity<List<String>> getOrariPrenotati(@RequestParam String dataPrenotazione) {
        List<Utente> utenti = iru.findAll();

        // Crea una mappa che associa ogni data agli orari prenotati
        Map<String, List<String>> orariPerData = utenti.stream()
            .collect(Collectors.groupingBy(utente -> utente.getDataPrenotazione().toString(),
                Collectors.mapping(Utente::getOrarioPrenotazione, Collectors.toList())));

        // Ottieni gli orari prenotati per la data richiesta
        List<String> orariPrenotati = orariPerData.getOrDefault(dataPrenotazione, new ArrayList<>());

        // Restituisci la lista degli orari prenotati in formato JSON
        return ResponseEntity.ok(orariPrenotati);
    }


    @PostMapping("/prenotazione")
    public String salvaPrenotazione(@ModelAttribute Utente utente, Model model) {
        // Assicurati che la data prenotata sia quella selezionata e non la data attuale
        String dataPrenotazione = utente.getDataPrenotazione().toString();
        
        // Salva la prenotazione nel database
        iru.save(utente);

        // Verifica se la prenotazione è stata salvata correttamente
        model.addAttribute("nome", utente.getNome()); // Aggiungi la data al modello per feedback
        model.addAttribute("cognome", utente.getCognome()); // Aggiungi la data al modello per feedback
        model.addAttribute("dataPrenotazione", dataPrenotazione); // Aggiungi la data al modello per feedback
        model.addAttribute("orarioPrenotazione", utente.getOrarioPrenotazione()); // Aggiungi la data al modello per feedback
        return "succes"; // Ritorna alla pagina di prenotazione con il messaggio di successo
    }
    
    
    @GetMapping("/readAll")
    public String readAll(@RequestParam(value = "data", required = false) String data, Model model) {
        List<Utente> utenti;

        if (data != null && !data.isEmpty()) {
            // Se la data è presente, convertila in un oggetto java.sql.Date
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date dataPrenotazione = null;

            try {
                // Converte la stringa in java.util.Date
                dataPrenotazione = dateFormat.parse(data);

                // Converti java.util.Date in java.sql.Date
                java.sql.Date sqlDate = new java.sql.Date(dataPrenotazione.getTime());

                // Filtra gli utenti per quella data
                utenti = iru.findByDataPrenotazione(sqlDate);
                if (utenti.isEmpty()) {
                    model.addAttribute("message", "Nessun utente trovato per questa data.");
                }
            } catch (ParseException e) {
                e.printStackTrace();
                utenti = iru.findAll(); // In caso di errore nel parsing, mostra tutti gli utenti
            }
        } else {
            // Se la data non è presente, mostra tutti gli utenti
            utenti = iru.findAll();
        }

        // Ordina gli utenti per orarioPrenotazione se la lista non è vuota
        if (utenti != null && !utenti.isEmpty()) {
            utenti.sort(Comparator.comparing(Utente::getOrarioPrenotazione)); // Ordina in base all'orario
        }

        model.addAttribute("utenti", utenti); // Aggiungi gli utenti al modello
        model.addAttribute("data", data); // Passa la data al modello per mantenere la casella di ricerca
        return "tabella"; // Restituisci la vista "tabella"
    }

    
    @GetMapping("/delete")
    public String delete(@RequestParam int id) {
        iru.deleteById(id);
        return "tabella";
    }


}





