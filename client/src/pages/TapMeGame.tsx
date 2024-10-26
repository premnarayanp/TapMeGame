import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_BALANCE } from '../graphQL/queries';
import { debounce } from 'lodash';

import '../styles/TapMeGame.css';
import { ProgressBar } from "../components/index";

interface TapMeGameProps {
    initialBalance: number;
    userId: string;
}

const TapMeGame: React.FC<TapMeGameProps> = ({ initialBalance, userId }) => {
    const [coins, setCoins] = useState(initialBalance);
    const [clicks, setClicks] = useState<{ x: number; y: number; id: number }[]>([]);
    const [burn, setBurn] = useState<number>(1000); // Start burn counter at 1000
    const targetCoins = 1000; // Target for the progress bar

    // Mutation to update the balance
    const [updateBalance] = useMutation(UPDATE_BALANCE);

    // Debounced function to update the balance in the backend
    const debouncedUpdateBalance = useCallback(
        debounce(async (newBalance: number) => {
            try {
                //console.log("----------updating  when delay  of 2 second stop click---------")
                await updateBalance({
                    variables: {
                        userId,
                        newBalance,
                    },
                });
            } catch (error) {
                console.error("Error updating balance:", error);
            }
        }, 2000), // Adjust debounce delay as needed
        []
    );

    const handleCoinClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - 50;
        const y = e.clientY - rect.top + 100;

        // Increment coins and burn only if burn is greater than 0
        if (burn > 0) {
            const newCoins = coins + 1;
            setCoins(newCoins);
            setClicks((prevClicks) => [...prevClicks, { x, y, id: Date.now() }]);
            setBurn((prevBurn) => prevBurn - 1);

            // Call the debounced function with the new balance
            debouncedUpdateBalance(newCoins);
        }
    };

    // Remove the click animation after it completes
    const removeClick = (id: number) => {
        setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
    };

    const progressPercentage: number = Math.min((coins / targetCoins) * 100, 100);

    return (
        <div className="game-container">
            <div className="coin-counter">🎖️: {coins}</div>

            <div className="coin-button" onClick={handleCoinClick}>
                <img className="coin-image" src={require('../assets/img4.avif')} alt="coin" />
                <span>Tap Me</span>
            </div>
            {clicks.map((click) => (
                <div
                    key={click.id}
                    className="click-coin-animation"
                    style={{ left: click.x, top: click.y }}
                    onAnimationEnd={() => removeClick(click.id)}
                >
                    🎖️+
                </div>
            ))}

            <ProgressBar progressPercentage={progressPercentage} burn={burn} />
        </div>
    );
};

export default TapMeGame;
