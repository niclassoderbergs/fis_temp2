
import { BRSData } from './types';
import { content305Input, content305Output } from './content-definitions';

export const brsFlex305: BRSData = {
  id: "BRS-FLEX-305",
  title: "Hämta Produktdetaljer",
  purpose: "Att hämta fullständig teknisk specifikation och attribut för en specifik produkt baserat på Produkt-ID.",
  actors: [
    { role: "Initiator", description: "SP eller FIS" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-305: Hämta Produktdetaljer
    participant Requester as SP/FIS
    participant FIS as Flexibilitetsregistret

    Requester->>FIS: GetProductDetails (Produkt-ID)
    activate FIS
    FIS->>FIS: Validera Produkt-ID
    FIS->>FIS: Hämta attribut
    FIS-->>Requester: ProductDetails (Alla attribut)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX305-10", description: "Aktören begär detaljer för en specifik produkt genom att ange dess ID." },
    { id: "BRSFLEX305-11", description: "FIS hämtar komplett data för produkten." },
    { id: "BRSFLEX305-12", description: "FIS returnerar samtliga registrerade attribut (t.ex. responstider, riktning, krav)." }
  ],
  preConditions: [
    { id: "BRSFLEX305-1", description: "Aktör har ett Produkt-ID (t.ex. från BRS-FLEX-302) och vill se detaljer." }
  ],
  businessRules: [
    { id: "BRSFLEX305-6", description: "Angivet Produkt-ID måste existera.", errorCode: "E_305_NOT_FOUND" },
    { id: "BRSFLEX305-7", description: "Anropande part måste vara autentiserad.", errorCode: "E_305_UNAUTHORIZED" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX305-2", description: "Produktdetaljer har returnerats." }
    ],
    rejected: [
      { id: "BRSFLEX305-3", description: "Produkt ej hittad eller behörighet saknas." }
    ]
  },
  infoObjects: [content305Input, content305Output]
};
