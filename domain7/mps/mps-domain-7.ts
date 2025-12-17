
import { MPSData } from '../../types';

// --- MPS-FLEX-700: Budgivning ---
export const mpsFlex700: MPSData = {
  id: "MPS-FLEX-700",
  title: "Budgivning och Kapacitetskontroll",
  domain: "Domän 7: Verifiering & Budgivning",
  purpose: "Att hantera inskick av bud från olika marknadsplatser samt validera att det finns teknisk täckning (kapacitet) för dessa bud innan de accepteras slutgiltigt.",
  trigger: "Marknadsaktör skickar in bud inför Gate Closure.",
  scenarios: [
    {
      id: "MPS-FLEX-700-Sc1a",
      title: "Hantering av Kapacitetsbud (TSO)",
      description: "Process för att ta emot och validera bud från balansmarknaden.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-700-Sc1a: Teknisk kontroll av bud på balansmarknaden
    participant TSO as TSO (Balansmarknad)
    participant FIS as FIS

    Note over TSO: Affärshändelse: Gate Closure närmar sig för nästa marknadsperiod
    TSO->>FIS: Registrera kapacitetsbud (BRS-FLEX-701)
    activate FIS
    FIS->>FIS: Beräkna aktuell aggregerad kapacitet (BRS-FLEX-7011)
    FIS->>TSO: Skicka valideringsbesked (BRS-FLEX-705)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-700-Sc1a.1", role: "TSO", action: "Registrera Bud", 
          description: "TSO skickar in ett kapacitetsbud.", 
          refBRS: "BRS-FLEX-701", refRule: "BRSFLEX701-1" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.2", role: "FIS", action: "Lagra Bud", 
          description: "FIS lagrar budet preliminärt.", 
          refBRS: "BRS-FLEX-701", refRule: "BRSFLEX701-2" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.3", role: "TSO", action: "Ta emot Kvittens", 
          description: "TSO tar emot kvittens på registreringen.", 
          refBRS: "BRS-FLEX-701", refRule: "BRSFLEX701-3" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.4", role: "FIS", action: "Kapacitetskontroll", 
          description: "Systemet beräknar om resurserna täcker budet (aggregerad nivå).", 
          refBRS: "BRS-FLEX-7011", refRule: "BRSFLEX7011-1" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.5", role: "FIS", action: "Lagra Resultat", 
          description: "FIS lagrar resultatet av kapacitetskontrollen.", 
          refBRS: "BRS-FLEX-7011", refRule: "BRSFLEX7011-3" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.6", role: "FIS", action: "Notifiera Resultat", 
          description: "FIS meddelar TSO om budet är tekniskt godkänt (Valid/Invalid).", 
          refBRS: "BRS-FLEX-705", refRule: "BRSFLEX705-1" 
        },
        { 
          stepId: "MPS-FLEX-700-Sc1a.7", role: "TSO", action: "Ta emot Resultat", 
          description: "TSO tar emot notifiering om budets kapacitet.", 
          refBRS: "BRS-FLEX-705", refRule: "BRSFLEX705-2" 
        }
      ]
    }
  ]
};

