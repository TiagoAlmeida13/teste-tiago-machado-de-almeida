import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import equipmentData from '../data/equipment.json';
import positionHistory from '../data/equipmentPositionHistory.json';
import stateData from '../data/equipmentState.json';
import stateHistory from '../data/equipmentStateHistory.json';

const EquipmentMap = ({ onSelectEquipment }) => {
    // Função para obter a última posição de cada equipamento
    const getLastPositions = () => {
        return positionHistory.map((equipment) => {
            const lastPosition = equipment.positions[equipment.positions.length - 1];
            return {
                ...equipment,
                lastPosition,
            };
        });
    };

    // Função para obter o estado atual do equipamento
    const getEquipmentState = (equipmentId) => {
        const equipmentStates = stateHistory.find(
            (history) => history.equipmentId === equipmentId
        );
        if (equipmentStates) {
            const lastStateId = equipmentStates.states[equipmentStates.states.length - 1].equipmentStateId;
            const state = stateData.find((state) => state.id === lastStateId);
            return state;
        }
        return null;
    };

    const lastPositions = getLastPositions();

    return (
        <MapContainer center={[-19.126536, -45.947756]} zoom={12} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {lastPositions.map((equipment) => {
                const equipmentState = getEquipmentState(equipment.equipmentId);
                const iconColor = equipmentState ? equipmentState.color : '#000';

                // Custom icon com cor baseada no estado do equipamento
                const customIcon = L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="background-color: ${iconColor}; width: 30px; height: 30px; border-radius: 50%;"></div>`,
                });

                return (
                    <Marker
                        key={equipment.equipmentId}
                        position={[equipment.lastPosition.lat, equipment.lastPosition.lon]}
                        icon={customIcon}
                        eventHandlers={{
                            click: () => {
                                onSelectEquipment(equipment.equipmentId);
                            },
                        }}
                    >
                        <Popup>
                            <strong>{equipmentData.find(e => e.id === equipment.equipmentId).name}</strong><br />
                            Estado Atual: {equipmentState ? equipmentState.name : 'Desconhecido'}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default EquipmentMap;
