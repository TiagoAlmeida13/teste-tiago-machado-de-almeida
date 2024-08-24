import React from 'react';
import equipmentData from '../data/equipment.json';
import stateHistory from '../data/equipmentStateHistory.json';
import stateData from '../data/equipmentState.json';

const EquipmentDetails = ({ selectedEquipmentId }) => {
    const equipment = equipmentData.find((eq) => eq.id === selectedEquipmentId);

    const getEquipmentState = () => {
        const equipmentStates = stateHistory.find(
            (history) => history.equipmentId === selectedEquipmentId
        );
        if (equipmentStates) {
            const lastStateId = equipmentStates.states[equipmentStates.states.length - 1].equipmentStateId;
            const state = stateData.find((state) => state.id === lastStateId);
            return state;
        }
        return null;
    };

    const equipmentState = getEquipmentState();

    if (!equipment) return null;

    return (
        <div>
            <h2>{equipment.name}</h2>
            <p>
                Estado Atual:
                <span style={{ color: equipmentState ? equipmentState.color : '#000' }}>
                    {equipmentState ? equipmentState.name : 'Desconhecido'}
                </span>
            </p>
        </div>
    );
};

export default EquipmentDetails;
