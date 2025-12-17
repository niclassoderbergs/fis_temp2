
import { BRSData } from '../../types';
import { content602Input, content602Output } from '../../content-definitions';

export const brsFlex602: BRSData = {
  id: "BRS-FLEX-602",
  title: "Begär CU-mätvärden",
  purpose: "Möjliggör för SP eller behörig systemfunktion att hämta lagrade mätvärden för en resurs.",
  actors: [
    { role: "Initiator", description: "SP eller System" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-602: Begär Mätdata
    participant Req as SP/System
    participant FIS as FIS

    Req->>FIS: GetMeterData (CU-ID, Period)
    activate FIS
    FIS->>FIS: Validera behörighet
    
    alt Behörig och Data finns
        FIS->>FIS: Hämta tidsserie
        FIS-->>Req: MeterDataResponse (Värden)
    else Ej behörig eller Tomt
        FIS-->>Req: Error / Empty
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX602-1", description: "En aktör har begärt mätvärden för en styrbar enhet (CU)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX602-2", description: "FIS har returnerat efterfrågade mätvärden." }
    ],
    rejected: [
      { id: "BRSFLEX602-3", description: "Ingen data funnen." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX602-7", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_602_CU_NOT_FOUND" },
    { id: "BRSFLEX602-9", description: "Slutdatum för perioden måste vara senare än startdatum.", errorCode: "E_GEN_INVALID_PERIOD" }
  ],
  process: [
    { id: "BRSFLEX602-4", description: "Aktör begär mätvärden för en styrbar enhet (CU)." },
    { id: "BRSFLEX602-5", description: "FIS skickar mätvärdena till aktören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX602-6", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content602Input, content602Output]
};
