
import { BRSData } from './types';
import { content201Input, content201Output } from './content-definitions';

export const brsFlex201: BRSData = {
  id: "BRS-FLEX-201",
  title: "SP registrerar Flexavtal",
  purpose: "Att koppla en CU till en SP för att kunna sälja flexibilitet.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-201: SP registrerar Flexavtal
    participant SP as SP
    participant FIS as Flexibilitetsregistret
    participant DHV as DHV

    SP->>FIS: RegisterFlexAgreement (CU-ID)
    activate FIS
    FIS->>DHV: Validera kund & anläggning
    DHV-->>FIS: OK
    
    FIS->>FIS: Validera affärsregler
    
    alt Validering OK
        opt Konflikt hittad (Switch)
            FIS->>FIS: Trigga BRS-FLEX-2040 (Avsluta gammalt)
        end

        FIS->>FIS: Skapa nytt avtal
        FIS-->>SP: Acknowledgement
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX201-10", description: "SP initierar registrering av ett flexavtal för en CU." },
    { id: "BRSFLEX201-11", description: "FIS validerar mot DHV att kunden och anläggningen är aktiva." },
    { id: "BRSFLEX201-12", description: "FIS kontrollerar om det redan finns ett registrerat flexavtal för angiven CU som är giltigt vid det nya avtalets startdatum." },
    { id: "BRSFLEX201-13", description: "Om (och endast om) ett sådant avtal hittas, triggas BRS-FLEX-2040 för att avsluta det gamla avtalet (Switch-principen)." },
    { id: "BRSFLEX201-14", description: "Det nya avtalet skapas." }
  ],
  preConditions: [
    { id: "BRSFLEX201-1", description: "SP vill registrera ett nytt Flexavtal för en CU." }
  ],
  businessRules: [
    { id: "BRSFLEX201-6", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_201_CU_NOT_FOUND" },
    { id: "BRSFLEX201-7", description: "Kopplat Mätpunkts-ID måste finnas och vara aktivt i DHV.", errorCode: "E_201_MP_NOT_FOUND_IN_DHV" },
    { id: "BRSFLEX201-8", description: "Angivet Kund-ID måste vara kopplat till Mätpunkten i DHV.", errorCode: "E_201_CUSTOMER_MISMATCH" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX201-2", description: "Nytt avtal har skapats." },
      { id: "BRSFLEX201-3", description: "Eventuellt tidigare avtal har avslutats automatiskt (om konflikt fanns, se BRS-FLEX-2040)." },
      { id: "BRSFLEX201-4", description: "SP har mottagit en positiv kvittens." }
    ],
    rejected: [
      { id: "BRSFLEX201-5", description: "Inget avtal har skapats." }
    ]
  },
  infoObjects: [content201Input, content201Output]
};
