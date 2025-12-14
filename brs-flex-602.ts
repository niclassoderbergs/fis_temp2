
import { BRSData } from './types';
import { content602Input, content602Output } from './content-definitions';

export const brsFlex602: BRSData = {
  id: "BRS-FLEX-602",
  title: "Begär CU-mätvärden",
  purpose: "Möjliggör för SP eller behörig systemfunktion att hämta lagrade mätvärden för en resurs.",
  actors: [
    { role: "Initiator", description: "SP eller System" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-602: Begär Mätdata
    participant Req as SP/System
    participant FIS as Flexibilitetsregistret

    Req->>FIS: GetMeterData (CU-ID, Period)
    activate FIS
    FIS->>FIS: Hämta tidsserie
    FIS-->>Req: MeterDataResponse (Värden)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX602-1", description: "Aktör begär mätdata för en period." },
    { id: "BRSFLEX602-2", description: "FIS returnerar lagrad tidsserie." }
  ],
  preConditions: [],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX602-POST-1", description: "Data returnerad." }
    ],
    rejected: [
      { id: "BRSFLEX602-POST-2", description: "Ingen data funnen." }
    ]
  },
  infoObjects: [content602Input, content602Output]
};
