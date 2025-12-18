
import { BRSData } from '../../types';
import { content132Input, content132Output } from '../../content-definitions';

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
    participant Init as FIS (System/Admin)
    participant FIS as FIS

    Init->>FIS: ForceUnlinkCUfromSPU (SPU-ID, CU-ID)
    activate FIS
    FIS->>FIS: Validera relation
    FIS->>FIS: Ta bort koppling
    FIS->>FIS: Uppdatera SPU kapacitet
    FIS-->>Init: OK
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX1320-1", description: "SP har avslutat ett flexibilitetsavtal (via BRS-FLEX-202) för en CU som är med i en SPU." },
    { id: "BRSFLEX1320-2", description: "FIS har avslutat ett flexibilitetsavtal (via BRS-FLEX-2040) för en CU som är med i en SPU." },
    { id: "BRSFLEX1320-3", description: "SP har kopplat en CU till en SPU (via BRS-FLEX-130) som tidigare var kopplad till annan SPU." },
    { id: "BRSFLEX1320-4", description: "SP har kopplat en CU till en SPG (via BRS-FLEX-140) som tidigare var kopplad till SPU." },
    { id: "BRSFLEX1320-PRE-804", description: "SP har begärt avregistrering (via BRS-FLEX-804), vilket kräver att alla resurser kopplas loss." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1320-5", description: "FIS har avslutat kopplingen mellan den styrbara enheten och SPU:n på grund av en systemhändelse." }
    ],
    rejected: [
      { id: "BRSFLEX1320-6", description: "Fel vid borttagning." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX1320-7", description: "FIS kopplar bort en CU från en SPU (pga systemhändelse)." },
    { id: "BRSFLEX1320-8", description: "FIS initierar notifiering till SP (via separat process)." }
  ],
  infoObjects: [content132Input, content132Output]
};
