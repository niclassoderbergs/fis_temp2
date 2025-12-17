
import { BRSData } from '../../types';
import { content512Output } from '../../content-definitions';

export const brsFlex512: BRSData = {
  id: "BRS-FLEX-512",
  title: "Notifiering om vald baselinemetod för CU",
  purpose: "Att informera berörda aktörer (TSO, DSO, BRP, Elleverantör) när en SP har valt eller uppdaterat baselinemetod för en CU. Detta är avgörande för transparens och för att alla parter ska kunna validera verifieringsunderlaget vid senare leverans.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "TSO / DSO / BRP / Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-512: Notifiering om vald baselinemetod
    participant FIS as FIS
    participant TSO as TSO
    participant DSO as DSO
    participant BRP as BRP
    participant SUP as Elleverantör

    Note over FIS: Trigger: BRS-FLEX-511
    activate FIS
    FIS->>FIS: Identifiera berörda aktörer
    FIS->>FIS: Sammanställ konfiguration
    
    par Distribuera Config
        FIS->>TSO: NotifyBaselineConfig (CU-ID, Mätpunkts-ID, Metod, Mätkälla)
        FIS->>DSO: NotifyBaselineConfig (CU-ID, Mätpunkts-ID, Metod, Mätkälla)
        FIS->>BRP: NotifyBaselineConfig (CU-ID, Mätpunkts-ID, Metod, Mätkälla)
        FIS->>SUP: NotifyBaselineConfig (CU-ID, Mätpunkts-ID, Metod, Mätkälla)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX512-1", description: "Vald baselinemetod har registrerats för en CU (via BRS-FLEX-511)" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX512-2", description: "TSO har mottagit information om vald baselinemetod." },
      { id: "BRSFLEX512-3", description: "DSO har mottagit information om vald baselinemetod." },
      { id: "BRSFLEX512-4", description: "BRP har mottagit information om vald baselinemetod." },
      { id: "BRSFLEX512-5", description: "Elleverantör har mottagit information om vald baselinemetod." }
    ],
    rejected: [
      { id: "BRSFLEX512-6", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX512-7", description: "FIS skickar notifiering om vald baselinemetod." },
    { id: "BRSFLEX512-8", description: "Berörda aktörer (TSO, DSO, BRP, Elleverantör) tar emot informationen." }
  ],
  infoObjects: [content512Output]
};
