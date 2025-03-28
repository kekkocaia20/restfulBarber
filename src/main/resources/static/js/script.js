document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#dataPrenotazione", {
        dateFormat: "Y-m-d",
        minDate: "today", // Imposta il minimo come oggi
        disable: [
            function(date) {
                // Disabilita domenica (0) e lunedì (1)
                return date.getDay() === 0 || date.getDay() === 1;
            }
        ],
        locale: {
            firstDayOfWeek: 1, // Setta il lunedì come primo giorno della settimana
            weekdays: {
                shorthand: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
                longhand: [
                    "Domenica",
                    "Lunedì",
                    "Martedì",
                    "Mercoledì",
                    "Giovedì",
                    "Venerdì",
                    "Sabato"
                ]
            }
        },
        onChange: function(selectedDates, dateStr, instance) {
            // Quando l'utente seleziona una data, aggiorna gli orari prenotati
            aggiornaOrariPrenotati(dateStr);
        }
    });
});

function aggiornaOrariPrenotati(data) {
    // Fai una richiesta al server per ottenere gli orari prenotati per la data selezionata
    fetch('/orariPrenotati?dataPrenotazione=' + data)
        .then(response => response.json())
        .then(orariPrenotati => {
            // Ottieni il menu a tendina degli orari
            const selectOrari = document.querySelector('[name="orarioPrenotazione"]');
            // Rimuovi tutte le opzioni esistenti
            selectOrari.innerHTML = '';

            // Gli orari disponibili personalizzati (9:00-21:00 con intervalli di 30 minuti)
            const orariDisponibili = [
                "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
                "12:00", "12:30", "13:00", "15:00", "15:30", "16:00", 
                "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", 
                "19:30", "20:00", "20:30"
            ];

            // Se la data è oggi, calcoliamo l'orario attuale e rimuoviamo gli orari passati
            const today = new Date().toISOString().split('T')[0];
            if (data === today) {
                const currentHour = new Date().getHours();
                const currentMinute = new Date().getMinutes();
                const currentTime = currentHour * 60 + currentMinute;

                // Rimuove gli orari che sono passati rispetto all'orario attuale
                const orariDisponibiliOggi = orariDisponibili.filter(orario => {
                    const [hour, minute] = orario.split(':').map(Number);
                    const orarioInMinuti = hour * 60 + minute;
                    return orarioInMinuti > currentTime;
                });

                // Rimuove gli orari prenotati dalla lista
                const orariDisponibiliAggiornati = orariDisponibiliOggi.filter(orario => !orariPrenotati.includes(orario));

                aggiornaTendinaOrariDisponibili(orariDisponibiliAggiornati);
            } else {
                // Se non è oggi, rimuove solo gli orari prenotati
                const orariDisponibiliAggiornati = orariDisponibili.filter(orario => !orariPrenotati.includes(orario));
                aggiornaTendinaOrariDisponibili(orariDisponibiliAggiornati);
            }
        })
        .catch(error => console.error("Errore nel recuperare gli orari prenotati:", error));
}

function aggiornaTendinaOrariDisponibili(orariDisponibiliAggiornati) {
    // Aggiorna la tendina con gli orari disponibili
    const selectOrario = document.querySelector("[name='orarioPrenotazione']");
    selectOrario.innerHTML = ""; // Pulisce la tendina

    // Aggiungi i nuovi orari disponibili
    orariDisponibiliAggiornati.forEach(orario => {
        const option = document.createElement("option");
        option.value = orario;
        option.textContent = orario;
        selectOrario.appendChild(option);
    });
}


