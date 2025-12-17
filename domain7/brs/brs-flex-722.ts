
import { BRSData } from '../../types';
import { content722Output } from '../../content-definitions';

export const brsFlex722: BRSData = {
  id: "BRS-FLEX-722",
  title: "BRP notifieras om verifierad aktivering",
  purpose: "Att informera BRP om aktiverade volymer så att de kan korrigera sina prognosmodeller. Eftersom BRP alltid ska skapa prognoser som om ingen flexibilitet kommer aktiveras (baseline), måste de kunna 'neutralisera' effekten av aktiveringen i sina historiska mätvärden. Denna process ger BRP informationen som krävs för att räkna tillbaka till vad förbrukningen hade varit utan aktivering.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "BRP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-722: Notifiering för Prognosjustering (BRP)
    participant FIS as FIS
    participant BRP as Balansansvarig

    Note over FIS: Trigger: BRS-FLEX-7120 (Klar)
    activate FIS
    loop För varje BRP
        FIS->>FIS: Hämta aktiverad volym
        FIS->>BRP: NotifyActivatedVolume (Neutraliseringsdata)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX722-1", description: "Allokering av verifierad volym per BRP är slutförd (via BRS-FLEX-7120)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX722-2", description: "Balansansvarig (BRP) har mottagit data för prognosjustering." }
    ],
    rejected: [
      { id: "BRSFLEX722-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX722-4", description: "Data ska presenteras aggregerat per elområde om inte detaljerad data krävs för reglering.", errorCode: "E_722_FORMAT_ERROR" },
    { id: "BRSFLEX722-5", description: "Notifiering sker endast om BRP har balansansvar för de ingående mätpunkterna.", errorCode: "E_722_BRP_MISMATCH" }
  ],
  process: [
    { id: "BRSFLEX722-6", description: "FIS skickar data för prognosjustering (neutralisering)." },
    { id: "BRSFLEX722-7", description: "Balansansvarig (BRP) tar emot informationen." }
  ],
  infoObjects: [content722Output]
};
