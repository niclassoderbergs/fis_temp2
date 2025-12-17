
import { BRSData } from '../../types';
import { content142Input, content142Output } from '../../content-definitions';

export const brsFlex1420: BRSData = {
  id: "BRS-FLEX-1420",
  title: "FIS tar bort CU från SPG",
  purpose: "Automatisk systemprocess för att städa bort en resurs (CU) från en portfölj (SPG). Detta sker när flexavtalet upphör, resursen flyttas till en ny SPG, eller om den kopplas till en SPU som kräver utträde ur nuvarande SPG.",
  actors: [
    { role: "Initiator", description: "FIS (System/Admin)" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-1420: FIS tar bort CU från SPG (Admin/System)
    participant FIS as FIS
    participant SP as SP

    Note over FIS: Trigger: Avtal (202/2040), SPG-flytt (140) ELLER SPU-koppling (130)
    activate FIS
    FIS->>FIS: Identifiera kopplingar i SPG
    FIS->>FIS: ForceUnlinkCUfromSPG
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX1420-1", description: "SP har avslutat ett flexibilitetsavtal (via BRS-FLEX-202) för en CU som är med i en SPG." },
    { id: "BRSFLEX1420-2", description: "FIS har avslutat ett flexibilitetsavtal (via BRS-FLEX-2040) för en CU som är med i en SPG." },
    { id: "BRSFLEX1420-3", description: "SP har kopplat en CU till en SPU (via BRS-FLEX-130) som tidigare var kopplad till SPG." },
    { id: "BRSFLEX1420-4", description: "SP har kopplat en CU till en SPG (via BRS-FLEX-140) som tidigare var kopplad till SPG." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX1420-5", description: "FIS har avslutat kopplingen mellan den styrbara enheten och SPG:n på grund av en systemhändelse." }
    ],
    rejected: [
      { id: "BRSFLEX1420-6", description: "Fel vid borttagning." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX1420-7", description: "FIS kopplar bort en CU från en SPG (pga systemhändelse)." },
    { id: "BRSFLEX1420-8", description: "FIS notifierar SP om bortkopplingen." }
  ],
  infoObjects: [content142Input, content142Output]
};
