
import { useState, useEffect } from 'react';
import type { Property } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/properties`);
        if (!response.ok) {
          throw new Error('Failed to load properties');
        }
        const data: Property[] = await response.json();
        setProperties(data.filter(p => p.approved));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
};

export const useProperty = (id?: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/properties/${id}`);
        if (response.status === 404) {
          setError(new Error('Property not found'));
          setLoading(false);
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to load property');
        }
        const data: Property = await response.json();
        setProperty(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading, error };
};
