
import { BRSData } from './types';
import { content503Input, content503Output } from './content-definitions';

export const brsFlex503: BRSData = {
  id: "BRS-FLEX-503",
  title: "Registrera CU-mätvärden",
  purpose: "SP rapporterar uppmätt data från enheten (Sub-metering) för verifiering. Detta krävs när huvudmätaren (från DHV) inte ger tillräcklig upplösning eller avser en större anläggning än själva flexibilitetsresursen.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-503: Registrera Mätvärden
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: SubmitMeterData (CU, Värden)
    activate FIS
    FIS->>FIS: Validera CU och Flexavtal
    FIS->>FIS: Validera upplösning och period
    FIS->>FIS: Lagra mätvärden
    FIS-->>SP: Ack
    deactivate FIS`,
  process: [
    "SP samlar in data från undermätare.",
    "SP skickar tidsserier till FIS.",
    "FIS validerar att CU existerar och att SP har ett giltigt avtal för perioden.",
    "FIS lagrar värdena kopplat till CU."
  ],
  preConditions: [
    "SP vill registrera mätvärden för en CU."
  ],
  businessRules: [
    { id: "Regel 1", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_503_CU_NOT_FOUND" },
    { id: "Regel 2", description: "SP måste ha ett aktivt flexavtal för resursen som täcker den tidsperiod mätvärdena avser.", errorCode: "E_503_NO_AGREEMENT" },
    { id: "Regel 3", description: "Tidsserier måste matcha upplösningen i produkten (t.ex. 15 min eller 1 timme).", errorCode: "E_503_INVALID_RESOLUTION" },
    { id: "Regel 4", description: "Mätvärden får inte överstiga registrerad maximal kapacitet (varningsflagga).", errorCode: "W_503_CAPACITY_EXCEEDED" }
  ],
  postConditions: {
    accepted: [
      { id: "BRS-FLEX-503-POST-1", description: "Mätvärden har lagrats." }
    ],
    rejected: [
      { id: "BRS-FLEX-503-POST-2", description: "Data avvisad." }
    ]
  },
  infoObjects: [content503Input, content503Output]
};
