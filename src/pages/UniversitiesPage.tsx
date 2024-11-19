import React, { useState } from 'react';
import useUniversities from '../hooks/useUniversities';
import UniversitiesTable from '../components/UniversitiesTable';
import AddUniversityForm from '../components/AddUniversityForm';
import EditUniversityForm from '../components/EditUniversityForm';
import { University } from '../types/University';
import api from '../services/api';

const UniversitiesPage: React.FC = () => {
  const { universities, loading, error, fetchUniversities } = useUniversities();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (university: University) => {
    setEditingUniversity(university);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await api.delete(`/universities/${id}`);
        fetchUniversities();
      } catch (err) {
        console.error('Failed to delete university:', err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Universities</h1>
      <input
        type="text"
        placeholder="Search universities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      {editingUniversity ? (
        <EditUniversityForm
          university={editingUniversity}
          onUpdate={() => {
            fetchUniversities();
            setEditingUniversity(null);
          }}
          onCancel={() => setEditingUniversity(null)}
        />
      ) : (
        <AddUniversityForm onAdd={fetchUniversities} />
      )}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <UniversitiesTable
          universities={filteredUniversities}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UniversitiesPage;
