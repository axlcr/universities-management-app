import { useState, useEffect } from 'react';
import api from '../services/api';
import { University } from '../types/University';

const useUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUniversities = async () => {
    try {
      const response = await api.get('/universities');
      setUniversities(response.data);
    } catch (err) {
      setError('Failed to fetch universities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  return { universities, loading, error, fetchUniversities };
};

export default useUniversities;
