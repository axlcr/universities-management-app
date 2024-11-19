import React from 'react';
import { University } from '../types/University';

interface Props {
  universities: University[];
  onEdit: (university: University) => void;
  onDelete: (id: number) => void;
}

const UniversitiesTable: React.FC<Props> = ({ universities, onEdit, onDelete }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Contact Emails</th>
          <th>Website</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {universities.map((university) => (
          <tr key={university.id}>
            <td>{university.name}</td>
            <td>{university.location}</td>
            <td>{university.contact_emails.join(', ')}</td>
            <td>
              <a href={university.website}>{university.website}</a>
            </td>
            <td>
              <button onClick={() => onEdit(university)}>Edit</button>
              <button onClick={() => onDelete(university.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UniversitiesTable;
