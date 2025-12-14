
import { BRSData } from './types';
import { content131Input, content131Output } from './content-definitions';

export const brsFlex131: BRSData = {
  id: "BRS-FLEX-131",
  title: "SP tar bort CU från SPU",
  purpose: "Att ta bort en CU från en SPU. Detta bryter kopplingen mellan resursen och aggregeringsenheten.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-131: SP tar bort CU från SPU
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: UnlinkCUfromSPU (SPU-ID, CU-ID, Slutdatum)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Ta bort relation
        FIS->>FIS: Räkna om kapacitet
        FIS-->>SP: UnlinkAcknowledgement (Startdatum, Slutdatum)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX131-9", description: "SP begär att ta bort en CU från en SPU och anger slutdatum för kopplingen." },
    { id: "BRSFLEX131-10", description: "FIS kontrollerar om SPU:n deltar i en aktiv marknadsprocess (gate closure)." },
    { id: "BRSFLEX131-11", description: "Om tillåtet tas relationen bort och SPU:ns kapacitet räknas ned." },
    { id: "BRSFLEX131-12", description: "FIS returnerar kvittens med SPU-ID, CU-ID, samt start- och slutdatum för perioden." }
  ],
  preConditions: [
    { id: "BRSFLEX131-1", description: "SP vill ta bort en CU från en SPU." }
  ],
  businessRules: [
    { id: "BRSFLEX131-6", description: "Relationen mellan CU och SPU måste existera.", errorCode: "E_131_NO_RELATION" },
    { id: "BRSFLEX131-7", description: "SPU får inte vara låst i ett aktivt bud för stunden.", errorCode: "E_131_RESOURCE_LOCKED" },
    { id: "BRSFLEX131-8", description: "Slutdatum måste anges och vara giltigt.", errorCode: "E_131_INVALID_DATE" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX131-2", description: "Relationen mellan CU och SPU har tagits bort." },
      { id: "BRSFLEX131-3", description: "SPU:ns aggregerade kapacitet har räknats ned." },
      { id: "BRSFLEX131-4", description: "SP har mottagit en positiv kvittens." }
    ],
    rejected: [
      { id: "BRSFLEX131-5", description: "Relationen kvarstår." }
    ]
  },
  infoObjects: [content131Input, content131Output]
};
