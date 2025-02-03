import React, { useState } from 'react';

const AbsenceForm = ({ employees, currentManagerId, absences, onAddAbsence, onUpdateAbsence }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Present');
  const [editingAbsenceId, setEditingAbsenceId] = useState(null);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const newAbsence = {
      id: editingAbsenceId || Date.now(), // Utiliser l'ID existant en mode édition ou générer un nouvel ID
      employeeId: selectedEmployeeId,
      date: selectedDate,
      status: selectedStatus,
      managerId: currentManagerId,
    };

    if (editingAbsenceId) {
      onUpdateAbsence(newAbsence); // Mettre à jour l'absence existante
    } else {
      onAddAbsence(newAbsence); // Ajouter une nouvelle absence
    }

    // Réinitialiser le formulaire
    setSelectedEmployeeId('');
    setSelectedDate('');
    setSelectedStatus('Present');
    setEditingAbsenceId(null);
  };

  // Fonction pour annuler la modification
  const handleCancel = () => {
    setSelectedEmployeeId('');
    setSelectedDate('');
    setSelectedStatus('Present');
    setEditingAbsenceId(null);
  };

  // Fonction pour remplir le formulaire en mode édition
  const handleEdit = (absence) => {
    setSelectedEmployeeId(absence.employeeId);
    setSelectedDate(absence.date);
    setSelectedStatus(absence.status);
    setEditingAbsenceId(absence.id);
  };

  return (
    <div>
      <h2>{editingAbsenceId ? 'Modifier une absence' : 'Ajouter une absence'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employé :</label>
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            required
          >
            <option value="" disabled>Sélectionnez un employé</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date :</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Statut :</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            required
          >
            <option value="Present">Présent</option>
            <option value="Absent">Absent</option>
            <option value="En retard">En retard</option>
            <option value="En sortie autorisée">En sortie autorisée</option>
          </select>
        </div>
        <div>
          <button type="submit">{editingAbsenceId ? 'Sauvegarder' : 'Ajouter'}</button>
          {editingAbsenceId && (
            <button type="button" onClick={handleCancel}>Annuler</button>
          )}
        </div>
      </form>

      <h2>Liste des absences</h2>
      <table>
        <thead>
          <tr>
            <th>Employé</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {absences
            .filter((absence) => absence.managerId === currentManagerId) // Filtrer par responsable RH
            .map((absence) => {
              const employee = employees.find((e) => e.id === absence.employeeId);
              return (
                <tr key={absence.id}>
                  <td>{employee ? employee.name: 'Inconnu' }</td>
                  <td>{absence.date}</td>
                  <td>{absence.status}</td>
                  <td>
                    <button onClick={() => handleEdit(absence)}>Modifier</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AbsenceForm;