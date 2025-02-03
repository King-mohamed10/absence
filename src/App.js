import React, { useState, useEffect } from 'react';
import Login from './Login';
import AbsenceTable from './AbsenceTable';
import employees from './data/employees.json';
import managers from './data/managers.json';
import absences from './data/absences.json';

const App = () => {
  const [currentManagerId, setCurrentManagerId] = useState(null);
  const [absencesData, setAbsencesData] = useState(absences);

  useEffect(() => {
    // Charger les données depuis le localStorage si elles existent
    const savedAbsences = JSON.parse(localStorage.getItem('absences'));
    if (savedAbsences) {
      setAbsencesData(savedAbsences);
    }
  }, []);

  const handleLogin = (managerId) => {
    setCurrentManagerId(managerId);
  };

  const handleAddAbsence = (newAbsence) => {
    const updatedAbsences = [...absencesData, newAbsence];
    setAbsencesData(updatedAbsences);
    localStorage.setItem('absences', JSON.stringify(updatedAbsences));
  };

  const handleUpdateAbsence = (updatedAbsence) => {
    const updatedAbsences = absencesData.map((absence) =>
      absence.id === updatedAbsence.id ? updatedAbsence : absence
    );
    setAbsencesData(updatedAbsences);
    localStorage.setItem('absences', JSON.stringify(updatedAbsences));
  };

  return (
    <div>
      {currentManagerId ? (
        <>
          <h1>Gestion des absences</h1>
          <AbsenceTable
            employees={employees}
            currentManagerId={currentManagerId}
            absences={absencesData}
            onAddAbsence={handleAddAbsence}
            onUpdateAbsence={handleUpdateAbsence}
          />
        </>
      ) : (
        <Login onLogin={handleLogin} managers={managers}/>
      )}
    </div>
  );
};

export default App;