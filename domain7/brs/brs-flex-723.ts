
import { BRSData } from '../../types';
import { content723Output } from '../../content-definitions';

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
    participant FIS as FIS
    participant SUP as Elleverantör

    Note over FIS: Trigger: BRS-FLEX-7121 (Klar)
    activate FIS
    loop För varje påverkad Leverantör
        FIS->>FIS: Hämta specifik data
        FIS->>SUP: NotifyCompensationData (Volym, Period, CUs)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX723-1", description: "Allokering av verifierad volym per Elleverantör är slutförd (via BRS-FLEX-7121)." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX723-2", description: "Elleverantör har mottagit underlag för kompensation." }
    ],
    rejected: [
      { id: "BRSFLEX723-3", description: "Notifiering misslyckades." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX723-4", description: "Leverantören ska endast se data för sina egna kunder (mätpunkter) av integritetsskäl.", errorCode: "E_723_DATA_PRIVACY" },
    { id: "BRSFLEX723-5", description: "Kompensationsvolymen måste vara verifierad och slutgiltig.", errorCode: "E_723_DATA_NOT_FINAL" }
  ],
  process: [
    { id: "BRSFLEX723-6", description: "FIS skickar underlag för ekonomisk kompensation." },
    { id: "BRSFLEX723-7", description: "Elleverantör tar emot informationen." }
  ],
  infoObjects: [content723Output]
};
