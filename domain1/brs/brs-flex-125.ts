
import { BRSData } from '../../types';
import { content125Input, content125Output } from '../../content-definitions';

export const brsFlex125: BRSData = {
  id: "BRS-FLEX-125",
  title: "FIS återaktiverar SPG",
  purpose: "Att återställa en SPG till normal driftstatus efter en tillfällig avstängning, vilket möjliggör budgivning igen.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-125: FIS återaktiverar SPG
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: ReactivateSPG (SPG-ID)
    activate FIS
    FIS->>FIS: Validera status (Suspended)
    FIS->>FIS: Sätt status 'Active' (eller 'Available')
    FIS->>SP: NotifySPGReactivated (SPG-ID)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX125-1", description: "En SPG är avstängd och beslut om återaktivering finns." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX125-2", description: "SPG-status är återställd." },
      { id: "BRSFLEX125-3", description: "SP har notifierats." }
    ],
    rejected: [
      { id: "BRSFLEX125-4", description: "SPG var inte i tillstånd att återaktiveras." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX125-5", description: "Endast 'Suspended' SPG kan återaktiveras.", errorCode: "E_125_INVALID_STATE" }
  ],
  process: [
    { id: "BRSFLEX125-6", description: "FIS administrerar återaktivering av en SPG." },
    { id: "BRSFLEX125-7", description: "FIS notifierar SP." }
  ],
  infoObjects: [content125Input, content125Output]
};
