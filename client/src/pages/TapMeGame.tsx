// src/TapMeGame.tsx
import React, { useState } from 'react';
import '../styles/TapMeGame.css';

const TapMeGame: React.FC = () => {
    const [coins, setCoins] = useState<number>(0);
    const [clicks, setClicks] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleCoinClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - 50;
        const y = e.clientY - rect.top + 100;

        // Increment the coins and set click position for animation
        setCoins((prevCoins) => prevCoins + 1);
        setClicks((prevClicks) => [...prevClicks, { x, y, id: Date.now() }]);
    };

    // Remove the click animation after it completes
    const removeClick = (id: number) => {
        setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
    };

    return (
        <div className="game-container">
            <div className="coin-counter">🎖️: {coins}</div>

            <div className="coin-button" onClick={handleCoinClick}>
                <img className="coin-image" src={require('../assets/img3.avif')} alt="coin" />
                <span >Tap Me</span>
            </div>
            {clicks.map((click) => (
                <div
                    key={click.id}
                    className="click-coin-animation"
                    style={{ left: click.x, top: click.y }}
                    onAnimationEnd={() => removeClick(click.id)}
                >🎖️+

                </div>
            ))}
        </div>
    );
};

export default TapMeGame;
