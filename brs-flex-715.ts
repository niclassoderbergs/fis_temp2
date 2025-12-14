
import { BRSData } from './types';
import { content715Output } from './content-definitions';

export const brsFlex715: BRSData = {
  id: "BRS-FLEX-715",
  title: "TSO notifieras om verifierat energibud",
  purpose: "Att informera TSO och ansvarig för avräkning (Settlement) om resultatet av verifieringen för ett aktiverat energibud. Detta meddelande bekräftar om leveransen skett enligt plan eller om avvikelse detekterats, vilket utgör underlag för ekonomisk reglering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare A", description: "TSO (Beställare)" },
    { role: "Mottagare B", description: "Settlement Responsible" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-715: TSO notifieras om verifierat energibud
    participant FIS as Flexibilitetsregistret
    participant TSO as TSO / Settlement

    Note over FIS: Trigger: BRS-FLEX-7110 (Verifiering klar)
    activate FIS
    FIS->>FIS: Kontrollera: Är det ett TSO-bud?
    FIS->>TSO: NotifyVerificationResult (Status, Avvikelse, Godkänd Volym)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX715-1", description: "Processen triggas automatiskt när BRS-FLEX-7110 har fastställt ett verifieringsresultat för ett bud initierat av TSO." },
    { id: "BRSFLEX715-2", description: "FIS sammanställer resultatet (Status, Diff, Volym)." },
    { id: "BRSFLEX715-3", description: "FIS skickar notifiering till TSO och Settlement Responsible." }
  ],
  preConditions: [
    { id: "BRSFLEX715-PRE-1", description: "BRS-FLEX-7110 har exekverats för ett TSO-bud." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX715-POST-1", description: "TSO har mottagit verifieringsresultatet." }
    ],
    rejected: [
      { id: "BRSFLEX715-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content715Output]
};