document.getElementById("prenotazioneForm").addEventListener("submit", function(event) {
    let valid = true;

    // Controllo nome (solo lettere e spazi, minimo 2 caratteri)
    let nome = document.getElementById("nome");
    let nomeError = document.getElementById("nomeError");
    let regexNome = /^[a-zA-Z\s]{2,}$/;  // Solo lettere e spazi, almeno 2 caratteri
    if (nome.value.trim() === "") {
        nome.classList.add("is-invalid");
        nomeError.textContent = "Il nome è obbligatorio.";
        nomeError.classList.remove("d-none");
        valid = false;
    } else if (!regexNome.test(nome.value.trim())) {
        nome.classList.add("is-invalid");
        nomeError.textContent = "Il nome deve contenere solo lettere.";
        nomeError.classList.remove("d-none");
        valid = false;
    } else {
        nome.classList.remove("is-invalid");
        nomeError.classList.add("d-none");
    }

    // Controllo cognome (solo lettere e spazi, minimo 2 caratteri)
    let cognome = document.getElementById("cognome");
    let cognomeError = document.getElementById("cognomeError");
    let regexCognome = /^[a-zA-Z\s]{2,}$/;  // Solo lettere e spazi, almeno 2 caratteri
    if (cognome.value.trim() === "") {
        cognome.classList.add("is-invalid");
        cognomeError.textContent = "Il cognome è obbligatorio.";
        cognomeError.classList.remove("d-none");
        valid = false;
    } else if (!regexCognome.test(cognome.value.trim())) {
        cognome.classList.add("is-invalid");
        cognomeError.textContent = "Il cognome deve contenere solo lettere.";
        cognomeError.classList.remove("d-none");
        valid = false;
    } else {
        cognome.classList.remove("is-invalid");
        cognomeError.classList.add("d-none");
    }

    // Controllo numero di telefono (esattamente 10 cifre)
    let numeroTelefono = document.getElementById("numeroTelefono");
    let numeroTelefonoError = document.getElementById("numeroTelefonoError");
    let regexTelefono = /^[0-9]{10}$/;  // Esattamente 10 numeri
    if (numeroTelefono.value.trim() === "") {
        numeroTelefono.classList.add("is-invalid");
        numeroTelefonoError.textContent = "Il numero di telefono è obbligatorio.";
        numeroTelefonoError.classList.remove("d-none");
        valid = false;
    } else if (!regexTelefono.test(numeroTelefono.value.trim())) {
        numeroTelefono.classList.add("is-invalid");
        numeroTelefonoError.textContent = "Il numero di telefono deve essere esattamente di 10 cifre.";
        numeroTelefonoError.classList.remove("d-none");
        valid = false;
    } else {
        numeroTelefono.classList.remove("is-invalid");
        numeroTelefonoError.classList.add("d-none");
    }

    // Controllo data prenotazione (formato data YYYY-MM-DD)
    let dataPrenotazione = document.getElementById("dataPrenotazione");
    let dataPrenotazioneError = document.getElementById("dataPrenotazioneError");
    let regexData = /^\d{4}-\d{2}-\d{2}$/;  // Formato data YYYY-MM-DD
    if (dataPrenotazione.value.trim() === "") {
        dataPrenotazione.classList.add("is-invalid");
        dataPrenotazioneError.textContent = "La data di prenotazione è obbligatoria.";
        dataPrenotazioneError.classList.remove("d-none");
        valid = false;
    } else if (!regexData.test(dataPrenotazione.value.trim())) {
        dataPrenotazione.classList.add("is-invalid");
        dataPrenotazioneError.textContent = "La data deve essere nel formato YYYY-MM-DD.";
        dataPrenotazioneError.classList.remove("d-none");
        valid = false;
    } else {
        dataPrenotazione.classList.remove("is-invalid");
        dataPrenotazioneError.classList.add("d-none");
    }

    // Controllo orario prenotazione (formato 09:00, 09:30, ..., 20:30)
    let orarioPrenotazione = document.getElementById("orarioPrenotazione");
    let orarioPrenotazioneError = document.getElementById("orarioPrenotazioneError");
    let regexOrario = /^(0[9]|1[0-9]|20):([0-3][0-9])$/;  // Orari tra 09:00 e 20:30
    if (orarioPrenotazione.value.trim() === "") {
        orarioPrenotazione.classList.add("is-invalid");
        orarioPrenotazioneError.textContent = "L'orario di prenotazione è obbligatorio.";
        orarioPrenotazioneError.classList.remove("d-none");
        valid = false;
    } else if (!regexOrario.test(orarioPrenotazione.value.trim())) {
        orarioPrenotazione.classList.add("is-invalid");
        orarioPrenotazioneError.textContent = "L'orario deve essere tra le 09:00 e le 20:30.";
        orarioPrenotazioneError.classList.remove("d-none");
        valid = false;
    } else {
        orarioPrenotazione.classList.remove("is-invalid");
        orarioPrenotazioneError.classList.add("d-none");
    }

    // Se almeno un campo non è valido, blocca l'invio del form
    if (!valid) {
        event.preventDefault();
    }
});
