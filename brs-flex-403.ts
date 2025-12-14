
import { BRSData } from './types';
import { content403Output } from './content-definitions';

export const brsFlex403: BRSData = {
  id: "BRS-FLEX-403",
  title: "SP tar emot notifiering om nätbegränsning",
  purpose: "Att informera Service Provider (SP) om att en nätägare har registrerat en begränsning som påverkar en eller flera av SP:s resurser. Detta gör att SP kan agera (t.ex. sluta buda på marknaden för den perioden).",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-403: Notifiering om nätbegränsning
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Note over FIS: Trigger: BRS-FLEX-402
    activate FIS
    FIS->>FIS: Identifiera påverkade CU
    FIS->>FIS: Sammanställ begränsningsdata
    FIS->>SP: NotifyGridConstraint (CU-ID, MP-ID, Period, Limit)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX403-5", description: "Processen triggas automatiskt när en nätbegränsning registreras i BRS-FLEX-402." },
    { id: "BRSFLEX403-6", description: "FIS identifierar vilken CU som är kopplad till den begränsade mätpunkten." },
    { id: "BRSFLEX403-7", description: "FIS skickar en notifiering till ansvarig SP med detaljer om begränsningen (CU-ID, Tid, Effekt)." }
  ],
  preConditions: [
    { id: "BRSFLEX403-1", description: "BRS-FLEX-402 har exekverats och en begränsning är aktiv." },
    { id: "BRSFLEX403-2", description: "Det finns en aktiv CU kopplad till mätpunkten." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX403-3", description: "SP har mottagit notifiering med korrekta detaljer." }
    ],
    rejected: [
      { id: "BRSFLEX403-4", description: "Notifiering kunde inte levereras." }
    ]
  },
  infoObjects: [content403Output]
};
