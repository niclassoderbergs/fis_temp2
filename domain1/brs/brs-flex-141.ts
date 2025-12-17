
import { BRSData } from '../../types';
import { content141Input, content141Output } from '../../content-definitions';

export const brsFlex141: BRSData = {
  id: "BRS-FLEX-141",
  title: "SP tar bort CU från SPG",
  purpose: "Processen används av en Service Provider (SP) för att koppla bort en styrbar enhet (CU) från en Service Providing Group (SPG). Detta är nödvändigt när en resurs ska flyttas till en annan portfölj, tas ur drift, eller inte längre ska ingå i den aggregerade budgivningen för den specifika gruppen.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-141: SP tar bort CU från SPG
    participant SP as SP
    participant FIS as FIS

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
  preConditions: [
    { id: "BRSFLEX141-1", description: "En SP har tagit bort en styrbar enhet från en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX141-2", description: "FIS har avslutat kopplingen mellan den styrbara enheten och SPG:n." }
    ],
    rejected: [
      { id: "BRSFLEX141-3", description: "Ingen ändring har skett." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX141-4", description: "Relationen måste existera.", errorCode: "E_141_NO_RELATION" },
    { id: "BRSFLEX141-5", description: "CU får inte vara en del av ett aktivt bud i marknadsmodulen.", errorCode: "E_141_RESOURCE_LOCKED" },
    { id: "BRSFLEX141-6", description: "Slutdatum måste anges och vara giltigt.", errorCode: "E_141_INVALID_DATE" }
  ],
  process: [
    { id: "BRSFLEX141-7", description: "SP begär bortkoppling av en CU från en SPG." },
    { id: "BRSFLEX141-8", description: "FIS bekräftar bortkopplingen till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX141-9", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content141Input, content141Output]
};
