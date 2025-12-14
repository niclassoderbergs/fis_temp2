
import { BRSData } from './types';
import { content210Input, content210Output } from './content-definitions';

export const brsFlex210: BRSData = {
  id: "BRS-FLEX-610",
  title: "SP registrerar Budobjekt",
  purpose: "Att definiera det säljbara objektet mot en specifik marknad (t.ex. mFRR Energy Bid). Detta objekt kopplar en teknisk SPU/SPG till en specifik marknadsprodukt.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-610: SP registrerar Budobjekt
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: RegisterBidObject (SPU/SPG, Marknad)
    activate FIS
    FIS->>FIS: Validera affärsregler

    alt Validering OK
        FIS->>FIS: Skapa Budobjekt
        FIS-->>SP: OK (Budobjekt-ID)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX610-9", description: "SP registrerar ett budobjekt som pekar ut en SPU eller SPG." },
    { id: "BRSFLEX610-10", description: "FIS validerar och skapar objektet." }
  ],
  preConditions: [
    { id: "BRSFLEX610-1", description: "SP vill registrerar ett budobjekt." }
  ],
  businessRules: [
    { id: "BRSFLEX610-6", description: "Angivet SPU-ID eller SPG-ID måste existera i FIS.", errorCode: "E_610_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX610-7", description: "SPU/SPG måste vara Active.", errorCode: "E_610_RESOURCE_NOT_ACTIVE" },
    { id: "BRSFLEX610-8", description: "Objektet måste koppla en teknisk SPU/SPG till en specifik marknadsprodukt.", errorCode: "-" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX610-2", description: "Budobjekt har skapats." },
      { id: "BRSFLEX610-3", description: "SP har mottagit en positiv kvittens med Budobjekts-ID." }
    ],
    rejected: [
      { id: "BRSFLEX610-4", description: "Inget budobjekt har skapats." }
    ]
  },
  infoObjects: [content210Input, content210Output]
};
