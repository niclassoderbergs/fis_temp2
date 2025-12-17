
import { BRSData } from '../../types';
import { content303Input, content303Output } from '../../content-definitions';

export const brsFlex303: BRSData = {
  id: "BRS-FLEX-303",
  title: "Begär detaljerad produktinfo",
  purpose: "Att hämta fullständig teknisk specifikation och attribut för en specifik produkt baserat på Produkt-ID.",
  actors: [
    { role: "Initiator", description: "SP eller FIS" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-303: Begär detaljerad produktinfo
    participant Requester as SP/FIS
    participant FIS as FIS

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
  preConditions: [
    { id: "BRSFLEX303-1", description: "En aktör har begärt detaljerad information om en marknadsprodukt." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX303-2", description: "FIS har returnerat detaljerad information om marknadsprodukten." }
    ],
    rejected: [
      { id: "BRSFLEX303-3", description: "Produkt ej hittad eller behörighet saknas." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX303-4", description: "Angivet Produkt-ID måste existera.", errorCode: "E_303_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX303-5", description: "Aktör begär detaljerad information om en specifik marknadsprodukt." },
    { id: "BRSFLEX303-6", description: "Flexibilitetsregistret skickar produktinformationen till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX303-7", description: "Flexibilitetsregistret returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content303Input, content303Output]
};
