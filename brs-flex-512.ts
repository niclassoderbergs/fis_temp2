
import { BRSData } from './types';
import { content512Output } from './content-definitions';

export const brsFlex512: BRSData = {
  id: "BRS-FLEX-512",
  title: "Notifiering om vald baselinemetod för CU",
  purpose: "Att informera berörda systemoperatörer (TSO/DSO) när en SP har valt eller uppdaterat baselinemetod för en CU. Detta är avgörande för transparens och för att TSO/DSO ska kunna validera verifieringsunderlaget vid senare leverans.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "TSO / DSO" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-512: Notifiering om vald baselinemetod
    participant FIS as Flexibilitetsregistret
    participant SO as TSO/DSO

    Note over FIS: Trigger: BRS-FLEX-511
    activate FIS
    FIS->>FIS: Identifiera berörda SO
    FIS->>FIS: Sammanställ konfiguration
    FIS->>SO: NotifyBaselineConfig (CU-ID, Metod, Parametrar)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX512-1", description: "Processen triggas när en SP framgångsrikt registrerar en metodkonfiguration i BRS-FLEX-511." },
    { id: "BRSFLEX512-2", description: "FIS identifierar vilka aktörer som prenumererar på information om resursen (vanligtvis TSO och berörd Nätägare)." },
    { id: "BRSFLEX512-3", description: "FIS skickar en notifiering innehållande vald metod och parametrar." }
  ],
  preConditions: [
    { id: "BRSFLEX512-PRE-1", description: "BRS-FLEX-511 har exekverats." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX512-POST-1", description: "TSO/DSO har mottagit information om baselinekonfiguration." }
    ],
    rejected: [
      { id: "BRSFLEX512-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content512Output]
};
