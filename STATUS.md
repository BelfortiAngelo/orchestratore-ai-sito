# STATUS — OrchestratoreAI Sito

**Ultimo aggiornamento:** 2026-06-02
**Sessioni totali:** 5

## Stato attuale
Sito live con 4 guide pubblicate. Form email funzionante con raccolta contatti su Brevo e mail di benvenuto automatica attiva.

## Ultima sessione (2026-06-02)
**Fatto:**
- Collegato form email a Brevo (lista "Startr kit", ID 5) via funzione Vercel `/api/subscribe.js`
- API key Brevo salvata come variabile d'ambiente su Vercel (sicura, non nel codice)
- Automazione "Welcome message" attiva su Brevo → mail di benvenuto recapitata correttamente
- Rimosso Kit.com (troppo complesso per il caso d'uso)

**Da sistemare (piccole cose):**
- Rimuovere "Hey, benvenuta/o a bordo!" dall'email (testo default Brevo — Automations → Welcome message → editor email)
- Completare link nel P.S. con URL intero: orchestratore-ai-sito.vercel.app

**Bloccato su:**
- Analytics da abilitare su Vercel dashboard (vercel.com → progetto → Analytics → Enable)
- Starter Kit non ancora impacchettato come file scaricabile

## Prossimo step
Brevo → Automations → "Welcome message" → editor email → rimuovi "Hey, benvenuta/o a bordo!" e completa il link nel P.S.

## Comandi git (da usare ogni volta)
```
git add .
git commit -m "descrizione modifica"
git push
```

## Storico sessioni
| Data | Fatto | Prossimo step |
|------|-------|---------------|
| 2026-05-23 | Guida MCP live, post pubblicato, card immagine creata | Enable Analytics su Vercel |
| 2026-05-19 | Analytics CDN, MCP card bloccata, badge "In uscita", push GitHub | Pubblica post annuncio + Enable Analytics |
| 2026-05-17 | Sito completo + deploy Vercel + 3 guide pages | Collegare Kit.com al form email |
| 2026-05-12 | Claude Design → file corretti, struttura sito, popup benvenuto | Fix app.jsx con dati reali |
