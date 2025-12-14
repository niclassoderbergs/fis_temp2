
import { BRSData } from './types';
import { content303Input, content303Output } from './content-definitions';

export const brsFlex303: BRSData = {
  id: "BRS-FLEX-303",
  title: "Begär detaljerad marknadsprodukt information",
  purpose: "Att hämta fullständig teknisk specifikation och attribut för en specifik produkt baserat på Produkt-ID.",
  actors: [
    { role: "Initiator", description: "SP eller FIS" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-303: Begär detaljerad marknadsprodukt information
    participant Requester as SP/FIS
    participant FIS as Flexibilitetsregistret

    Requester->>FIS: GetProductDetails (Produkt-ID)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Hämta attribut
        FIS-->>Requester: ProductDetails (Alla attribut)
    else Validering Fel
        FIS-->>Requester: Error (Not Found)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX303-10", description: "Aktören begär detaljer för en specifik produkt genom att ange dess ID." },
    { id: "BRSFLEX303-11", description: "FIS hämtar komplett data för produkten." },
    { id: "BRSFLEX303-12", description: "FIS returnerar samtliga registrerade attribut (t.ex. responstider, riktning, krav)." }
  ],
  preConditions: [
    { id: "BRSFLEX303-1", description: "Aktör har ett Produkt-ID (t.ex. från BRS-FLEX-302) och vill se detaljer." }
  ],
  businessRules: [
    { id: "BRSFLEX303-6", description: "Angivet Produkt-ID måste existera.", errorCode: "E_303_NOT_FOUND" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX303-2", description: "Produktdetaljer har returnerats." }
    ],
    rejected: [
      { id: "BRSFLEX303-3", description: "Produkt ej hittad eller behörighet saknas." }
    ]
  },
  infoObjects: [content303Input, content303Output]
};
