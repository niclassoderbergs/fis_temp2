
import { BRSData } from './types';
import { content206Input, content206Output } from './content-definitions';

export const brsFlex206: BRSData = {
  id: "BRS-FLEX-206",
  title: "SP begär Flexavtalsinformation",
  purpose: "Möjliggör för SP att hämta detaljerad information om sina registrerade Flexavtal. Detta används för avstämning av portfölj och giltighetstider.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-206: SP begär Flexavtalsinformation
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: GetFlexAgreementView (Flexibilitetsavtals-ID eller Filter)
    activate FIS
    FIS->>FIS: Validera regler och behörighet
    FIS->>FIS: Hämta Avtalsdata
    
    alt Data hittad och behörig
        FIS-->>SP: ShowFlexAgreementView (Data)
    else Ej behörig eller hittas ej
        FIS-->>SP: Error (Not Found / Unauthorized)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX206-10", description: "SP skickar begäran om att se data för ett specifikt avtal eller en lista av avtal (filtrerat på t.ex. CU-ID)." },
    { id: "BRSFLEX206-11", description: "FIS verifierar att anropande part står som ägare (SP) på avtalen." },
    { id: "BRSFLEX206-12", description: "FIS returnerar efterfrågad information." }
  ],
  preConditions: [
    { id: "BRSFLEX206-1", description: "SP vill se information om ett eller flera Flexavtal." }
  ],
  businessRules: [
    { id: "BRSFLEX206-6", description: "Angivet Flexibilitetsavtals-ID måste existera i systemet.", errorCode: "E_206_AGREEMENT_NOT_FOUND" },
    { id: "BRSFLEX206-7", description: "SP måste vara registrerad på angivet Flexibilitetsavtals-ID.", errorCode: "E_206_UNAUTHORIZED" },
    { id: "BRSFLEX206-8", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_206_CU_NOT_FOUND" },
    { id: "BRSFLEX206-9", description: "Angivet Flexibilitetsavtals-ID måste vara kopplat till angivet CU-ID.", errorCode: "E_206_MISMATCH_AGREEMENT_CU" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX206-2", description: "Avtalsinformation har returnerats till SP." }
    ],
    rejected: [
      { id: "BRSFLEX206-3", description: "Ingen data returnerad p.g.a. behörighetsfel, valideringsfel eller felaktigt ID." }
    ]
  },
  infoObjects: [content206Input, content206Output]
};
