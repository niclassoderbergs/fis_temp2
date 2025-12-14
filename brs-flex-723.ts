
import { BRSData } from './types';
import { content723Output } from './content-definitions';

export const brsFlex723: BRSData = {
  id: "BRS-FLEX-723",
  title: "Elleverantör notifieras om kompensation",
  purpose: "Att informera en Elleverantör (Electricity Supplier) om de energivolymer som allokerats till dem för kompensation (eller debitering) till följd av flexibilitetsaktiveringar på deras kunders mätpunkter.",
  actors: [
    { role: "Initiator", description: "FIS (System)" },
    { role: "Mottagare", description: "Elleverantör (Supplier)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-723: Notifiering om kompensation (Leverantör)
    participant FIS as Flexibilitetsregistret
    participant SUP as Elleverantör

    Note over FIS: Trigger: BRS-FLEX-7121 (Klar)
    activate FIS
    loop För varje påverkad Leverantör
        FIS->>FIS: Hämta specifik data
        FIS->>SUP: NotifyCompensationData (Volym, Period, CUs)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX723-1", description: "Processen startar automatiskt när BRS-FLEX-7121 (Allokering per Leverantör) är slutförd." },
    { id: "BRSFLEX723-2", description: "För varje identifierad leverantör skapas ett meddelande." },
    { id: "BRSFLEX723-3", description: "FIS skickar information om den volym som ska ligga till grund för ekonomisk kompensation." }
  ],
  preConditions: [
    { id: "BRSFLEX723-PRE-1", description: "BRS-FLEX-7121 har exekverats." }
  ],
  businessRules: [
    { id: "BRSFLEX723-BR-1", description: "Leverantören ska endast se data för sina egna kunder (mätpunkter).", errorCode: "-" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX723-POST-1", description: "Elleverantör har mottagit kompensationsunderlag." }
    ],
    rejected: [
      { id: "BRSFLEX723-POST-2", description: "Notifiering misslyckades." }
    ]
  },
  infoObjects: [content723Output]
};
