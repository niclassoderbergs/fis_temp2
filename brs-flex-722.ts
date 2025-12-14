
import { BRSData } from './types';
import { content722Output } from './content-definitions';

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
    participant FIS as Flexibilitetsregistret
    participant BRP as Balansansvarig

    Note over FIS: Trigger: BRS-FLEX-7120 (Klar)
    activate FIS
    loop För varje BRP
        FIS->>FIS: Hämta aktiverad volym
        FIS->>BRP: NotifyActivatedVolume (Neutraliseringsdata)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX722-1", description: "Processen startar automatiskt när BRS-FLEX-7120 är slutförd." },
    { id: "BRSFLEX722-2", description: "För varje BRP skapas ett meddelande med aktiverad volym." },
    { id: "BRSFLEX722-3", description: "Informationen syftar till att låta BRP justera sina historiska mätserier (neutralisering) för att förbättra framtida prognoser." }
  ],
  preConditions: [
    { id: "BRSFLEX722-PRE-1", description: "BRS-FLEX-7120 (BRP Allokering) har exekverats." }
  ],
  businessRules: [
    { id: "BRSFLEX722-BR-1", description: "Data ska presenteras så att det är tydligt hur mätvärdet ska korrigeras för att återfå baseline.", errorCode: "-" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX722-POST-1", description: "BRP har mottagit data för prognosjustering." }
    ],
    rejected: [
      { id: "BRSFLEX722-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content722Output]
};
