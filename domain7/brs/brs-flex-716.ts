
import { BRSData } from '../../types';
import { content716Output } from '../../content-definitions';

export const brsFlex716: BRSData = {
  id: "BRS-FLEX-716",
  title: "DSO notifieras om verifierat energibud",
  purpose: "Att informera DSO och ansvarig för avräkning (Settlement) om resultatet av verifieringen för ett aktiverat lokalt energibud. Detta meddelande bekräftar om leveransen skett enligt plan eller om avvikelse detekterats, vilket utgör underlag för ekonomisk reglering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare A", description: "DSO (Beställare)" },
    { role: "Mottagare B", description: "Settlement Responsible" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-716: DSO notifieras om verifierat energibud
    participant FIS as FIS
    participant DSO as DSO / Settlement

    Note over FIS: Trigger: BRS-FLEX-7110 (Verifiering klar)
    activate FIS
    FIS->>FIS: Kontrollera: Är det ett DSO-bud?
    FIS->>DSO: NotifyVerificationResult (Status, Avvikelse, Godkänd Volym)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX716-1", description: "Systemet har verifierat ett aktiverat energibud (DSO) (via BRS-FLEX-7110)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX716-2", description: "Nätägaren (DSO) har mottagit verifieringsresultatet." },
      { id: "BRSFLEX716-3", description: "Settlement Responsible har mottagit verifieringsresultatet." }
    ],
    rejected: [
      { id: "BRSFLEX716-4", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX716-5", description: "FIS skickar verifieringsresultatet (leverans vs bud)." },
    { id: "BRSFLEX716-6", description: "DSO och Settlement Responsible tar emot informationen." }
  ],
  infoObjects: [content716Output]
};
