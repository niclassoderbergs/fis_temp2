
import { BRSData } from '../../types';
import { content522Output } from '../../content-definitions';

export const brsFlex522: BRSData = {
  id: "BRS-FLEX-522",
  title: "Notifiering om registrerad baseline för CU",
  purpose: "Att distribuera den fastställda baseline-kurvan till berörda aktörer efter en leveransperiod. Denna kurva utgör referensen (kontrafaktisk förbrukning) mot vilken den faktiska leveransen mäts vid verifiering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "TSO / DSO / BRP / Elleverantör" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-522: Notifiering om registrerad baseline
    participant FIS as FIS
    participant TSO as TSO
    participant DSO as DSO
    participant BRP as BRP
    participant SUP as Elleverantör

    Note over FIS: Trigger: BRS-FLEX-7120 eller 7121
    activate FIS
    FIS->>FIS: Hämta fastställd baseline
    
    par Distribuera Baseline
        FIS->>TSO: NotifyBaselineData (CU-ID, Tidsserie)
        FIS->>DSO: NotifyBaselineData (CU-ID, Tidsserie)
        FIS->>BRP: NotifyBaselineData (CU-ID, Tidsserie)
        FIS->>SUP: NotifyBaselineData (CU-ID, Tidsserie)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX522-1", description: "FIS har allokerat verifierad volym för BRP (via BRS-FLEX-7120)." },
    { id: "BRSFLEX522-2", description: "FIS har allokerat verifierad volym för elleverantör (via BRS-FLEX-7121)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX522-3", description: "FIS har distribuerat baselineinformationen till BRP." },
      { id: "BRSFLEX522-4", description: "FIS har distribuerat baselineinformationen till Elleverantör." },
      { id: "BRSFLEX522-5", description: "FIS har distribuerat baselineinformationen till TSO." },
      { id: "BRSFLEX522-6", description: "FIS har distribuerat baselineinformationen till DSO." }
    ],
    rejected: [
      { id: "BRSFLEX522-7", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX522-8", description: "Notifiering ska endast ske för perioder där en aktivering eller verifieringsgrundande händelse har skett.", errorCode: "W_522_NO_ACTIVATION" },
    { id: "BRSFLEX522-9", description: "Tidsserien för baseline måste vara komplett för hela aktiveringsperioden.", errorCode: "E_522_INCOMPLETE_SERIES" },
    { id: "BRSFLEX522-10", description: "Mottagande part måste ha en aktiv relation till mätpunkten under perioden.", errorCode: "E_522_NO_RELATION" }
  ],
  process: [
    { id: "BRSFLEX522-11", description: "FIS distribuerar fastställd baselineinformation." },
    { id: "BRSFLEX522-12", description: "Berörda aktörer (TSO, DSO, BRP, Elleverantör) tar emot informationen." }
  ],
  infoObjects: [content522Output]
};
