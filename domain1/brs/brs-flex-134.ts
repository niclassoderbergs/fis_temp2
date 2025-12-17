
import { BRSData } from '../../types';
import { content134Output } from '../../content-definitions';

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
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-1320
    activate FIS
    FIS->>FIS: Sammanställ notifiering (Orsak, Startdatum, Slutdatum)
    FIS->>SP: NotifyCUUnlinkedFromSPU (Data)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX134-1", description: "FIS har kopplat bort en CU ifrån en SPU (via BRS-FLEX-1320) och informerar SP om detta." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX134-2", description: "SP har mottagit information om att en styrbar enhet kopplats bort från en SPU." }
    ],
    rejected: [
      { id: "BRSFLEX134-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX134-4", description: "FIS skickar notifiering om bortkoppling." },
    { id: "BRSFLEX134-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content134Output]
};
