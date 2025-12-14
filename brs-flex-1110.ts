
import { BRSData } from './types';

export const brsFlex1110: BRSData = {
  id: "BRS-FLEX-1110",
  title: "FIS registrerar SPU",
  purpose: "Att skapa en SPU administrativt, initierat av FIS. Detta används vid migrationer eller om systemoperatören kräver en specifik konfiguration som SP inte kan skapa själv.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1110: FIS registrerar SPU (Admin)
    participant Admin as FIS Admin
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Admin->>FIS: CreateSPU (SP-ID, Namn, Elområde)
    activate FIS
    FIS->>FIS: Skapa SPU-objekt
    FIS-->>SP: Notification (New SPU Created)
    FIS-->>Admin: OK
    deactivate FIS`,
  process: [
    { id: "BRSFLEX1110-6", description: "FIS administratör initierar skapandet av en SPU för en specifik SP." },
    { id: "BRSFLEX1110-7", description: "Systemet skapar objektet." },
    { id: "BRSFLEX1110-8", description: "En notifiering skickas till berörd SP." }
  ],
  preConditions: [
    { id: "BRSFLEX1110-1", description: "FIS vill skapa en SPU för en SP." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1110-2", description: "SPU har skapats administrativt." },
      { id: "BRSFLEX1110-3", description: "SP har blivit notifierad om den nya enheten." },
      { id: "BRSFLEX1110-4", description: "Administratören har mottagit bekräftelse på att åtgärden utförts." }
    ],
    rejected: [
      { id: "BRSFLEX1110-5", description: "Fel vid skapande, inget objekt sparat." }
    ]
  }
};
