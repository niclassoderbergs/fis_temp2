
import { MPSData } from '../../types';

export const mpsFlex300: MPSData = {
  id: "MPS-FLEX-300",
  title: "Förkvalificering av Resurser",
  domain: "Domän 3: Produkt & Kvalificering",
  purpose: "Att säkerställa att resurser uppfyller både marknadsprodukternas tekniska krav (Produktförkvalificering) och nätets lokala krav (Nätförkvalificering) innan de tillåts delta på marknaden.",
  trigger: "SP vill aktivera en resurs på en specifik marknad.",
  scenarios: [
    {
      id: "MPS-FLEX-300-Sc1",
      title: "Produktförkvalificering (TSO)",
      description: "Processen för att testa och godkänna en resurs (SPU/SPG) för en specifik marknadsprodukt.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-300-Sc1: Produktförkvalificering för stödtjänster
    participant SP as SP
    participant FIS as FIS
    participant TSO as Systemoperatör (TSO)

    Note over SP: Affärshändelse: Resurs är redo för tekniska tester mot marknadsprodukt
    SP->>FIS: Ansök om kvalificering (BRS-FLEX-311)
    activate FIS
    FIS->>TSO: Skicka tekniskt testunderlag (BRS-FLEX-314)
    deactivate FIS
    
    Note over TSO: Fysiskt funktionstest genomförs i nätet
    TSO->>FIS: Rapportera godkänt/underkänt test (BRS-FLEX-312)
    activate FIS
    FIS->>FIS: Uppdatera resursens status till 'Qualified'
    FIS->>SP: Skicka slutgiltigt besked (BRS-FLEX-313)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-300-Sc1.1", role: "SP", action: "Initiera Ansökan", 
          description: "SP skickar in ansökan om produktförkvalificering.", 
          refBRS: "BRS-FLEX-311", refRule: "BRSFLEX311-1" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc1.2", role: "FIS", action: "Sätt Status", 
          description: "FIS sätter status till 'Pending Test'.", 
          refBRS: "BRS-FLEX-311", refRule: "BRSFLEX311-2" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc1.3", role: "FIS", action: "Bekräfta Mottagande", 
          description: "FIS skickar kvittens på mottagen ansökan till SP.", 
          refBRS: "BRS-FLEX-311", refRule: "BRSFLEX311-4" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc1.4", role: "FIS", action: "Initiera Notifiering TSO", 
          description: "FIS påbörjar distribution av underlag till TSO.", 
          refBRS: "BRS-FLEX-314", refRule: "BRSFLEX314-1" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc1.5", role: "FIS", action: "Slutför Notifiering TSO", 
          description: "TSO har mottagit underlag för test.", 
          refBRS: "BRS-FLEX-314", refRule: "BRSFLEX314-2" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc1.6", role: "TSO", action: "Rapportera Testresultat", 
          description: "TSO skickar in resultatet av testet (Qualified/Rejected).", 
          refBRS: "BRS-FLEX-312", refRule: "BRSFLEX312-1" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc1.7", role: "FIS", action: "Uppdatera Status", 
          description: "FIS uppdaterar resursens status till 'Qualified' eller 'Rejected'.", 
          refBRS: "BRS-FLEX-312", refRule: "BRSFLEX312-2" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc1.8", role: "FIS", action: "Kvittera Resultat", 
          description: "FIS bekräftar mottagandet av resultatet till TSO.", 
          refBRS: "BRS-FLEX-312", refRule: "BRSFLEX312-3" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc1.9", role: "FIS", action: "Initiera Notifiering SP", 
          description: "FIS påbörjar notifiering till SP om resultatet.", 
          refBRS: "BRS-FLEX-313", refRule: "BRSFLEX313-1" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc1.10", role: "SP", action: "Ta emot Resultat", 
          description: "SP mottar notifiering om att resursen är kvalificerad (eller ej).", 
          refBRS: "BRS-FLEX-313", refRule: "BRSFLEX313-2" 
        }
      ]
    },
    {
      id: "MPS-FLEX-300-Sc2",
      title: "Nätförkvalificering (DSO)",
      description: "Processen för att kontrollera att aktivering av resursen inte skapar lokala nätproblem.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-300-Sc2: Nätanalys av flexibilitetsresurs
    participant SP as SP
    participant FIS as FIS
    participant DSO as Nätägare (DSO)

    Note over SP: Affärshändelse: Kontroll krävs om lokal aktivering kan skada elnätet
    SP->>FIS: Begär nätförkvalificering (BRS-FLEX-321)
    activate FIS
    FIS->>DSO: Skicka begäran om nätanalys (BRS-FLEX-322)
    deactivate FIS
    
    Note over DSO: Nätanalys och kapacitetskontroll utförs
    DSO->>FIS: Rapportera analyssvar (BRS-FLEX-323)
    activate FIS
    FIS->>FIS: Spara eventuella villkor för aktivering
    FIS->>SP: Skicka besked om nätgodkännande (BRS-FLEX-324)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-300-Sc2.1", role: "SP", action: "Begäran", 
          description: "SP begär nätförkvalificering för en eller flera resurser (CU/SPU).", 
          refBRS: "BRS-FLEX-321", refRule: "BRSFLEX321-1" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.2", role: "FIS", action: "Sätt Status", 
          description: "FIS sätter status till 'Pending Grid Check'.", 
          refBRS: "BRS-FLEX-321", refRule: "BRSFLEX321-2" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.3", role: "FIS", action: "Kvittens", 
          description: "FIS bekräftar mottagandet till SP.", 
          refBRS: "BRS-FLEX-321", refRule: "BRSFLEX321-3" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.4", role: "FIS", action: "Initiera Notifiering DSO", 
          description: "FIS identifierar berörda nätägare och skickar underlag.", 
          refBRS: "BRS-FLEX-322", refRule: "BRSFLEX322-1" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.5", role: "FIS", action: "Slutför Notifiering DSO", 
          description: "DSO har mottagit underlag för nätanalys.", 
          refBRS: "BRS-FLEX-322", refRule: "BRSFLEX322-2" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.6", role: "DSO", action: "Rapportera Resultat", 
          description: "DSO utför nätanalys och skickar in resultatet (Approved/Conditional/Rejected).", 
          refBRS: "BRS-FLEX-323", refRule: "BRSFLEX323-1" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.7", role: "FIS", action: "Uppdatera Status", 
          description: "FIS uppdaterar status baserat på DSO:s svar.", 
          refBRS: "BRS-FLEX-323", refRule: "BRSFLEX323-2" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.8", role: "FIS", action: "Spara Villkor", 
          description: "FIS lagrar eventuella villkor för godkännandet (t.ex. maxeffekt).", 
          refBRS: "BRS-FLEX-323", refRule: "BRSFLEX323-3" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.9", role: "FIS", action: "Kvittera Resultat", 
          description: "FIS bekräftar mottagandet till DSO.", 
          refBRS: "BRS-FLEX-323", refRule: "BRSFLEX323-4" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.10", role: "FIS", action: "Initiera Notifiering SP", 
          description: "FIS notifierar SP om utfallet och eventuella begränsningar.", 
          refBRS: "BRS-FLEX-324", refRule: "BRSFLEX324-1" 
        },
        { 
          stepId: "MPS-FLEX-300-Sc2.11", role: "SP", action: "Ta emot Resultat", 
          description: "SP tar emot beskedet om nätförkvalificering.", 
          refBRS: "BRS-FLEX-324", refRule: "BRSFLEX324-2" 
        }
      ]
    }
  ]
};
