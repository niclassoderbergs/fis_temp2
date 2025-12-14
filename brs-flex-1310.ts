
import { BRSData } from './types';
import { content133Input, content133Output } from './content-definitions';

export const brsFlex1310: BRSData = {
  id: "BRS-FLEX-1310",
  title: "FIS kopplar CU till SPU",
  purpose: "Administrativ process där FIS (Admin) skapar en koppling mellan en CU och en SPU. Används vid migreringar, felkorrigeringar eller manuell hantering.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1310: FIS kopplar CU till SPU (Admin)
    participant Admin as FIS Admin
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Admin->>FIS: ForceLinkCUtoSPU (SPU-ID, CU-ID)
    activate FIS
    FIS->>FIS: Validera Elområde (Systemkrav)
    FIS->>FIS: Skapa Relation (Admin Override)
    FIS->>FIS: Uppdatera SPU status (Available -> Active)
    FIS->>FIS: Räkna om kapacitet
    FIS-->>SP: Notification (New Resource Linked)
    FIS-->>Admin: OK
    deactivate FIS`,
  process: [
    { id: "BRSFLEX1310-6", description: "FIS administratör initierar koppling av en CU till en SPU." },
    { id: "BRSFLEX1310-7", description: "Systemet validerar att elområdet matchar (fysiskt krav)." },
    { id: "BRSFLEX1310-8", description: "Länken skapas, eventuella ägarskapskontroller kan överridas av admin." },
    { id: "BRSFLEX1310-9", description: "SPU:ns kapacitet räknas upp och status sätts till 'Active' om den var 'Available'." },
    { id: "BRSFLEX1310-10", description: "En notifiering skickas till berörd SP." }
  ],
  preConditions: [
    { id: "BRSFLEX1310-1", description: "FIS vill administrativt koppla en CU till en SPU." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1310-2", description: "Relation har skapats administrativt." },
      { id: "BRSFLEX1310-3", description: "SPU status uppdaterad till Active." },
      { id: "BRSFLEX1310-4", description: "SP har notifierats." }
    ],
    rejected: [
      { id: "BRSFLEX1310-5", description: "Fel vid koppling." }
    ]
  },
  infoObjects: [content133Input, content133Output]
};