// --- MPS-FLEX-710: Aktivering och Verifiering ---
export const mpsFlex710: MPSData = {
  id: "MPS-FLEX-710",
  title: "Aktivering och Verifiering",
  domain: "Domän 7: Verifiering & Budgivning",
  purpose: "Att registrera att en leverans (aktivering) har skett och därefter verifiera utfallet genom att jämföra mätvärden mot bud och baseline.",
  trigger: "Marknadshändelse (Avrop) och efterföljande tidsfrist för mätvärden.",
  scenarios: [
    {
      id: "MPS-FLEX-710-Sc1a",
      title: "Verifiering av Balansprodukt (TSO)",
      description: "Hela flödet från att TSO registrerar ett avrop till att verifieringsresultatet distribueras.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-710-Sc1a: Verifiering av levererat balansavrop
    participant FIS as FIS
    participant SO as Marknadsparter (TSO/SP/BRP)

    Note over FIS: Trigger: Rapporteringsfönster för mätdata stängt och volymberäkning klar
    activate FIS
    FIS->>FIS: Jämför levererad volym mot accepterat bud (BRS-FLEX-7110)
    FIS->>SO: Skicka verifieringsbesked till alla parter (BRS-FLEX-714/715)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-710-Sc1a.1", role: "System", action: "Starta Volymberäkning", 
          description: "Systemet initierar beräkning baserat på TSO-aktivering och mätdata.", 
          refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-1",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.2", role: "FIS", action: "Spara Volym", 
          description: "FIS beräknar och lagrar levererad volym.", 
          refBRS: "BRS-FLEX-6110", refRule: "BRSFLEX6110-4",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.3", role: "System", action: "Trigger Verifiering", 
          description: "Verifieringsprocessen triggas av att volymberäkningen är klar.", 
          refBRS: "BRS-FLEX-7110", refRule: "BRSFLEX7110-5"
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.4", role: "FIS", action: "Resultat Klart", 
          description: "FIS har beräknat och lagrat verifieringsresultatet.", 
          refBRS: "BRS-FLEX-7110", refRule: "BRSFLEX7110-6" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.5", role: "FIS", action: "Underlag Skapat", 
          description: "FIS har skapat underlag för avräkning.", 
          refBRS: "BRS-FLEX-7110", refRule: "BRSFLEX7110-7" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.6", role: "FIS", action: "Notifiera SP", 
          description: "FIS skickar verifieringsresultatet till Service Provider.", 
          refBRS: "BRS-FLEX-714", refRule: "BRSFLEX714-1" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.7", role: "SP", action: "Ta emot Resultat", 
          description: "SP tar emot verifieringsresultatet.", 
          refBRS: "BRS-FLEX-714", refRule: "BRSFLEX714-2" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.8", role: "FIS", action: "Notifiera TSO", 
          description: "FIS skickar verifieringsresultatet (Status & Volym) till TSO.", 
          refBRS: "BRS-FLEX-715", refRule: "BRSFLEX715-1" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.9", role: "TSO", action: "Ta emot Resultat", 
          description: "TSO tar emot verifieringsresultatet.", 
          refBRS: "BRS-FLEX-715", refRule: "BRSFLEX715-2" 
        },
        { 
          stepId: "MPS-FLEX-710-Sc1a.10", role: "Settlement", action: "Ta emot Resultat", 
          description: "Settlement Responsible tar emot verifieringsresultatet.", 
          refBRS: "BRS-FLEX-715", refRule: "BRSFLEX715-3" 
        }
      ]
    }
  ]
};

