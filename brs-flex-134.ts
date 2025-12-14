
import { BRSData } from './types';
import { content134Output } from './content-definitions';

export const brsFlex134: BRSData = {
  id: "BRS-FLEX-134",
  title: "SP notifieras om bortkopplad CU från SPU",
  purpose: "Att informera SP om att en CU har kopplats bort från en SPU på grund av en systemhändelse (t.ex. flytt eller avtalsavslut).",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-134: Notifiering om bortkopplad SPU-resurs
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-1320
    activate FIS
    FIS->>FIS: Sammanställ notifiering (Orsak, Startdatum, Slutdatum)
    FIS->>SP: NotifyCUUnlinkedFromSPU (Data)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX134-4", description: "Processen triggas av att BRS-FLEX-1320 har genomfört en tvångsbortkoppling." },
    { id: "BRSFLEX134-5", description: "FIS skapar ett notifieringsmeddelande som inkluderar kopplingshistorik (Startdatum och Slutdatum)." },
    { id: "BRSFLEX134-6", description: "Notifieringen skickas till SP." }
  ],
  preConditions: [
    { id: "BRSFLEX134-1", description: "BRS-FLEX-1320 har exekverats." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX134-2", description: "SP har mottagit notifiering om bortkoppling med datumintervall." }
    ],
    rejected: [
      { id: "BRSFLEX134-3", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content134Output]
};
