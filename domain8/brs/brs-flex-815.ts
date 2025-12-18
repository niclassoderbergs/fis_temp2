
import { BRSData } from '../../types';
import { content815Output } from '../../content-definitions';

export const brsFlex815: BRSData = {
  id: "BRS-FLEX-815",
  title: "SP notifieras om återaktivering",
  purpose: "Att informera Service Provider (SP) om att deras konto åter har status 'Active' och att eventuella spärrar har hävts.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-815: Notifiering om återaktivering
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-812
    activate FIS
    FIS->>FIS: Sammanställ statusinfo
    FIS->>SP: NotifyReactivation (Status, Starttid, Meddelande)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX815-1", description: "En SP har återaktiverats administrativt (via BRS-FLEX-812)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX815-2", description: "SP har mottagit notifiering om återaktiveringen." }
    ],
    rejected: [
      { id: "BRSFLEX815-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX815-4", description: "FIS skickar information om återaktiveringen till SP." },
    { id: "BRSFLEX815-5", description: "SP tar emot notifieringen." }
  ],
  infoObjects: [content815Output]
};
