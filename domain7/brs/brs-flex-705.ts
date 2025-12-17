
import { BRSData } from '../../types';
import { content705Output } from '../../content-definitions';

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
    participant FIS as FIS
    participant TSO as TSO

    Note over FIS: Trigger: BRS-FLEX-7011 (Kapacitetskontroll TSO-bud)
    activate FIS
    FIS->>FIS: Hämta kontrollresultat
    FIS->>TSO: NotifyBidCapacityResult (Bud-ID, Status, Kapacitet)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX705-1", description: "Systemet har fastställt kapaciteten för ett TSO-bud (via BRS-FLEX-7011)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX705-2", description: "Systemoperatören (TSO) har mottagit notifiering om budets kapacitet." }
    ],
    rejected: [
      { id: "BRSFLEX705-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX705-4", description: "FIS skickar notifiering med resultatet av kapacitetskontrollen." },
    { id: "BRSFLEX705-5", description: "TSO tar emot informationen." }
  ],
  infoObjects: [content705Output]
};
