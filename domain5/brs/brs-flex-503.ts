
import { BRSData } from '../../types';
import { content503Input, content503Output } from '../../content-definitions';

export const brsFlex503: BRSData = {
  id: "BRS-FLEX-503",
  title: "Begär detaljerad baselinemetod information",
  purpose: "Hämtar den tekniska specifikationen för en metod, inklusive vilka parametrar som krävs vid konfiguration.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-503: Hämta Metoddetaljer
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: GetBaselineMethodDetails (Metod-ID)
    activate FIS
    FIS->>FIS: Hämta definition
    FIS-->>SP: MethodDetails (Namn, Parametrar, Beskrivning)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX503-1", description: "En SP har begärt detaljerad information om en baselinemetod." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX503-2", description: "FIS har returnerat detaljerad metodinformation." }
    ],
    rejected: [
      { id: "BRSFLEX503-3", description: "Metod hittades ej." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX503-4", description: "Metod-ID måste existera.", errorCode: "E_503_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX503-5", description: "SP begär detaljerad information om en specifik baselinemetod." },
    { id: "BRSFLEX503-6", description: "FIS skickar metodinformationen till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX503-7", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content503Input, content503Output]
};
