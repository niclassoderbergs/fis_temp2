
import { BRSData } from './types';
import { content716Output } from './content-definitions';

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
    participant FIS as Flexibilitetsregistret
    participant DSO as DSO / Settlement

    Note over FIS: Trigger: BRS-FLEX-7110 (Verifiering klar)
    activate FIS
    FIS->>FIS: Kontrollera: Är det ett DSO-bud?
    FIS->>DSO: NotifyVerificationResult (Status, Avvikelse, Godkänd Volym)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX716-1", description: "Processen triggas automatiskt när BRS-FLEX-7110 har fastställt ett verifieringsresultat för ett bud initierat av DSO." },
    { id: "BRSFLEX716-2", description: "FIS sammanställer resultatet." },
    { id: "BRSFLEX716-3", description: "FIS skickar notifiering till DSO och Settlement Responsible." }
  ],
  preConditions: [
    { id: "BRSFLEX716-PRE-1", description: "BRS-FLEX-7110 har exekverats för ett DSO-bud." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX716-POST-1", description: "DSO har mottagit verifieringsresultatet." }
    ],
    rejected: [
      { id: "BRSFLEX716-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content716Output]
};
