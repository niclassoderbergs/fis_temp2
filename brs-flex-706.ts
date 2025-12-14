
import { BRSData } from './types';
import { content706Output } from './content-definitions';

export const brsFlex706: BRSData = {
  id: "BRS-FLEX-706",
  title: "DSO notifieras om budets kapacitet",
  purpose: "Att informera DSO om resultatet av kapacitetskontrollen (BRS-FLEX-7011) för ett inkommet lokalflexbud. Detta svar avgör om budet kan accepteras tekniskt på den lokala flexmarknaden.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Nätägare (DSO)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-706: DSO notifieras om budets kapacitet
    participant FIS as Flexibilitetsregistret
    participant DSO as DSO

    Note over FIS: Trigger: BRS-FLEX-7011 (Kapacitetskontroll DSO-bud)
    activate FIS
    FIS->>FIS: Hämta kontrollresultat
    FIS->>DSO: NotifyBidCapacityResult (Bud-ID, Status, Kapacitet)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX706-1", description: "FIS identifierar att kapacitetsresultatet från BRS-FLEX-7011 avser ett lokalflexbud initierat av DSO." },
    { id: "BRSFLEX706-2", description: "FIS skickar notifiering med status (Valid/Invalid) och verifierad kapacitet till DSO." }
  ],
  preConditions: [
    { id: "BRSFLEX706-PRE-1", description: "BRS-FLEX-7011 har exekverats för ett DSO-bud." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX706-POST-1", description: "DSO har mottagit besked om budkapacitet." }
    ],
    rejected: [
      { id: "BRSFLEX706-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content706Output]
};
