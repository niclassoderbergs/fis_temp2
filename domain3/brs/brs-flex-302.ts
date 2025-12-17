
import { BRSData } from '../../types';
import { content302Input, content302Output } from '../../content-definitions';

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
    participant FIS as FIS

    Requester->>FIS: FindProducts (Filter)
    activate FIS
    FIS->>FIS: Sök i produktkatalog
    FIS-->>Requester: ProductList (ID, Namn)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX302-1", description: "En aktör har begärt en lista över tillgängliga marknadsprodukter." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX302-2", description: "FIS har returnerat en lista över tillgängliga marknadsprodukter." }
    ],
    rejected: [
      { id: "BRSFLEX302-3", description: "Ingen data returnerad (t.ex. tomt sökresultat)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX302-4", description: "Aktör begär en lista över tillgängliga marknadsprodukter." },
    { id: "BRSFLEX302-5", description: "Flexibilitetsregistret skickar listan till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX302-6", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content302Input, content302Output]
};
