
import { BRSData } from '../../types';
import { content110Input, content110Output } from '../../content-definitions';

export const brsFlex110: BRSData = {
  id: "BRS-FLEX-110",
  title: "SP registrerar SPU",
  purpose: "Att skapa en ny SPU-identitet (Service Providing Unit) i systemet. Detta moment skapar endast behållaren med metadata. Koppling av resurser sker i separata processer.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-110: SP registrerar SPU
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: RegisterSPU (Namn, Elområde)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Skapa SPU-objekt (Status: Available)
        FIS-->>SP: RegisterSPUAcknowledgement (SPU-ID, Namn, Elområde)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX110-1", description: "En SP har registrerat en Service Providing Unit (SPU)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX110-2", description: "FIS har registrerat en ny Service Providing Unit (SPU)." },
      { id: "BRSFLEX110-3", description: "SP har mottagit kvittens med SPU-ID." }
    ],
    rejected: [
      { id: "BRSFLEX110-4", description: "Inget SPU-objekt har skapats." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX110-5", description: "Elområde måste vara giltigt (t.ex. SE3).", errorCode: "E_110_INVALID_ZONE" },
    { id: "BRSFLEX110-6", description: "Namnet på SPU måste vara unikt inom SP:s portfölj.", errorCode: "E_110_DUPLICATE_NAME" }
  ],
  process: [
    { id: "BRSFLEX110-7", description: "SP registrerar en ny Service Providing Unit (SPU)." },
    { id: "BRSFLEX110-8", description: "FIS skickar en kvittens till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX110-9", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content110Input, content110Output]
};
