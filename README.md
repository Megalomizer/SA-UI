## Opzetten Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Werking van PoC

1. Heb de 2 Diagram Engines draaiende via Docker
2. Door een beschrijving in te vullen en vervolgens een diagram te genereren wordt de beschrijving in de diagram geplaatst
3. De URL kan aan de rechter kant veranderd worden naar de url om de 2e Diagram engine te bereiken. Dit is `http://localhost:7000/`
4. Door nogmaals een diagram te genereren wordt een andere diagram gegenereerd ten opzichte van de 1e Diagram engine. Hiermee is het verschil te zien van welke actief is.
5. Door een url in te voeren die niet doorlinkt naar een diagram engine en vervolgens een diagram te genereren, wordt er een foutmelding gegeven en de url terug gezet naar de standaard diagram engine op localhost:8000