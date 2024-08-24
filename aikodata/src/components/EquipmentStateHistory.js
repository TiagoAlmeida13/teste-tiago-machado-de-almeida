import React from 'react';
import stateHistory from '../data/equipmentStateHistory.json';
import stateData from '../data/equipmentState.json';

const EquipmentStateHistory = ({ selectedEquipmentId }) => {
    const history = stateHistory.find(
        (history) => history.equipmentId === selectedEquipmentId
    );

    if (!history) return <p>Nenhum histórico disponível.</p>;

    return (
        <div>
            <h3>Histórico de Estados</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Data</th>
                        <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {history.states.map((state) => {
                        const stateInfo = stateData.find((s) => s.id === state.equipmentStateId);
                        const backgroundColor = stateInfo ? stateInfo.color : '#fff';
                        return (
                            <tr key={state.date} style={{ backgroundColor }}>
                                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                                    {new Date(state.date).toLocaleString()}
                                </td>
                                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                                    {stateInfo ? stateInfo.name : 'Desconhecido'}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentStateHistory;
