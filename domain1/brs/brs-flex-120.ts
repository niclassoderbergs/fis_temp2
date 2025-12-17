
import { BRSData } from '../../types';
import { content120Input, content120Output } from '../../content-definitions';

export const brsFlex120: BRSData = {
  id: "BRS-FLEX-120",
  title: "SP registrerar SPG",
  purpose: "Att skapa en ny SPG-identitet (Service Providing Group). En SPG fungerar som en portfölj för budgivning och måste vara knuten till ett specifikt elområde.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-120: SP registrerar SPG
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: RegisterSPG (Namn, Elområde)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Skapa SPG-objekt (Status: Available)
        FIS-->>SP: RegisterSPGAcknowledgement (SPG-ID, Namn, Elområde)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX120-1", description: "En SP har registrerat en Service Providing Group (SPG)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX120-2", description: "FIS har registrerat en ny Service Providing Group (SPG)." },
      { id: "BRSFLEX120-3", description: "SP har mottagit kvittens med SPG-ID." }
    ],
    rejected: [
      { id: "BRSFLEX120-4", description: "Inget SPG-objekt har skapats." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX120-5", description: "Måste vara kopplad till ett specifikt Elområde (Bidding Zone).", errorCode: "E_120_MISSING_ZONE" }
  ],
  process: [
    { id: "BRSFLEX120-6", description: "SP registrerar en ny Service Providing Group (SPG)." },
    { id: "BRSFLEX120-7", description: "FIS skickar en kvittens till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX120-8", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content120Input, content120Output]
};
