
import { useState, useEffect } from 'react';
import { MOCK_PROPERTIES } from '../constants';
import type { Property } from '../types';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProperties = () => {
      try {
        setTimeout(() => {
          setProperties(MOCK_PROPERTIES.filter(p => p.approved));
          setLoading(false);
        }, 500);
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
    const fetchProperty = () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        setTimeout(() => {
          const foundProperty = MOCK_PROPERTIES.find(p => p.id === id);
          if (foundProperty) {
            setProperty(foundProperty);
          } else {
            setError(new Error('Property not found'));
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading, error };
};
