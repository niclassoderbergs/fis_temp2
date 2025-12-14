
import { BRSData } from './types';

export interface SectionScore {
  score: number;
  issues: string[];
}

export interface QualityReport {
  purpose: SectionScore;
  diagram: SectionScore;
  startConditions: SectionScore;
  stopConditions: SectionScore;
  businessRules: SectionScore;
  flows: SectionScore;
  content: SectionScore;
  total: number;
}

const calculateSection = (
  condition: boolean, 
  baseScore: number, 
  checks: { check: boolean; penalty: number; msg: string }[]
): SectionScore => {
  const issues: string[] = [];
  let currentScore = condition ? baseScore : 0;

  if (!condition) {
    issues.push("Sektion saknas eller är tom.");
    return { score: 0, issues };
  }

  checks.forEach(c => {
    if (!c.check) {
      currentScore -= c.penalty;
      issues.push(c.msg);
    }
  });

  return { score: Math.max(0, currentScore), issues };
};

export const calculateQuality = (brs: BRSData): QualityReport => {
  
  // 1. Purpose
  // Krav: Texten ska vara beskrivande (>20 tecken) och inte innehålla platshållare.
  const purpose = calculateSection(
    !!brs.purpose && brs.purpose.length > 20, 
    100,
    [
      { check: !brs.purpose.includes("TBD"), penalty: 100, msg: "Innehåller 'TBD'." },
      { check: brs.purpose.length > 50, penalty: 20, msg: "Beskrivningen är för kort (<50 tecken)." }
    ]
  );

  // 2. Diagram
  // Krav: Diagramkod ska finnas OCH innehålla korrekt BRS-ID i titeln.
  const diagram = calculateSection(
    !!brs.diagramCode && brs.diagramCode.trim().length > 0,
    100,
    [
      { 
        check: (brs.diagramCode || "").includes(brs.id), 
        penalty: 50, 
        msg: `Diagramtiteln saknar referens till ${brs.id}.` 
      },
      {
        check: (brs.diagramCode || "").includes("sequenceDiagram"),
        penalty: 10,
        msg: "Ej identifierat som sekvensdiagram."
      }
    ]
  );

  // 3. Start Conditions
  // Krav: Ska finnas. Om det är en beroende process (t.ex. notify 205 eller internal 1000+) bör den referera till triggande BRS.
  const isInternalOrDependent = parseInt(brs.id.replace(/\D/g, '')) > 200; 
  const startConditions = calculateSection(
    !!brs.preConditions && brs.preConditions.length > 0,
    100,
    [
      {
        // Om det är en komplex process, kolla om vi refererar till andra BRS:er i villkoren.
        check: !isInternalOrDependent || brs.preConditions.some(c => {
            const txt = typeof c === 'string' ? c : c.description;
            return txt.includes("BRS-FLEX-");
        }),
        penalty: 25,
        msg: "Saknar explicit referens till triggande BRS (BRS-FLEX-XXX)."
      }
    ]
  );

  // 4. Stop Conditions
  // Krav: ID på post-conditions ska matcha BRS-ID (t.ex. BRS-FLEX-101-POST-1).
  const accepted = Array.isArray(brs.postConditions.accepted) ? brs.postConditions.accepted : [];
  const rejected = Array.isArray(brs.postConditions.rejected) ? brs.postConditions.rejected : [];
  const hasConditions = accepted.length > 0 || rejected.length > 0;

  const stopConditions = calculateSection(
    hasConditions,
    100,
    [
      {
        check: accepted.length > 0 && rejected.length > 0,
        penalty: 20,
        msg: "Bör ha både 'Accepted' och 'Rejected' utfall."
      },
      {
        check: [...accepted, ...rejected].every(c => typeof c !== 'string' && c.id.startsWith(brs.id)),
        penalty: 50,
        msg: `ID på post-conditions matchar ej ${brs.id}.`
      }
    ]
  );

  // 5. Business Rules
  // Krav: Regler ska finnas. De ska ha ErrorCodes (ej "-").
  // Interna funktioner (utan regler) får pass om arrayen är tom men definierad.
  const hasRules = brs.businessRules && brs.businessRules.length > 0;
  // Undantag: Interna processer (t.ex. notification) kanske inte har valideringsregler.
  const isNotification = brs.title.toLowerCase().includes("notifiera") || brs.title.toLowerCase().includes("notify");
  
  const businessRules = calculateSection(
    hasRules || isNotification, // Godkänn tomt om det är en notifiering
    100,
    [
      {
        check: hasRules || isNotification, // Om ej notification måste det finnas regler
        penalty: 100,
        msg: "Saknar affärsregler."
      },
      {
        check: !hasRules || brs.businessRules.every(r => r.errorCode && r.errorCode !== "-" && r.errorCode.length > 2),
        penalty: 30,
        msg: "Vissa regler saknar giltiga felkoder (ErrorCode)."
      }
    ]
  );

  // 6. Flows
  // Krav: Minst 2 steg i processen.
  const flows = calculateSection(
    !!brs.process && brs.process.length > 0,
    100,
    [
      {
        check: brs.process.length >= 2,
        penalty: 50,
        msg: "Processen är för kort (< 2 steg)."
      }
    ]
  );

  // 7. Content
  // Krav: InfoObjekt ska finnas. Attribut ska hänvisa till lagrum eller vara mandatory.
  const content = calculateSection(
    !!brs.infoObjects && brs.infoObjects.length > 0,
    100,
    [
      {
        check: brs.infoObjects?.every(obj => obj.attributes.length > 0) ?? false,
        penalty: 20,
        msg: "Ett definierat objekt saknar attribut."
      },
      {
        check: brs.infoObjects?.some(obj => obj.attributes.some(attr => attr.article && attr.article.length > 2)) ?? false,
        penalty: 10,
        msg: "Saknar referenser till lagrum (Artikel/Dr NC)."
      }
    ]
  );

  const metrics = [
    purpose.score, 
    diagram.score, 
    startConditions.score, 
    stopConditions.score, 
    businessRules.score, 
    flows.score, 
    content.score
  ];
  
  const total = Math.round(metrics.reduce((a, b) => a + b, 0) / metrics.length);

  return {
    purpose,
    diagram,
    startConditions,
    stopConditions,
    businessRules,
    flows,
    content,
    total
  };
};
