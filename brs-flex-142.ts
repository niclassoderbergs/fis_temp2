
import { BRSData } from './types';
import { content142Input, content142Output } from './content-definitions';

export const brsFlex142: BRSData = {
  id: "BRS-FLEX-1420",
  title: "FIS tar bort CU från SPG",
  purpose: "Automatisk systemprocess för att städa bort en resurs (CU) från en portfölj (SPG). Detta sker när flexavtalet upphör, resursen flyttas till en ny SPG, eller om den kopplas till en SPU som kräver utträde ur nuvarande SPG.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1420: FIS tar bort CU från SPG (Admin/System)
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Note over FIS: Trigger: Avtal (202/2040), SPG-flytt (140) ELLER SPU-koppling (130)
    activate FIS
    FIS->>FIS: Identifiera kopplingar i SPG
    FIS->>FIS: ForceUnlinkCUfromSPG
    FIS->>FIS: Trigger BRS-FLEX-144 (Notify SP)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX1420-8", description: "FIS initierar borttagning av en CU från en SPG." },
    { id: "BRSFLEX1420-9", description: "Detta sker automatiskt om grunden för innehavet (flexavtalet) försvunnit, om resursen kopplas till en annan SPG (140), eller om resursen kopplas till en SPU (130)." },
    { id: "BRSFLEX1420-10", description: "Systemet tar bort relationen." },
    { id: "BRSFLEX1420-11", description: "Systemet triggar BRS-FLEX-144 för att notifiera SP." }
  ],
  preConditions: [
    { id: "BRSFLEX1420-1", description: "BRS-FLEX-202 (SP avslutar avtal) har exekverats." },
    { id: "BRSFLEX1420-2", description: "ELLER BRS-FLEX-2040 (FIS avslutar avtal) har exekverats." },
    { id: "BRSFLEX1420-3", description: "ELLER BRS-FLEX-140 exekveras för en CU som redan ligger i en annan SPG (Flytt)." },
    { id: "BRSFLEX1420-4", description: "ELLER BRS-FLEX-130 exekveras för en CU som ligger i en SPG (Flytt till SPU)." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1420-5", description: "Relationen har tagits bort administrativt." },
      { id: "BRSFLEX1420-6", description: "Notifieringsprocess (BRS-FLEX-144) har initierats." }
    ],
    rejected: [
      { id: "BRSFLEX1420-7", description: "Fel vid borttagning." }
    ]
  },
  infoObjects: [content142Input, content142Output]
};
