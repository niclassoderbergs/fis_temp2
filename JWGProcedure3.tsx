
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex102 } from './domain1/brs/brs-flex-102';
import { content102Input } from './content-domain-1';

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
    title Procedure 3: Update of CU master data
    participant RegP as Registration Responsible
    participant CUMA as CU Module Administrator

    RegP->>CUMA: 3.1 Request to update CU (ID: A)
    activate CUMA
    CUMA->>CUMA: 3.2 Validate update
    
    alt Validation Failed
        CUMA-->>RegP: 3.2 Validation Result (Invalid)
    else Validation OK
        CUMA-->>RegP: 3.3 Confirm update (ID: B)
    end
    deactivate CUMA`;

const steps = [
  { step: "3.1", action: "Request to update CU", description: "The registration responsible requests to update attributes of a registered CU.", producer: "Registration responsible", receiver: "CU module administrator", infoId: "A" },
  { step: "3.2", action: "Validate update", description: "The CUMA validates the changes (e.g. check permissions and data format).", producer: "CU module administrator", receiver: "Registration responsible", infoId: "B" },
  { step: "3.3", action: "Confirm update", description: "The CUMA confirms the update.", producer: "CU module administrator", receiver: "Registration responsible", infoId: "B" }
];

const attributes = [
  { name: "CU identification", desc: "Identify the CU to update." },
  { name: "Updated attributes", desc: "List of attributes with new values (e.g. Capacity, Name)." },
  { name: "Effective date", desc: "Date when the update becomes effective." }
];

const jwgToBrsMapping: Record<string, string> = {
  "CU identification": "CU-ID",
  "Updated attributes": "Maximal aktiv effekt", // Exempel
  "Effective date": "Giltig från"
};

interface Props { onBack: () => void; onNavigateToBRS: (id: string) => void; }

export const JWGProcedure3: React.FC<Props> = ({ onBack, onNavigateToBRS }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    return content102Input.attributes.find(a => a.attribute === mappedName);
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
      <h1 style={styles.header}>Procedure 3: Update of CU information</h1>
      <p style={styles.subHeader}>Uppdatering av attribut för en existerande resurs.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex102.id)}>{brsFlex102.id}: {brsFlex102.title}</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <section><h2 style={styles.sectionHeader}>Processflöde</h2><MermaidDiagram chart={diagramCode} /></section>

      <section>
        <h2 style={styles.sectionHeader}>Steg i processen</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Steg</th><th style={styles.th}>Handling</th><th style={styles.th}>Beskrivning</th></tr></thead>
          <tbody>
            {steps.map((s, i) => (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{s.step}</strong></td><td style={styles.td}>{s.action}</td><td style={styles.td}>{s.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll JWG: Update Request</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex102.id}</th></tr></thead>
          <tbody>
            {attributes.map((a, i) => {
              const brsMatch = getBrsAttribute(a.name);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{a.name}</strong><br/><span style={{fontSize:'0.8rem', color:'#666'}}>{a.desc}</span></td>
                  <td style={styles.td}>{brsMatch ? <span style={styles.mappingTag}>{brsMatch.attribute}</span> : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex102.id} (InfoObject: {content102Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content102Input.attributes.map((attr, i) => {
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
