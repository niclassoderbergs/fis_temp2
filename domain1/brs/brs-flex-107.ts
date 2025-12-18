
import { BRSData } from '../../types';
import { content107Output } from '../../content-definitions';

export const brsFlex107: BRSData = {
  id: "BRS-FLEX-107",
  title: "SP notifieras om uppdaterad CU",
  purpose: "Att informera SP om att en CU har ändrat status (t.ex. till Active efter återaktivering) eller andra systemgenererade ändringar.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-107: SP notifieras om uppdaterad CU
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-106 eller 1040
    activate FIS
    FIS->>FIS: Sammanställ data om ändringen
    FIS->>SP: NotifyCUUpdated (CU-ID, Status, Starttid)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX107-1", description: "En CU har återaktiverats administrativt (via BRS-FLEX-106)." },
    { id: "BRSFLEX107-6", description: "En CU har uppdaterats via systemhändelse (via BRS-FLEX-1040)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX107-2", description: "SP har mottagit notifiering om statusändring." }
    ],
    rejected: [
      { id: "BRSFLEX107-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX107-4", description: "FIS skickar notifiering till SP." },
    { id: "BRSFLEX107-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content107Output]
};
