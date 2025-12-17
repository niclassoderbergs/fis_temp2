
import { BRSData } from '../../types';
import { content115Input, content115Output } from '../../content-definitions';

export const brsFlex115: BRSData = {
  id: "BRS-FLEX-115",
  title: "FIS återaktiverar SPU",
  purpose: "Att återställa en SPU till normal driftstatus efter en tillfällig avstängning.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "SP - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-115: FIS återaktiverar SPU
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: ReactivateSPU (SPU-ID)
    activate FIS
    FIS->>FIS: Validera status (Suspended)
    FIS->>FIS: Sätt status 'Active' (eller 'Available')
    FIS->>SP: NotifySPUReactivated (SPU-ID)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX115-1", description: "En SPU är avstängd och beslut om återaktivering finns." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX115-2", description: "SPU-status är återställd." },
      { id: "BRSFLEX115-3", description: "SP har notifierats." }
    ],
    rejected: [
      { id: "BRSFLEX115-4", description: "SPU var inte i tillstånd att återaktiveras." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX115-5", description: "Endast 'Suspended' SPU kan återaktiveras.", errorCode: "E_115_INVALID_STATE" }
  ],
  process: [
    { id: "BRSFLEX115-6", description: "FIS administrerar återaktivering av en SPU." },
    { id: "BRSFLEX115-7", description: "FIS notifierar SP." }
  ],
  infoObjects: [content115Input, content115Output]
};
