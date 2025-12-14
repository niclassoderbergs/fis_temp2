
import { BRSData } from './types';
import { content503Input, content503Output } from './content-definitions';

export const brsFlex503: BRSData = {
  id: "BRS-FLEX-503",
  title: "Begär detaljerad baselinemetod information",
  purpose: "Hämtar den tekniska specifikationen för en metod, inklusive vilka parametrar som krävs vid konfiguration.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-503: Hämta Metoddetaljer
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: GetBaselineMethodDetails (Metod-ID)
    activate FIS
    FIS->>FIS: Hämta definition
    FIS-->>SP: MethodDetails (Namn, Parametrar, Beskrivning)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX503-1", description: "SP begär detaljer för en specifik metod." },
    { id: "BRSFLEX503-2", description: "FIS returnerar fullständig information inklusive parameterdefinitioner." }
  ],
  preConditions: [
    { id: "BRSFLEX503-PRE-1", description: "SP har ett Metod-ID." }
  ],
  businessRules: [
    { id: "BRSFLEX503-BR-1", description: "Metod-ID måste existera.", errorCode: "E_503_NOT_FOUND" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX503-POST-1", description: "Detaljer returnerade." }
    ],
    rejected: [
      { id: "BRSFLEX503-POST-2", description: "Metod hittades ej." }
    ]
  },
  infoObjects: [content503Input, content503Output]
};
