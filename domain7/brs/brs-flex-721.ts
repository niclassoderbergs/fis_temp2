
import { BRSData } from '../../types';
import { content721Output } from '../../content-definitions';

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
    participant FIS as FIS
    participant DHV as Datahubben (DHV)

    Note over FIS: Trigger: BRS-FLEX-7120 (Klar)
    activate FIS
    FIS->>FIS: Sammanställ avräkningsunderlag
    FIS->>DHV: SendSettlementAdjustments (Period, BRP-Volymer)
    DHV-->>FIS: Ack
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX721-1", description: "Allokering av verifierad volym per BRP är slutförd (via BRS-FLEX-7120)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX721-3", description: "Datahubben (DHV) har mottagit underlag för nätavräkning." }
    ],
    rejected: [
      { id: "BRSFLEX721-4", description: "Överföring till DHV misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX721-5", description: "FIS skickar underlag för nätavräkning." },
    { id: "BRSFLEX721-6", description: "TSO och Datahubben (DHV) tar emot informationen." }
  ],
  infoObjects: [content721Output]
};
