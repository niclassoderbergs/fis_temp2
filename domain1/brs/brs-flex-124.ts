
import { BRSData } from '../../types';
import { content124Input, content124Output } from '../../content-definitions';

export const brsFlex124: BRSData = {
  id: "BRS-FLEX-124",
  title: "FIS stänger tillfälligt av SPG",
  purpose: "Att administrativt stänga av en SPG (Service Providing Group). Detta spärrar portföljen från att användas i budgivning.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-124: FIS stänger tillfälligt av SPG
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: SuspendSPG (SPG-ID, Orsak)
    activate FIS
    FIS->>FIS: Sätt status 'Suspended'
    FIS->>SP: NotifySPGSuspended (SPG-ID, Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX124-1", description: "En administratör har beslutat att stänga av en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX124-2", description: "SPG-status har satts till 'Suspended'." },
      { id: "BRSFLEX124-3", description: "SP har notifierats." }
    ],
    rejected: [
      { id: "BRSFLEX124-4", description: "Åtgärden misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX124-5", description: "SPG-ID måste existera.", errorCode: "E_124_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX124-6", description: "FIS administrerar avstängning av en SPG." },
    { id: "BRSFLEX124-7", description: "FIS notifierar SP." }
  ],
  infoObjects: [content124Input, content124Output]
};
