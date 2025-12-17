
import React from 'react';
import { MPSData, BRSData } from './types';
import { MermaidDiagram } from './MermaidDiagram';

interface MPSSectionProps {
  activeMPS: MPSData;
  brsList: BRSData[];
  styles: any;
  onNavigateToBRS: (brsId: string) => void;
}

export const MPSSection: React.FC<MPSSectionProps> = ({ activeMPS, brsList, styles, onNavigateToBRS }) => {
  
  const getBRS = (brsId?: string) => {
    if (!brsId) return null;
    return brsList.find(b => b.id === brsId);
  }

  const getRuleDescription = (brsId?: string, ruleId?: string) => {
    if (!brsId || !ruleId) return null;
    const brs = getBRS(brsId);
    if (!brs) return null;

    const findIn = (list: any[]) => {
        if (!list || !Array.isArray(list)) return null;
        return list.find(item => typeof item !== 'string' && item.id === ruleId);
    };

    const pre = findIn(brs.preConditions);
    if (pre) return pre.description;

    const postAcc = findIn(Array.isArray(brs.postConditions.accepted) ? brs.postConditions.accepted : []);
    if (postAcc) return postAcc.description;

    const postRej = findIn(Array.isArray(brs.postConditions.rejected) ? brs.postConditions.rejected : []);
    if (postRej) return postRej.description;

    const rule = findIn(brs.businessRules);
    if (rule) return rule.description;

    return null;
  };

  const localStyles = {
    prerequisiteRow: {
        backgroundColor: '#fff8e1',
        color: '#42526e'
    },
    prerequisiteBadge: {
        fontSize: '0.65rem',
        textTransform: 'uppercase' as const,
        fontWeight: 700,
        backgroundColor: '#ffab00',
        color: '#172b4d',
        padding: '2px 6px',
        borderRadius: '3px',
        display: 'inline-block',
        marginTop: '4px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
    },
    brokenLink: {
        color: '#bf2600',
        fontWeight: 600,
        textDecoration: 'line-through',
        cursor: 'not-allowed'
    },
    brokenTooltip: {
        fontSize: '0.7rem',
        color: '#bf2600',
        display: 'block'
    }
  };

  return (
    <div>
      <div style={styles.docId}>{activeMPS.id}</div>
      <h1 style={styles.docTitle}>{activeMPS.title}</h1>
      
      <div style={{
          backgroundColor: '#f4f5f7', 
          padding: '16px', 
          borderRadius: '4px', 
          marginBottom: '24px',
          borderLeft: '4px solid #0052cc'
      }}>
          <div style={{fontWeight: 600, color: '#555', marginBottom: '4px'}}>Domain</div>
          <div style={{marginBottom: '12px'}}>{activeMPS.domain}</div>
          
          <div style={{fontWeight: 600, color: '#555', marginBottom: '4px'}}>Trigger</div>
          <div>{activeMPS.trigger}</div>
      </div>

      <section>
        <h2 style={styles.sectionHeader}>Process Description</h2>
        <p style={styles.paragraph}>{activeMPS.purpose}</p>

        {activeMPS.actors && activeMPS.actors.length > 0 && (
          <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '16px' }}>
             <strong>Actors:</strong> 
             <span style={{marginLeft: '4px'}}>
               {activeMPS.actors.map(a => a.role).join(', ')}
             </span>
          </div>
        )}
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Scenarios</h2>
        {activeMPS.scenarios.map((scenario, index) => (
          <div key={scenario.id} style={{marginBottom: '40px'}}>
            <h3 style={styles.subHeader}>{scenario.id} - {scenario.title}</h3>
            {scenario.description && <p style={{...styles.paragraph, fontStyle: 'italic', color: '#666'}}>{scenario.description}</p>}
            
            {scenario.diagramCode && (
              <div style={{ ...styles.diagramWrapper, marginBottom: '24px' }}>
                <MermaidDiagram key={`${activeMPS.id}-${scenario.id}`} chart={scenario.diagramCode} />
              </div>
            )}

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{...styles.th, width: '8%'}}>Step</th>
                  <th style={{...styles.th, width: '12%'}}>Role</th>
                  <th style={{...styles.th, width: '15%'}}>Action</th>
                  <th style={{...styles.th, width: '40%'}}>Description</th>
                  <th style={{...styles.th, width: '25%'}}>References</th>
                </tr>
              </thead>
              <tbody>
                {scenario.steps.map((step, sIdx) => {
                  const ruleDesc = getRuleDescription(step.refBRS, step.refRule);
                  const isPre = step.isPrerequisite;
                  const brsExists = step.refBRS ? !!getBRS(step.refBRS) : true;
                  
                  let rowStyle = sIdx % 2 === 1 ? styles.trEven : {};
                  if (isPre) {
                      rowStyle = { ...rowStyle, ...localStyles.prerequisiteRow };
                  }

                  const descStyle = isPre ? { fontStyle: 'italic', color: '#505f79' } : {};

                  return (
                    <tr key={sIdx} style={rowStyle}>
                        <td style={styles.td}>
                            <strong>{step.stepId}</strong>
                            {isPre && <div style={localStyles.prerequisiteBadge}>Prerequisite</div>}
                        </td>
                        <td style={styles.td}>{step.role}</td>
                        <td style={styles.td}>{step.action}</td>
                        <td style={{...styles.td, ...descStyle}}>{step.description}</td>
                        <td style={styles.td}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                            {step.refBRS && (
                                brsExists ? (
                                    <button 
                                        onClick={() => onNavigateToBRS(step.refBRS!)}
                                        style={{
                                            background: 'none', 
                                            border: 'none', 
                                            color: isPre ? '#172b4d' : '#0052cc', 
                                            textDecoration: 'underline', 
                                            cursor: 'pointer',
                                            padding: 0,
                                            fontFamily: 'inherit',
                                            fontSize: '0.85rem',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {step.refBRS}
                                    </button>
                                ) : (
                                    <div>
                                        <span style={localStyles.brokenLink}>{step.refBRS}</span>
                                        <span style={localStyles.brokenTooltip}>⚠️ Missing Reference</span>
                                    </div>
                                )
                            )}
                            {step.refRule && (
                                <>
                                    <span style={{fontSize: '0.8rem', color: isPre ? '#42526e' : '#666', fontFamily: 'monospace', fontWeight: 600}}>
                                        {step.refRule}
                                    </span>
                                    {ruleDesc ? (
                                        <span style={{fontSize: '0.75rem', color: isPre ? '#505f79' : '#555', fontStyle: 'italic', lineHeight: '1.2', marginTop: '2px'}}>
                                            {ruleDesc}
                                        </span>
                                    ) : (
                                        step.refBRS && brsExists && <span style={{fontSize: '0.7rem', color: '#bf2600'}}>Rule not found</span>
                                    )}
                                </>
                            )}
                        </div>
                        </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </div>
  );
};
