
import { BRSData } from './types';
import { content132Input, content132Output } from './content-definitions';

export const brsFlex1320: BRSData = {
  id: "BRS-FLEX-1320",
  title: "FIS tar bort CU från SPU",
  purpose: "Automatisk systemprocess för att koppla bort en CU från en SPU. Detta sker antingen när flexavtalet upphör, när resursen flyttas till en ny SPU, eller om den kopplas till en SPG som kräver utträde ur nuvarande SPU.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1320: FIS tar bort CU från SPU (Admin/System)
    participant FIS as Flexibilitetsregistret
    participant SP as SP

    Note over FIS: Trigger: Avslut (202/2040), SPU-flytt (130) ELLER SPG-koppling (140)
    activate FIS
    FIS->>FIS: Identifiera kopplingar i SPU
    FIS->>FIS: ForceUnlinkCUfromSPU
    FIS->>FIS: Trigger BRS-FLEX-134 (Notify SP)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX1320-8", description: "FIS initierar borttagning av en CU från en SPU." },
    { id: "BRSFLEX1320-9", description: "Detta sker automatiskt om grunden för innehavet (flexavtalet) försvunnit, om resursen kopplas till en annan SPU (130), eller om resursen kopplas till en SPG (140)." },
    { id: "BRSFLEX1320-10", description: "Systemet tar bort relationen." },
    { id: "BRSFLEX1320-11", description: "Systemet triggar BRS-FLEX-134 för att notifiera SP." }
  ],
  preConditions: [
    { id: "BRSFLEX1320-1", description: "BRS-FLEX-202 (SP avslutar avtal) har exekverats." },
    { id: "BRSFLEX1320-2", description: "ELLER BRS-FLEX-2040 (FIS avslutar avtal) har exekverats." },
    { id: "BRSFLEX1320-3", description: "ELLER BRS-FLEX-130 exekveras för en CU som redan ligger i en annan SPU (Flytt)." },
    { id: "BRSFLEX1320-4", description: "ELLER BRS-FLEX-140 exekveras för en CU som ligger i en SPU (Flytt till SPG)." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1320-5", description: "Relationen har tagits bort administrativt." },
      { id: "BRSFLEX1320-6", description: "Notifieringsprocess (BRS-FLEX-134) har initierats." }
    ],
    rejected: [
      { id: "BRSFLEX1320-7", description: "Fel vid borttagning." }
    ]
  },
  infoObjects: [content132Input, content132Output]
};
