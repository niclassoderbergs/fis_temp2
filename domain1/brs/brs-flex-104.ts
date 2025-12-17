
import { BRSData } from '../../types';
import { content104Input, content104Output } from '../../content-definitions';

export const brsFlex104: BRSData = {
  id: "BRS-FLEX-104",
  title: "FIS stänger tillfälligt av CU",
  purpose: "Att administrativt stänga av en CU (Controllable Unit). Detta förhindrar att enheten används för nya åtaganden, t.ex. vid tekniska fel, regelbrott eller på begäran av systemoperatör.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-104: FIS stänger tillfälligt av CU
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: SuspendCU (CU-ID, Orsak)
    activate FIS
    FIS->>FIS: Validera status
    FIS->>FIS: Sätt status 'Suspended'
    FIS->>SP: NotifyCUSuspended (CU-ID, Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX104-1", description: "En administratör har beslutat att stänga av en CU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX104-2", description: "CU-status har satts till 'Suspended'." },
      { id: "BRSFLEX104-3", description: "SP har notifierats." }
    ],
    rejected: [
      { id: "BRSFLEX104-4", description: "Åtgärden misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX104-5", description: "CU-ID måste existera.", errorCode: "E_104_NOT_FOUND" }
  ],
  process: [
    { id: "BRSFLEX104-6", description: "FIS administrerar avstängning av en CU." },
    { id: "BRSFLEX104-7", description: "FIS notifierar SP." }
  ],
  infoObjects: [content104Input, content104Output]
};
