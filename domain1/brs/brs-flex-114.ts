
import { BRSData } from '../../types';
import { content114Input, content114Output } from '../../content-definitions';

export const brsFlex114: BRSData = {
  id: "BRS-FLEX-114",
  title: "FIS stänger tillfälligt av SPU",
  purpose: "Att administrativt stänga av en SPU (Service Providing Unit). Detta förhindrar att enheten används för nya åtaganden, t.ex. vid tekniska fel eller utredning.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-114: FIS stänger tillfälligt av SPU
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: SuspendSPU (SPU-ID, Orsak)
    activate FIS
    FIS->>FIS: Sätt status 'Suspended'
    FIS->>SP: NotifySPUSuspended (SPU-ID, Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX114-1", description: "En administratör har beslutat att stänga av en SPU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX114-2", description: "SPU-status har satts till 'Suspended'." },
      { id: "BRSFLEX114-3", description: "SP har notifierats." }
    ],
    rejected: [
      { id: "BRSFLEX114-4", description: "Åtgärden misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX114-5", description: "SPU-ID måste existera.", errorCode: "E_114_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX114-6", description: "FIS administrerar avstängning av en SPU." },
    { id: "BRSFLEX114-7", description: "FIS notifierar SP." }
  ],
  infoObjects: [content114Input, content114Output]
};
