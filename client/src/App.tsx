import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BALANCE_BY_ID } from './graphQL/queries';

import './styles/App.css';
import { TapMeGame } from './pages/index'
const App: React.FC = () => {
  const [initialBalance, setInitialBalance] = useState<number | null>(null);
  const [userId, setUseId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const [telegramId, setTelegramId] = useState<string | null>(null);

  // Extract telegramId from the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const telegramIdFromUrl = searchParams.get('telegramId')
    const userNameFromUrl = searchParams.get('userName') || "";
    if (telegramIdFromUrl) {
      setTelegramId(telegramIdFromUrl);
      setUserName(userNameFromUrl);
    }
  }, []);


  // Fetch balance only if telegramId is available
  const { data, loading, error } = useQuery(GET_BALANCE_BY_ID, {
    variables: { telegramId },
    skip: !telegramId, // Skip query if no telegramId
  });

  useEffect(() => {
    if (data) {
      //console.log("------balance--------", data.getBalanceById.balance);
      setInitialBalance(data.getBalanceById.balance);
      setUseId(data.getBalanceById.id)
    }
  }, [data]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="App">
      {initialBalance !== null ? (
        <TapMeGame initialBalance={initialBalance} userId={userId} />
      ) : (
        <p>Loading balance...</p>
      )}
    </div>
  );
}

export default App;
