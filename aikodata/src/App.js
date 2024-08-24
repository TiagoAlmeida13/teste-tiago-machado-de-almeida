import React, { useState } from 'react';
import EquipmentMap from '../src/components/EquipmentMap';
import EquipmentDetails from '../src/components/EquipmentDetails';
import EquipmentStateHistory from '../src/components/EquipmentStateHistory';
import './App.css';

const App = () => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  const handleSelectEquipment = (equipmentId) => {
    setSelectedEquipmentId(equipmentId);
  };

  return (
    <div className="App">
      <h1>Gestão de Equipamentos Florestais</h1>
      <EquipmentMap onSelectEquipment={handleSelectEquipment} />
      {selectedEquipmentId && (
        <div>
          <EquipmentDetails selectedEquipmentId={selectedEquipmentId} />
          <EquipmentStateHistory selectedEquipmentId={selectedEquipmentId} />
        </div>
      )}
    </div>
  );
};

export default App;
