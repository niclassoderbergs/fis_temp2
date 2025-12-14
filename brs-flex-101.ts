
import { BRSData } from './types';
import { content101Input, content101Output } from './content-definitions';

export const brsFlex101: BRSData = {
  id: "BRS-FLEX-101",
  title: "SP registrerar en CU",
  purpose: "Processen används av en SP för att registrera en ny Styrbar Enhet (Controllable Unit - CU) i Flexibilitetsregistret (FIS). Syftet är att skapa en unik identitet för en teknisk resurs och koppla denna till en specifik mätpunkt.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" },
    { role: "Sekundär", description: "DHV – via uppslag" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-101: SP registrerar en CU
    participant SP as SP
    participant FIS as Flexibilitetsregistret
    participant DHV as DHV

    SP->>FIS: RegisterControllableUnit
    activate FIS
    
    FIS->>DHV: Validera Mätpunkt (Request)
    activate DHV
    DHV-->>FIS: Mätpunkt Status (Response)
    deactivate DHV

    FIS->>FIS: Validera affärsregler
    
    alt Validering OK
        FIS->>FIS: Skapa CU (Status: Active/Under Construction)
        FIS-->>SP: RegisterControllableUnitAcknowledgement (CU-ID)
    else Validering Fel
        FIS-->>SP: Felmeddelande (Error)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX101-9", description: "SP skickar meddelandet RegisterControllableUnit till FIS innehållande tekniska attribut, Resursnamn och Mätpunkts-ID." },
    { id: "BRSFLEX101-10", description: "FIS kontrollerar att meddelandet följer schemat och att obligatoriska fält är ifyllda." },
    { id: "BRSFLEX101-11", description: "FIS gör ett uppslag mot DHV för att verifiera angivet Mätpunkts-ID." },
    { id: "BRSFLEX101-12", description: "FIS kontrollerar unicitet och behörighet." },
    { id: "BRSFLEX101-13", description: "Om valideringen är godkänd skapas objektet i databasen med status 'Under Construction' eller 'Active'." },
    { id: "BRSFLEX101-14", description: "FIS skickar RegisterControllableUnitAcknowledgement till SP med det nya CU-ID:t." }
  ],
  preConditions: [
    { id: "BRSFLEX101-1", description: "SP vill registrera en CU i FIS." }
  ],
  businessRules: [
    { id: "BRSFLEX101-6", description: "Mätpunkts-ID måste finnas i DHV och ha status 'Active' eller 'Connected'.", errorCode: "E_101_MP_NOT_FOUND" },
    { id: "BRSFLEX101-7", description: "Angivet Mätpunkts-ID får inte redan vara kopplat till en annan aktiv CU med samma tekniska specifikation som överlappar i tid.", errorCode: "E_101_DUPLICATE_RESOURCE" },
    { id: "BRSFLEX101-8", description: "Tekniska attribut (t.ex. MaxEffekt) får inte vara negativa värden.", errorCode: "E_GEN_INVALID_VALUE" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX101-2", description: "En ny Styrbar Enhet (CU) har skapats i FIS med status 'Under Construction' eller 'Active'." },
      { id: "BRSFLEX101-3", description: "Ett unikt UUID (CU-ID) har genererats och skickats som svar till SP." }
    ],
    rejected: [
      { id: "BRSFLEX101-4", description: "Inga data har sparats i Flexibilitetsregistret." },
      { id: "BRSFLEX101-5", description: "SP har mottagit en negativ kvittens med relevanta felkoder." }
    ]
  },
  infoObjects: [content101Input, content101Output]
};
