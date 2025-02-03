import React, { useState, useEffect } from 'react';
import Login from './Login';
import AbsenceTable from './AbsenceTable';
import employees from './data/employees.json';
import managers from './data/managers.json';
import absences from './data/absences.json';
import './App.css';

const App = () => {
  const [currentManagerId, setCurrentManagerId] = useState(() => {
    return localStorage.getItem('currentManagerId') || null;
  });

  const [absencesData, setAbsencesData] = useState(() => {
    return JSON.parse(localStorage.getItem('absences')) || absences;
  });

  useEffect(() => {
    if (currentManagerId) {
      localStorage.setItem('currentManagerId', currentManagerId);
    } else {
      localStorage.removeItem('currentManagerId');
    }
  }, [currentManagerId]);

  useEffect(() => {
    localStorage.setItem('absences', JSON.stringify(absencesData));
  }, [absencesData]);

  const handleLogin = (managerId) => {
    setCurrentManagerId(managerId);
  };

  const handleLogout = () => {
    setCurrentManagerId(null);
    localStorage.removeItem('currentManagerId');
  };

  const handleAddAbsence = (newAbsence) => {
    const updatedAbsences = [...absencesData, newAbsence];
    setAbsencesData(updatedAbsences);
  };

  const handleUpdateAbsence = (updatedAbsence) => {
    const updatedAbsences = absencesData.map((absence) =>
      absence.id === updatedAbsence.id ? updatedAbsence : absence
    );
    setAbsencesData(updatedAbsences);
  };

  return (
    <div>
      {currentManagerId ? (
        <>
          <h1>Gestion des absences</h1>
          <button 
            onClick={handleLogout} 
            style={{ marginBottom: '10px', padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Logout
          </button>
          <AbsenceTable
            employees={employees}
            currentManagerId={currentManagerId}
            absences={absencesData}
            onAddAbsence={handleAddAbsence}
            onUpdateAbsence={handleUpdateAbsence}
          />
        </>
      ) : (
        <Login onLogin={handleLogin} managers={managers} />
      )}
    </div>
  );
};

export default App;
