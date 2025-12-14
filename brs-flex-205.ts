
import { BRSData } from './types';
import { content205Output } from './content-definitions';

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
    participant FIS as Flexibilitetsregistret
    participant SP as SP (Gammal)

    Note over FIS: Trigger: BRS-FLEX-2040
    activate FIS
    FIS->>FIS: Sammanställ notifiering (Orsak, Slutdatum)
    FIS->>SP: NotifyAgreementTerminated (Flexibilitetsavtals-ID, Orsak)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX205-4", description: "Processen triggas av att BRS-FLEX-2040 har avslutat ett avtal." },
    { id: "BRSFLEX205-5", description: "FIS skapar ett notifieringsmeddelande innehållande Flexibilitetsavtals-ID, slutdatum och orsakskod (Switch eller MoveOut)." },
    { id: "BRSFLEX205-6", description: "Notifieringen skickas till den SP som stod som part i det avslutade avtalet." }
  ],
  preConditions: [
    { id: "BRSFLEX205-1", description: "BRS-FLEX-2040 har exekverats och avslutat ett avtal." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX205-2", description: "SP har mottagit notifiering om avslutat avtal." }
    ],
    rejected: [
      { id: "BRSFLEX205-3", description: "Notifiering kunde inte levereras (loggas)." }
    ]
  },
  infoObjects: [content205Output]
};
