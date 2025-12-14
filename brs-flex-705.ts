
import { BRSData } from './types';
import { content705Output } from './content-definitions';

export const brsFlex705: BRSData = {
  id: "BRS-FLEX-705",
  title: "TSO notifieras om budets kapacitet",
  purpose: "Att informera TSO om resultatet av kapacitetskontrollen (BRS-FLEX-7011) för ett inkommet balansbud. Detta svar avgör om budet kan accepteras tekniskt på balansmarknaden.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Systemoperatör (TSO)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-705: TSO notifieras om budets kapacitet
    participant FIS as Flexibilitetsregistret
    participant TSO as TSO

    Note over FIS: Trigger: BRS-FLEX-7011 (Kapacitetskontroll TSO-bud)
    activate FIS
    FIS->>FIS: Hämta kontrollresultat
    FIS->>TSO: NotifyBidCapacityResult (Bud-ID, Status, Kapacitet)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX705-1", description: "FIS identifierar att kapacitetsresultatet från BRS-FLEX-7011 avser ett balansbud initierat av TSO." },
    { id: "BRSFLEX705-2", description: "FIS skickar notifiering med status (Valid/Invalid) och verifierad kapacitet till TSO." }
  ],
  preConditions: [
    { id: "BRSFLEX705-PRE-1", description: "BRS-FLEX-7011 har exekverats för ett TSO-bud." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX705-POST-1", description: "TSO har mottagit besked om budkapacitet." }
    ],
    rejected: [
      { id: "BRSFLEX705-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content705Output]
};
