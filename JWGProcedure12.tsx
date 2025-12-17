
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex202 } from './domain2/brs/brs-flex-202';
import { content202Input } from './content-domain-2';

const styles = {
  container: { padding: '40px', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' as const },
  header: { fontSize: '2rem', fontWeight: 700, marginBottom: '8px', color: '#172b4d' },
  subHeader: { fontSize: '1.1rem', color: '#5e6c84', marginBottom: '32px' },
  sectionHeader: { fontSize: '1.5rem', fontWeight: 600, marginTop: '48px', marginBottom: '16px', color: '#42526e', borderBottom: '2px solid #ebecf0', paddingBottom: '8px' },
  paragraph: { fontSize: '1rem', lineHeight: '1.6', color: '#333', marginBottom: '16px' },
  table: { width: '100%', borderCollapse: 'collapse' as const, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', fontSize: '0.9rem', border: '1px solid #dfe1e6', marginBottom: '24px' },
  th: { backgroundColor: '#f4f5f7', color: '#172b4d', padding: '12px 16px', textAlign: 'left' as const, borderBottom: '2px solid #dfe1e6', fontWeight: 600 },
  td: { padding: '12px 16px', borderBottom: '1px solid #dfe1e6', verticalAlign: 'top' as const, color: '#172b4d', lineHeight: '1.5' },
  backButton: { marginBottom: '20px', padding: '8px 16px', backgroundColor: '#e6effc', color: '#0052cc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 },
  brsBox: { backgroundColor: '#e3fcef', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #006644', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brsLink: { color: '#006644', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '1.1rem' },
  mappingTag: { display: 'inline-block', backgroundColor: '#e3fcef', color: '#006644', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }
};

const diagramCode = `sequenceDiagram
    title Procedure 12: Cancellation of a contract (Regret)
    participant SP as Service Provider
    participant CUMA as CU Module Administrator

    SP->>CUMA: 12.1 Request Cancellation (before start date)
    activate CUMA
    CUMA->>CUMA: Check if start date is in future
    
    alt OK
        CUMA->>CUMA: Delete Contract
        CUMA-->>SP: 12.2 Confirm Cancellation
    else Too Late
        CUMA-->>SP: Error (Use Termination instead)
    end
    deactivate CUMA`;

const steps = [
  { step: "12.1", action: "Request Cancellation", description: "SP requests to cancel a contract that hasn't started.", producer: "SP", receiver: "CUMA", infoId: "A" },
  { step: "12.2", action: "Confirm", description: "CUMA confirms cancellation.", producer: "CUMA", receiver: "SP", infoId: "B" }
];

const attributes = [
  { name: "Contract identifier", desc: "Contract to cancel." },
  { name: "Cancellation date", desc: "Now." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Contract identifier": "Flexibilitetsavtals-ID"
};

interface Props { onBack: () => void; onNavigateToBRS: (id: string) => void; }

export const JWGProcedure12: React.FC<Props> = ({ onBack, onNavigateToBRS }) => {
  // Mappar till BRS-FLEX-202 då "Cancellation" ofta hanteras som ett avslut med samma datum eller borttagning.
  // Här antar vi att det mappas mot 202 för enkelhetens skull.
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    return content202Input.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
      <h1 style={styles.header}>Procedure 12: Cancellation of a contract</h1>
      <p style={styles.subHeader}>Ångerrätt/Annullering innan startdatum.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex202.id)}>{brsFlex202.id}: {brsFlex202.title}</div>
            <div style={{fontSize:'0.8rem', marginTop:'4px'}}>Hanteras som avslut med slutdatum = startdatum eller tidigare.</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <section><h2 style={styles.sectionHeader}>Processflöde</h2><MermaidDiagram chart={diagramCode} /></section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex202.id}</th></tr></thead>
          <tbody>
            {attributes.map((a, i) => {
              const brsMatch = getBrsAttribute(a.name);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{a.name}</strong></td>
                  <td style={styles.td}>{brsMatch ? <span style={styles.mappingTag}>{brsMatch.attribute}</span> : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex202.id} (InfoObject: {content202Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content202Input.attributes.map((attr, i) => {
              const jwgRef = getJwgReference(attr.attribute);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{attr.attribute}</strong></td>
                  <td style={styles.td}>{attr.description}</td>
                  <td style={{...styles.td, backgroundColor: i % 2 !== 0 ? '#f4f8fd' : '#fff'}}>
                    {jwgRef ? (
                        <span style={styles.reverseMappingTag}>{jwgRef}</span>
                    ) : (
                        <span style={{color: '#999', fontStyle: 'italic', fontSize: '0.8rem'}}>- (Specifikt för BRS)</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};
