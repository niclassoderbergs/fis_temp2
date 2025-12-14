
import { BRSData } from './types';
import { content721Output } from './content-definitions';

export const brsFlex721: BRSData = {
  id: "BRS-FLEX-721",
  title: "TSO notifieras om obalansjustering",
  purpose: "Att informera TSO och specifikt Datahubben (DHV) om resultatet av flexibilitetsaktiveringar. Detta är nödvändigt för att DHV ska kunna utföra obalansjustering för påverkade BRPs så att nätavräkning utförs korrekt.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare A", description: "TSO" },
    { role: "Mottagare B", description: "Datahubben (DHV) - Settlement Responsible" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-721: Notifiering för Nätavräkning (DHV)
    participant FIS as Flexibilitetsregistret
    participant DHV as Datahubben (DHV)

    Note over FIS: Trigger: BRS-FLEX-7120 (Klar)
    activate FIS
    FIS->>FIS: Sammanställ avräkningsunderlag
    FIS->>DHV: SendSettlementAdjustments (Period, BRP-Volymer)
    DHV-->>FIS: Ack
    deactivate FIS`,
  process: [
    { id: "BRSFLEX721-1", description: "Processen startar automatiskt när BRS-FLEX-7120 (BRP-allokering) är slutförd." },
    { id: "BRSFLEX721-2", description: "FIS formaterar datan enligt specifikation för Datahubben (DHV)." },
    { id: "BRSFLEX721-3", description: "FIS skickar justeringsvolymerna till DHV så att nätavräkningen kan ta hänsyn till aktiverad flexibilitet." }
  ],
  preConditions: [
    { id: "BRSFLEX721-PRE-1", description: "BRS-FLEX-7120 (BRP Allokering) har exekverats." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX721-POST-1", description: "DHV har mottagit underlag för nätavräkning." }
    ],
    rejected: [
      { id: "BRSFLEX721-POST-2", description: "Överföring till DHV misslyckades." }
    ]
  },
  infoObjects: [content721Output]
};
