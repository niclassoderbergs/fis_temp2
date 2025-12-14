
import { BRSData } from './types';
import { content601Input, content601Output } from './content-definitions';

export const brsFlex601: BRSData = {
  id: "BRS-FLEX-601",
  title: "SP registrerar CU-mätvärden",
  purpose: "SP rapporterar uppmätt data från enheten (Sub-metering) för verifiering. Detta krävs när huvudmätaren (från DHV) inte ger tillräcklig upplösning eller avser en större anläggning än själva flexibilitetsresursen.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-601: SP registrerar CU-mätvärden
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
    { id: "BRSFLEX601-1", description: "SP samlar in data från undermätare." },
    { id: "BRSFLEX601-2", description: "SP skickar tidsserier till FIS." },
    { id: "BRSFLEX601-3", description: "FIS validerar att CU existerar och att SP har ett giltigt avtal för perioden." },
    { id: "BRSFLEX601-4", description: "FIS lagrar värdena kopplat till CU." }
  ],
  preConditions: [
    { id: "BRSFLEX601-PRE-1", description: "SP vill registrera mätvärden för en CU." }
  ],
  businessRules: [
    { id: "BRSFLEX601-BR-1", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_601_CU_NOT_FOUND" },
    { id: "BRSFLEX601-BR-2", description: "SP måste ha ett aktivt flexavtal för resursen som täcker den tidsperiod mätvärdena avser.", errorCode: "E_601_NO_AGREEMENT" },
    { id: "BRSFLEX601-BR-3", description: "Tidsserier måste matcha upplösningen i produkten (t.ex. 15 min eller 1 timme).", errorCode: "E_601_INVALID_RESOLUTION" },
    { id: "BRSFLEX601-BR-4", description: "Mätvärden får inte överstiga registrerad maximal kapacitet (varningsflagga).", errorCode: "W_601_CAPACITY_EXCEEDED" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX601-POST-1", description: "Mätvärden har lagrats." }
    ],
    rejected: [
      { id: "BRSFLEX601-POST-2", description: "Data avvisad." }
    ]
  },
  infoObjects: [content601Input, content601Output]
};
