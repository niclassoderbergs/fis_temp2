
import { BRSData } from '../../types';
import { content812Input, content812Output } from '../../content-definitions';

export const brsFlex812: BRSData = {
  id: "BRS-FLEX-812",
  title: "Återaktivering av SP",
  purpose: "Att återställa en avstängd ('Suspended') aktör till aktiv status ('Active') efter att orsakerna till avstängningen åtgärdats.",
  actors: [
    { role: "Initiator", description: "FIS Admin" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-812: Återaktivering
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: ReactivateActor (SP-ID)
    activate FIS
    FIS->>FIS: Validera aktuell status (måste vara Suspended)
    FIS->>FIS: Sätt status 'Active'
    FIS->>SP: NotifyReactivation
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX812-1", description: "SP har status 'Suspended' och beslut om återaktivering finns." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX812-2", description: "SP-status är återställd till 'Active'." }
    ],
    rejected: [
      { id: "BRSFLEX812-3", description: "Felaktig statusövergång (t.ex. från Terminated)." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX812-4", description: "Endast 'Suspended' aktörer kan återaktiveras.", errorCode: "E_812_INVALID_STATE" }
  ],
  process: [
    { id: "BRSFLEX812-5", description: "Admin återaktiverar SP." },
    { id: "BRSFLEX812-6", description: "FIS häver spärrar och notifierar SP." }
  ],
  infoObjects: [content812Input, content812Output]
};
