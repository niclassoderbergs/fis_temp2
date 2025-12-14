
import { BRSData } from './types';
import { content141Input, content141Output } from './content-definitions';

export const brsFlex141: BRSData = {
  id: "BRS-FLEX-141",
  title: "SP tar bort CU från SPG",
  purpose: "Att ta bort en CU ur portföljen (SPG).",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-141: SP tar bort CU från SPG
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: UnlinkCUfromSPG (SPG-ID, CU-ID, Slutdatum)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Ta bort relation
        FIS-->>SP: Ack (Startdatum, Slutdatum)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX141-8", description: "SP tar bort en resurs från portföljen och anger slutdatum." },
    { id: "BRSFLEX141-9", description: "FIS returnerar kvittens med SPG-ID, CU-ID, samt start- och slutdatum för perioden." }
  ],
  preConditions: [
    { id: "BRSFLEX141-1", description: "SP vill ta bort en CU från en SPG." }
  ],
  businessRules: [
    { id: "BRSFLEX141-5", description: "Relationen måste existera.", errorCode: "E_141_NO_RELATION" },
    { id: "BRSFLEX141-6", description: "CU får inte vara en del av ett aktivt bud i marknadsmodulen.", errorCode: "E_141_RESOURCE_LOCKED" },
    { id: "BRSFLEX141-7", description: "Slutdatum måste anges och vara giltigt.", errorCode: "E_141_INVALID_DATE" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX141-2", description: "CU har tagits bort från SPG." },
      { id: "BRSFLEX141-3", description: "SP har mottagit en positiv kvittens." }
    ],
    rejected: [
      { id: "BRSFLEX141-4", description: "Ingen ändring har skett." }
    ]
  },
  infoObjects: [content141Input, content141Output]
};
