
import { BRSData } from './types';
import { content144Output } from './content-definitions';

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
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-1420
    activate FIS
    FIS->>FIS: Sammanställ notifiering (Orsak, Startdatum, Slutdatum)
    FIS->>SP: NotifyCUUnlinkedFromSPG (Data)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX144-4", description: "Processen triggas av att BRS-FLEX-1420 har genomfört en tvångsbortkoppling." },
    { id: "BRSFLEX144-5", description: "FIS skapar ett notifieringsmeddelande som inkluderar kopplingshistorik (Startdatum och Slutdatum)." },
    { id: "BRSFLEX144-6", description: "Notifieringen skickas till SP." }
  ],
  preConditions: [
    { id: "BRSFLEX144-1", description: "BRS-FLEX-1420 har exekverats." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX144-2", description: "SP har mottagit notifiering om bortkoppling med datumintervall." }
    ],
    rejected: [
      { id: "BRSFLEX144-3", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content144Output]
};
