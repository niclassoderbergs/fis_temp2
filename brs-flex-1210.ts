
import { BRSData } from './types';

export const brsFlex1210: BRSData = {
  id: "BRS-FLEX-1210",
  title: "FIS registrerar SPG",
  purpose: "Att skapa en SPG administrativt, initierat av FIS. Används för administrativa syften eller tvångsåtgärder.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1210: FIS registrerar SPG (Admin)
    participant Admin as FIS Admin
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Admin->>FIS: CreateSPG (SP-ID, Metadata)
    activate FIS
    FIS->>FIS: Skapa SPG
    FIS-->>SP: Notification (New SPG Created)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX1210-6", description: "FIS skapar en SPG å SP:s vägnar." },
    { id: "BRSFLEX1210-7", description: "SP notifieras om den nya gruppen." }
  ],
  preConditions: [
    { id: "BRSFLEX1210-1", description: "FIS vill skapa en SPG för en SP." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1210-2", description: "SPG har skapats administrativt." },
      { id: "BRSFLEX1210-3", description: "SP har notifierats." },
      { id: "BRSFLEX1210-4", description: "Administratören har mottagit bekräftelse på att åtgärden utförts." }
    ],
    rejected: [
      { id: "BRSFLEX1210-5", description: "Fel vid skapande, inget objekt sparat." }
    ]
  }
};
