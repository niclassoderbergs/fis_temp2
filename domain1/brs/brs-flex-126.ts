
import { BRSData } from '../../types';
import { content126Input, content126Output } from '../../content-definitions';

export const brsFlex126: BRSData = {
  id: "BRS-FLEX-126",
  title: "Begär SPG information",
  purpose: "Möjliggör för behöriga aktörer att hämta aktuell information om en SPG, inklusive status och aggregerad kapacitet.",
  actors: [
    { role: "Initiator", description: "SP eller Behörig Part" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-126: Begär SPG information
    participant Req as SP
    participant FIS as FIS

    Req->>FIS: GetSPGInfo (SPG-ID)
    activate FIS
    FIS->>FIS: Validera behörighet
    FIS-->>Req: SPGData (Status, Elområde, Kapacitet)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX126-1", description: "En aktör har begärt information om en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX126-2", description: "FIS har returnerat SPG-information." }
    ],
    rejected: [
      { id: "BRSFLEX126-3", description: "Ingen information returnerad (behörighet/ej hittad)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX126-4", description: "SP måste äga SPG:n för att se fullständig information.", errorCode: "E_126_UNAUTHORIZED" }
  ],
  process: [
    { id: "BRSFLEX126-5", description: "Aktör begär information om en SPG." },
    { id: "BRSFLEX126-6", description: "FIS returnerar datan." }
  ],
  infoObjects: [content126Input, content126Output]
};
