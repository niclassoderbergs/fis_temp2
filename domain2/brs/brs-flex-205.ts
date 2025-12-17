
import { BRSData } from '../../types';
import { content205Output } from '../../content-definitions';

export const brsFlex205: BRSData = {
  id: "BRS-FLEX-205",
  title: "SP tar emot notifiering om avslutat flexavtal",
  purpose: "Att informera en Service Provider (SP) om att ett av deras Flexavtal har avslutats förtida på grund av en extern händelse, såsom leverantörsbyte (Switch) eller utflytt (Move-out).",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP (Gammal leverantör)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-205: Notifiering om avslutat avtal
    participant FIS as FIS
    participant SP as SP (Gammal)

    Note over FIS: Trigger: BRS-FLEX-2040
    activate FIS
    FIS->>FIS: Sammanställ notifiering (Orsak, Slutdatum)
    FIS->>SP: NotifyAgreementTerminated (Flexibilitetsavtals-ID, Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX205-1", description: "En SP har notifierats om att ett flexibilitetsavtal avslutats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX205-2", description: "SP har mottagit information om att flexibilitetsavtalet avslutats." }
    ],
    rejected: [
      { id: "BRSFLEX205-3", description: "Notifiering kunde inte levereras (loggas)." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX205-4", description: "Flexibilitetsregistret skickar notifiering om att ett avtal avslutats." },
    { id: "BRSFLEX205-5", description: "SP tar emot informationen." }
  ],
  infoObjects: [content205Output]
};
