
import { BRSData } from './types';
import { content120Input, content120Output } from './content-definitions';

export const brsFlex120: BRSData = {
  id: "BRS-FLEX-120",
  title: "SP registrerar SPG",
  purpose: "Att skapa en ny SPG-identitet (Service Providing Group). En SPG fungerar som en portfölj för budgivning och måste vara knuten till ett specifikt elområde.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-120: SP registrerar SPG
    participant SP as SP
    participant FIS as Flexibilitetsregistret

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
  process: [
    { id: "BRSFLEX120-6", description: "SP skickar begäran om att skapa en SPG." },
    { id: "BRSFLEX120-7", description: "FIS validerar metadata." },
    { id: "BRSFLEX120-8", description: "FIS skapar SPG-objektet med status 'Available'." },
    { id: "BRSFLEX120-9", description: "FIS returnerar SPG-ID, namn och elområde." }
  ],
  preConditions: [
    { id: "BRSFLEX120-1", description: "SP vill skapa en SPG." }
  ],
  businessRules: [
    { id: "BRSFLEX120-5", description: "Måste vara kopplad till ett specifikt Elområde (Bidding Zone).", errorCode: "E_120_MISSING_ZONE" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX120-2", description: "Ny SPG har skapats i systemet med status 'Available'." },
      { id: "BRSFLEX120-3", description: "SPG-ID, Namn och Elområde har returnerats till SP." }
    ],
    rejected: [
      { id: "BRSFLEX120-4", description: "Inget SPG-objekt har skapats." }
    ]
  },
  infoObjects: [content120Input, content120Output]
};
