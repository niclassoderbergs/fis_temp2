
import { BRSData } from './types';
import { content302Input, content302Output } from './content-definitions';

export const brsFlex302: BRSData = {
  id: "BRS-FLEX-302",
  title: "Lista registrerade marknadsprodukter",
  purpose: "Möjliggör för aktörer att söka fram och lista tillgängliga produkter i systemet för att få en överblick (id och namn). För detaljer används BRS-FLEX-303.",
  actors: [
    { role: "Initiator", description: "SP eller FIS" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-302: Lista registrerade marknadsprodukter
    participant Requester as SP/FIS
    participant FIS as Flexibilitetsregistret

    Requester->>FIS: FindProducts (Filter)
    activate FIS
    FIS->>FIS: Sök i produktkatalog
    FIS-->>Requester: ProductList (ID, Namn)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX302-10", description: "Aktören skickar en sökfråga (kan vara tom för att lista alla)." },
    { id: "BRSFLEX302-11", description: "FIS söker fram produkter som matchar filtret." },
    { id: "BRSFLEX302-12", description: "FIS returnerar en lista med grundläggande info (ID och Namn) för varje produkt." }
  ],
  preConditions: [
    { id: "BRSFLEX302-1", description: "Aktör vill se lista på tillgängliga marknadsprodukter." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX302-2", description: "En lista på produkter har returnerats." }
    ],
    rejected: [
      { id: "BRSFLEX302-3", description: "Ingen data returnerad (t.ex. tomt sökresultat)." }
    ]
  },
  infoObjects: [content302Input, content302Output]
};
