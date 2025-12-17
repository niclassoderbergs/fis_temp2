
import { MPSData } from '../../types';

// --- MPS-FLEX-200: Hantering av Flexibilitetsavtal ---
export const mpsFlex200: MPSData = {
  id: "MPS-FLEX-200",
  title: "Livscykelhantering Flexavtal",
  domain: "Domän 2: Avtal & Marknad",
  purpose: "Att hantera hela livscykeln för den kommersiella kopplingen mellan en SP och en CU (Flexibilitetsavtal). Detta inkluderar nytecknande, uppdatering, samt avslut (både frivilligt och tvingande).",
  trigger: "Affärshändelse (Nytt kontrakt) eller Systemhändelse (Flytt/Byte).",
  scenarios: [
    {
      id: "MPS-FLEX-200-Sc1",
      title: "Registrering av nytt Flexavtal",
      description: "SP registrerar ett nytt avtal för att kunna handla med en resurs.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-200-Sc1: Tecknande av Flexavtal
    participant SP as SP
    participant FIS as FIS
    participant DHV as Datahub (DHV)

    Note over SP: Affärshändelse: Kontrakt tecknat med kund för flexibilitetstjänst
    SP->>FIS: Registrera avtal (BRS-FLEX-201)
    activate FIS
    FIS->>DHV: Verifiera kundrelation på mätpunkt
    DHV-->>FIS: Kundrelation bekräftad
    FIS->>FIS: Lagra flexavtal
    FIS-->>SP: Kvittens med avtals-ID
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-200-Sc1.1", role: "SP", action: "Registrering", 
          description: "SP skickar in uppgifter om nytt avtal (CU + Startdatum).", 
          refBRS: "BRS-FLEX-201", refRule: "BRSFLEX201-1" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc1.2", role: "FIS", action: "Validera & Spara", 
          description: "FIS validerar mot Datahub och sparar avtalet.", 
          refBRS: "BRS-FLEX-201", refRule: "BRSFLEX201-2" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc1.3", role: "FIS", action: "Kvittens", 
          description: "FIS bekräftar registreringen.", 
          refBRS: "BRS-FLEX-201", refRule: "BRSFLEX201-3" 
        }
      ]
    },
    {
      id: "MPS-FLEX-200-Sc4",
      title: "Tvingande avslut (Systeminitierat)",
      description: "Hantering av 'Switch' (Leverantörsbyte) eller 'Move-out' (Utflytt) via signaler från Datahubben.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-200-Sc4: Avtalsavslut pga flytt eller byte
    participant DHV as Datahub (DHV)
    participant FIS as FIS
    participant SP as SP (Gammal)

    Note over FIS: Systemtrigger: Kund har flyttat ut eller bytt leverantör enligt Datahubben
    DHV->>FIS: Notifiering (Move-out händelse)
    activate FIS
    FIS->>FIS: Stäng aktivt avtal per händelsedatum (BRS-FLEX-2040)
    FIS->>SP: Skicka notifiering om förtida avslut (BRS-FLEX-205)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-200-Sc4.1", role: "System", action: "Trigger (DHV)", 
          description: "Datahub indikerar att förutsättningarna för avtalet upphört (t.ex. kunden flyttat).", 
          refBRS: "BRS-FLEX-2040", refRule: "BRSFLEX2040-2" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc4.2", role: "FIS", action: "Avsluta Avtal", 
          description: "FIS sätter slutdatum till dagen innan händelsen.", 
          refBRS: "BRS-FLEX-2040", refRule: "BRSFLEX2040-3" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc4.3", role: "FIS", action: "Notifiera SP", 
          description: "FIS informerar den drabbade SP:n om att avtalet stängts.", 
          refBRS: "BRS-FLEX-205", refRule: "BRSFLEX205-1" 
        },
        { 
          stepId: "MPS-FLEX-200-Sc4.4", role: "SP", action: "Mottagande", 
          description: "SP tar emot notifieringen.", 
          refBRS: "BRS-FLEX-205", refRule: "BRSFLEX205-2" 
        }
      ]
    }
  ]
};
