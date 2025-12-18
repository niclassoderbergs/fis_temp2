
import { BRSData } from '../../types';
import { content106Input } from '../../content-definitions';

export const brsFlex106: BRSData = {
  id: "BRS-FLEX-106",
  title: "FIS återaktiverar CU",
  purpose: "Administrativ process för att återställa en CU till aktiv status efter granskning eller beslut.",
  actors: [
    { role: "Initiator", description: "FIS (Admin)" },
    { role: "Mottagare", description: "System / SP (via notif)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-106: FIS återaktiverar CU
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: ApproveReactivation (CU-ID)
    activate FIS
    FIS->>FIS: Sätt status 'Active'
    FIS->>FIS: Trigger BRS-FLEX-107 (SP notifieras om uppdaterad CU)
    FIS-->>Admin: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX106-1", description: "Beslut om återaktivering har fattats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX106-2", description: "CU-status har uppdaterats till 'Active'." }
    ],
    rejected: [
      { id: "BRSFLEX106-3", description: "Åtgärd misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX106-4", description: "Admin verkställer återaktivering i systemet." },
    { id: "BRSFLEX106-5", description: "Systemet initierar notifiering till SP." }
  ],
  infoObjects: [content106Input]
};
