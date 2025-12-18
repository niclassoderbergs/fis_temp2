
import { BRSData } from '../../types';
import { content205Output } from '../../content-definitions';

export const brsFlex205: BRSData = {
  id: "BRS-FLEX-205",
  title: "SP notifieras om avslutat flexavtal",
  purpose: "Att informera SP om att ett flexibilitetsavtal har avslutats på grund av en extern händelse (t.ex. kunden flyttar, byter leverantör eller avslutar via Mina Sidor).",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Service Provider (SP)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-205: SP notifieras om avslutat avtal
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-2040 (Flytt/Byte) eller BRS-FLEX-208 (Kundavslut)
    activate FIS
    FIS->>FIS: Sammanställ data
    FIS->>SP: NotifyFlexAgreementTerminated (Avtals-ID, Orsak, Slutdatum)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX205-1", description: "Ett flexibilitetsavtal har avslutats via systemprocess (BRS-FLEX-2040) eller via kundinitiativ (BRS-FLEX-208)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX205-2", description: "SP har mottagit notifiering om att avtalet avslutats." }
    ],
    rejected: [
      { id: "BRSFLEX205-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX205-4", description: "FIS skickar notifiering om avslutat avtal." },
    { id: "BRSFLEX205-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content205Output]
};
