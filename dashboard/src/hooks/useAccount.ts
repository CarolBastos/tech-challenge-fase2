import { User } from '@/app/interfaces';
import { useEffect, useState } from 'react';

const useAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/account');
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        setError('Erro ao buscar dados do usuário.');
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    fetchUserData();
  }, []);

  return { user, setUser, error };
};

export default useAccount;
