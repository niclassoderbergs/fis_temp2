
import { BRSData } from './types';
import { content110Input, content110Output } from './content-definitions';

export const brsFlex110: BRSData = {
  id: "BRS-FLEX-110",
  title: "SP registrerar SPU",
  purpose: "Att skapa en ny SPU-identitet (Service Providing Unit) i systemet. Detta moment skapar endast behållaren med metadata. Koppling av resurser sker i separata processer.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-110: SP registrerar SPU
    participant SP as SP
    participant FIS as Flexibilitetsregistret

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
  process: [
    { id: "BRSFLEX110-7", description: "SP skickar begäran om att skapa en SPU med grundläggande metadata (Namn, Elområde)." },
    { id: "BRSFLEX110-8", description: "FIS validerar format och giltigt elområde." },
    { id: "BRSFLEX110-9", description: "FIS skapar objektet med status 'Available' (väntar på resurser)." },
    { id: "BRSFLEX110-10", description: "FIS returnerar det genererade SPU-ID:t, samt registrerat namn och elområde." }
  ],
  preConditions: [
    { id: "BRSFLEX110-1", description: "SP vill skapa en SPU." }
  ],
  businessRules: [
    { id: "BRSFLEX110-5", description: "Elområde måste vara giltigt (t.ex. SE3).", errorCode: "E_110_INVALID_ZONE" },
    { id: "BRSFLEX110-6", description: "Namnet på SPU måste vara unikt inom SP:s portfölj.", errorCode: "E_110_DUPLICATE_NAME" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX110-2", description: "En ny SPU har skapats i systemet med status 'Available'." },
      { id: "BRSFLEX110-3", description: "SPU-ID, Namn och Elområde har returnerats till SP." }
    ],
    rejected: [
      { id: "BRSFLEX110-4", description: "Inget SPU-objekt har skapats." }
    ]
  },
  infoObjects: [content110Input, content110Output]
};
