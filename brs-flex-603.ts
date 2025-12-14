
import { BRSData } from './types';
import { content603Output } from './content-definitions';

export const brsFlex603: BRSData = {
  id: "BRS-FLEX-603",
  title: "Notifiering om registrerade CU-mätvärden",
  purpose: "Att distribuera inkomna mätvärden (sub-metering) till berörda parter (t.ex. TSO, DSO eller balansansvarig) för att möjliggöra verifiering och avräkning. Detta säkerställer att alla parter har tillgång till samma underlag.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "TSO / DSO / Settlement Responsible" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-603: Notifiering om registrerade CU-mätvärden
    participant FIS as Flexibilitetsregistret
    participant Actor as TSO/DSO

    Note over FIS: Trigger: BRS-FLEX-601
    activate FIS
    FIS->>FIS: Identifiera prenumeranter
    FIS->>Actor: NotifyMeterData (CU-ID, Tidsserie)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX603-1", description: "Processen triggas när nya mätvärden har registrerats via BRS-FLEX-601." },
    { id: "BRSFLEX603-2", description: "FIS identifierar vilka aktörer som har rätt och behov av att ta del av mätdata för den aktuella resursen." },
    { id: "BRSFLEX603-3", description: "FIS skickar notifiering med mätserien till mottagarna." }
  ],
  preConditions: [
    { id: "BRSFLEX603-PRE-1", description: "BRS-FLEX-601 har exekverats framgångsrikt." }
  ],
  businessRules: [
    { id: "BRSFLEX603-BR-1", description: "Endast aktörer med en aktiv relation till mätpunkten/CU:n ska notifieras.", errorCode: "-" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX603-POST-1", description: "Mätdata har distribuerats." }
    ],
    rejected: [
      { id: "BRSFLEX603-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content603Output]
};
