
import { MPSData } from '../../types';

export const mpsFlex800: MPSData = {
  id: "MPS-FLEX-800",
  title: "Livscykelhantering Aktör",
  domain: "Domän 8: Aktörsadministration",
  purpose: "Att beskriva processerna för en marknadsaktörs (SP) väg in i, underhåll av, och väg ut ur systemet.",
  trigger: "Affärsbeslut av SP eller administrativt beslut av Systemägare.",
  scenarios: [
    {
      id: "MPS-FLEX-800-Sc1",
      title: "Onboarding av ny SP",
      description: "Processen från registrering till godkänd marknadsaktör.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-800-Sc1: Onboarding
    participant SP as SP
    participant FIS as FIS
    participant Admin as FIS Admin

    SP->>FIS: Registrering (BRS-FLEX-801)
    FIS-->>SP: Konto skapat (Registered)
    
    SP->>FIS: Ansökan om kvalificering (BRS-FLEX-802)
    FIS->>Admin: Notifiera om granskning
    Admin->>FIS: Godkänn kvalificering
    FIS-->>SP: Status Active`,
      steps: [
        { 
          stepId: "MPS-FLEX-800-Sc1.1", role: "SP", action: "Registrera", 
          description: "SP registrerar företagsuppgifter.", 
          refBRS: "BRS-FLEX-801", refRule: "BRSFLEX801-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc1.2", role: "FIS", action: "Skapa konto", 
          description: "Systemet skapar ett konto med status Registered.", 
          refBRS: "BRS-FLEX-801", refRule: "BRSFLEX801-2" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc1.3", role: "SP", action: "Ansök", 
          description: "SP skickar in kvalificeringsunderlag.", 
          refBRS: "BRS-FLEX-802", refRule: "BRSFLEX802-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc1.4", role: "Admin", action: "Godkänn", 
          description: "Administratör godkänner ansökan.", 
          refBRS: "BRS-FLEX-802", refRule: "BRSFLEX802-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-800-Sc2",
      title: "Administrativa åtgärder (Avstängning/Återaktivering)",
      description: "Hantering av regelbrott eller tekniska problem.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-800-Sc2: Avstängning och Återaktivering
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Note over Admin: Problem upptäckt
    Admin->>FIS: Stäng av SP (BRS-FLEX-810)
    FIS->>SP: Notifiera avstängning
    
    Note over SP: SP åtgärdar problem
    Admin->>FIS: Återaktivera SP (BRS-FLEX-812)
    FIS->>SP: Notifiera återaktivering`,
      steps: [
        { 
          stepId: "MPS-FLEX-800-Sc2.1", role: "Admin", action: "Stäng av", 
          description: "Admin initierar tillfällig avstängning.", 
          refBRS: "BRS-FLEX-810", refRule: "BRSFLEX810-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.2", role: "FIS", action: "Verkställ", 
          description: "Systemet sätter status Suspended.", 
          refBRS: "BRS-FLEX-810", refRule: "BRSFLEX810-2" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.3", role: "Admin", action: "Återaktivera", 
          description: "Admin återställer status.", 
          refBRS: "BRS-FLEX-812", refRule: "BRSFLEX812-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc2.4", role: "FIS", action: "Verkställ", 
          description: "Systemet sätter status Active.", 
          refBRS: "BRS-FLEX-812", refRule: "BRSFLEX812-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-800-Sc3",
      title: "Avregistrering (Voluntary Exit)",
      description: "SP lämnar marknaden på egen begäran.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-800-Sc3: Frivilligt utträde
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: Begär utträde (BRS-FLEX-804)
    activate FIS
    FIS->>FIS: Kontrollera beroenden (Avtal/Bud)
    FIS-->>SP: Bekräfta datum
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-800-Sc3.1", role: "SP", action: "Begär utträde", 
          description: "SP begär att få avsluta sitt engagemang.", 
          refBRS: "BRS-FLEX-804", refRule: "BRSFLEX804-1" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc3.2", role: "FIS", action: "Validera", 
          description: "Systemet kontrollerar att inga aktiva avtal hindrar.", 
          refBRS: "BRS-FLEX-804", refRule: "BRSFLEX804-4" 
        },
        { 
          stepId: "MPS-FLEX-800-Sc3.3", role: "FIS", action: "Bekräfta", 
          description: "Systemet schemalägger avslut.", 
          refBRS: "BRS-FLEX-804", refRule: "BRSFLEX804-2" 
        }
      ]
    }
  ]
};
