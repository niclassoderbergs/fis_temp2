
import { BRSData } from '../../types';
import { content144Output } from '../../content-definitions';

export const brsFlex144: BRSData = {
  id: "BRS-FLEX-144",
  title: "SP notifieras om bortkopplad CU från SPG",
  purpose: "Att informera SP om att en CU har kopplats bort från en SPG på grund av en systemhändelse.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-144: Notifiering om bortkopplad SPG-resurs
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-1420
    activate FIS
    FIS->>FIS: Sammanställ notifiering (Orsak, Startdatum, Slutdatum)
    FIS->>SP: NotifyCUUnlinkedFromSPG (Data)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX144-1", description: "En SP har notifierats om att en styrbar enhet kopplats bort från en SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX144-2", description: "SP har mottagit information om att en styrbar enhet kopplats bort från en SPG." }
    ],
    rejected: [
      { id: "BRSFLEX144-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX144-4", description: "FIS skickar notifiering om bortkoppling." },
    { id: "BRSFLEX144-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content144Output]
};
