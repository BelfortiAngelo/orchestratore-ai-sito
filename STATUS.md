# STATUS — OrchestratoreAI Sito

**Ultimo aggiornamento:** 2026-05-17
**Sessioni totali:** 2

## Stato attuale
Sito live su Vercel con homepage, popup benvenuto, 3 guide complete e 3 in arrivo.

## Ultima sessione (2026-05-17)
**Fatto:**
- Creato app.jsx con dati reali (sostituiti tutti i dati falsi di Claude Design)
- Aggiunto popup benvenuto con nome visitatore (localStorage, confetti, backdrop blur)
- Riscritte tutte le descrizioni guide con contenuto reale dai post LinkedIn pubblicati
- Aggiornato Starter Kit con contenuto reale (CLAUDE.md + PARA + 3 skill)
- Bottone kit cambiato in "Avvisami quando esce" (onesto — kit non ancora pronto)
- Creato guide.css per layout pagine guida
- Create 3 pagine guida complete: guida-sicurezza.html, guida-manifest.html, guida-mcp-vs-cli.html
- Guide card collegate alle pagine guida via href
- Deploy su Vercel tramite GitHub (repo: BelfortiAngelo/orchestratore-ai-sito)
- Corretto URL LinkedIn in tutti i file (era angelobelforti, è angelo-belforti-6a31891a8)

**Scoperto:**
- GitHub MCP funziona solo in Claude Code CLI, non nella chat principale
- Il flusso git per aggiornare Vercel è: git add . → git commit -m "msg" → git push
- Username GitHub: BelfortiAngelo
- URL LinkedIn corretto: https://www.linkedin.com/in/angelo-belforti-6a31891a8/

**Bloccato su:**
- Form email non collegato a Kit.com (bottone "Avvisami" non invia niente)
- Starter Kit non ancora pacchettizzato (file esistono ma non sono pronti da distribuire)
- Dominio personalizzato non ancora configurato

## Prossimo step
Collegare il form email dello Starter Kit a Kit.com — crea account Kit.com, crea form, sostituisci il form finto con l'embed reale.

## Comandi git (da usare ogni volta)
```
git add .
git commit -m "descrizione modifica"
git push
```

## Storico sessioni
| Data | Fatto | Prossimo step |
|------|-------|---------------|
| 2026-05-17 | Sito completo + deploy Vercel + 3 guide pages | Collegare Kit.com al form email |
| 2026-05-12 | Claude Design → file corretti, struttura sito, popup benvenuto | Fix app.jsx con dati reali |
