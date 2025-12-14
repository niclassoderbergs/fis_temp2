
import { BRSData } from './types';
import { content613Output } from './content-definitions';

export const brsFlex613: BRSData = {
  id: "BRS-FLEX-613",
  title: "Notifiering om beräknad aktiverad flexibilitetsvolym för CU",
  purpose: "Att proaktivt distribuera leveransresultatet (aktiverad volym) till berörda parter så snart den har registrerats. Detta möjliggör snabb uppföljning och verifiering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "TSO / DSO / Settlement Responsible" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-613: Notifiering om leveransvolym
    participant FIS as Flexibilitetsregistret
    participant Actor as TSO/DSO

    Note over FIS: Trigger: BRS-FLEX-611 eller 6110
    activate FIS
    FIS->>FIS: Hämta leveransdata
    FIS->>Actor: NotifyActivationVolume (Aktiverings-ID, Tidsserie)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX613-1", description: "Processen triggas när leveransdata registreras av SP (BRS-FLEX-611) eller systemet (BRS-FLEX-6110)." },
    { id: "BRSFLEX613-2", description: "FIS skickar data till berörda systemoperatörer och avräkningsansvariga." }
  ],
  preConditions: [
    { id: "BRSFLEX613-PRE-1", description: "Leveransdata finns sparad." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX613-POST-1", description: "Volymdata har distribuerats." }
    ],
    rejected: [
      { id: "BRSFLEX613-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content613Output]
};