// --- MPS-FLEX-720: Avräkning och Allokering ---
export const mpsFlex720: MPSData = {
  id: "MPS-FLEX-720",
  title: "Avräkning och Allokering",
  domain: "Domän 7: Verifiering & Budgivning",
  purpose: "Att allokera de verifierade volymerna på berörda aktörer (BRP och Elleverantör) och distribuera detta underlag för ekonomisk reglering och prognosjustering.",
  trigger: "Verifiering (MPS-FLEX-710) är slutförd.",
  scenarios: [
    {
      id: "MPS-FLEX-720-Sc1",
      title: "Allokering och Distribution av Avräkningsunderlag",
      description: "Processen där verifierad volym delas upp per aktör och skickas ut.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-720-Sc1: Ekonomisk allokering och distribution
    participant FIS as FIS
    participant DHV as Datahubben (DHV)
    participant BRP as BRP
    participant SUP as Elleverantör

    Note over FIS: Trigger: Verifieringsresultat fastställt och underlag för avräkning genererat
    
    activate FIS
    FIS->>FIS: Allokera volym per BRP för obalansjustering (BRS-FLEX-7120)
    FIS->>FIS: Allokera volym per Elleverantör för kompensation (BRS-FLEX-7121)
    
    FIS->>DHV: Skicka underlag för nätavräkning (BRS-FLEX-721)
    DHV-->>FIS: Bekräftat
    
    FIS->>BRP: Skicka data för prognosjustering (BRS-FLEX-722)
    BRP-->>FIS: Bekräftat

    FIS->>SUP: Skicka data för kompensationsutbetalning (BRS-FLEX-723)
    SUP-->>FIS: Bekräftat
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-720-Sc1.1", role: "System", action: "Volymberäkning klar", 
          description: "Volymberäkning från systemet är genomförd.", 
          refBRS: "BRS-FLEX-7110", refRule: "BRSFLEX7110-5",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.2", role: "System", action: "Resultat lagrat", 
          description: "Verifieringsresultat är beräknat och lagrat.", 
          refBRS: "BRS-FLEX-7110", refRule: "BRSFLEX7110-6",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.3", role: "System", action: "Underlag skapat", 
          description: "Underlag för avräkning har genererats.", 
          refBRS: "BRS-FLEX-7110", refRule: "BRSFLEX7110-7",
          isPrerequisite: true
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.4", role: "FIS", action: "Initiera Allokering BRP", 
          description: "FIS summerar volymer per BRP for obalansjustering (Start).", 
          refBRS: "BRS-FLEX-7120", refRule: "BRSFLEX7120-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.5", role: "FIS", action: "Beräkna BRP-allokering", 
          description: "FIS har beräknat och allokerat volym per BRP (Resultat).", 
          refBRS: "BRS-FLEX-7120", refRule: "BRSFLEX7120-2" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.6", role: "FIS", action: "Lagra BRP-underlag", 
          description: "FIS lagrar underlag för obalansjustering av BRP.", 
          refBRS: "BRS-FLEX-7120", refRule: "BRSFLEX7120-3" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.7", role: "FIS", action: "Initiera Allokering Lev", 
          description: "FIS summerar volymer per Elleverantör för kompensations (Start).", 
          refBRS: "BRS-FLEX-7121", refRule: "BRSFLEX7121-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.8", role: "FIS", action: "Beräkna Lev-allokering", 
          description: "FIS har beräknat och allokerat volym per Elleverantör (Resultat).", 
          refBRS: "BRS-FLEX-7121", refRule: "BRSFLEX7121-2" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.9", role: "FIS", action: "Lagra Lev-underlag", 
          description: "FIS lagrar underlag för kompensation.", 
          refBRS: "BRS-FLEX-7121", refRule: "BRSFLEX7121-3" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.10", role: "FIS", action: "Till DHV", 
          description: "FIS skickar obalansunderlag till Datahubben (TSO).", 
          refBRS: "BRS-FLEX-721", refRule: "BRSFLEX721-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.11", role: "DHV", action: "Ta emot Underlag", 
          description: "Datahubben tar emot underlag för nätavräkning.", 
          refBRS: "BRS-FLEX-721", refRule: "BRSFLEX721-3" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.12", role: "FIS", action: "Till BRP", 
          description: "FIS skickar prognosjusteringsunderlag till BRP.", 
          refBRS: "BRS-FLEX-722", refRule: "BRSFLEX722-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.13", role: "BRP", action: "Ta emot Data", 
          description: "BRP tar emot neutraliseringsdata.", 
          refBRS: "BRS-FLEX-722", refRule: "BRSFLEX722-2" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.14", role: "FIS", action: "Till Leverantör", 
          description: "FIS skickar kompensationsunderlag till Elleverantör.", 
          refBRS: "BRS-FLEX-723", refRule: "BRSFLEX723-1" 
        },
        { 
          stepId: "MPS-FLEX-720-Sc1.15", role: "Leverantör", action: "Ta emot Data", 
          description: "Elleverantör tar emot kompensationsunderlag.", 
          refBRS: "BRS-FLEX-723", refRule: "BRSFLEX723-2" 
        }
      ]
    }
  ]
};
