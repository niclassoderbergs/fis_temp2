
import { BRSData } from './types';
import { content522Output } from './content-definitions';

export const brsFlex522: BRSData = {
  id: "BRS-FLEX-522",
  title: "Notifiering om registrerad baseline för CU",
  purpose: "Att distribuera den fastställda baseline-kurvan till berörda aktörer efter en leveransperiod. Denna kurva utgör referensen (kontrafaktisk förbrukning) mot vilken den faktiska leveransen mäts vid verifiering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "TSO / DSO / Settlement Responsible" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-522: Notifiering om registrerad baseline
    participant FIS as Flexibilitetsregistret
    participant Actor as TSO/DSO

    Note over FIS: Trigger: BRS-FLEX-521 eller 5210
    activate FIS
    FIS->>FIS: Hämta fastställd baseline
    FIS->>Actor: NotifyBaselineData (CU-ID, Tidsserie, Källa)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX522-1", description: "Processen triggas när en baseline har registrerats av SP (BRS-FLEX-521) eller beräknats av FIS (BRS-FLEX-5210)." },
    { id: "BRSFLEX522-2", description: "FIS skickar tidsserien till de aktörer som ansvarar för verifiering och avräkning." },
    { id: "BRSFLEX522-3", description: "Detta säkerställer att alla parter har samma bild av referenskurvan." }
  ],
  preConditions: [
    { id: "BRSFLEX522-PRE-1", description: "En baseline finns sparad i systemet för perioden." }
  ],
  businessRules: [
    { id: "BRSFLEX522-BR-1", description: "Notifiering ska endast ske för perioder där en aktivering eller verifieringsgrundande händelse har skett.", errorCode: "-" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX522-POST-1", description: "Baseline-data har distribuerats." }
    ],
    rejected: [
      { id: "BRSFLEX522-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content522Output]
};
