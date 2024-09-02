import React, { useState } from 'react';

const CommissionCalculator = () => {
    const [locks, setLocks] = useState(1);
    const [stocks, setStocks] = useState(1);
    const [barrels, setBarrels] = useState(1);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const calculateCommission = (locks, stocks, barrels) => {
        const lockPrice = 45.0;
        const stockPrice = 30.0;
        const barrelPrice = 25.0;

        const totalLocks = parseInt(locks);
        const totalStocks = parseInt(stocks);
        const totalBarrels = parseInt(barrels);

        const lockSales = lockPrice * totalLocks;
        const stockSales = stockPrice * totalStocks;
        const barrelSales = barrelPrice * totalBarrels;
        const sales = lockSales + stockSales + barrelSales;

        let commission = 0.0;

        if (sales > 1800.0) {
            commission = 0.10 * 1000.0;
            commission += 0.15 * 800.0;
            commission += 0.20 * (sales - 1800.0);
        } else if (sales > 1000.0) {
            commission = 0.10 * 1000.0;
            commission += 0.15 * (sales - 1000.0);
        } else {
            commission = 0.10 * sales;
        }

        return {
            totalSales: sales,
            commission: commission
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            locks < 1 || locks > 70 ||
            stocks < 1 || stocks > 80 ||
            barrels < 1 || barrels > 90
        ) {
            setError('Invalid input values. Please check the input range.');
            setResult(null);
        } else {
            const { totalSales, commission } = calculateCommission(locks, stocks, barrels);
            setResult({
                locksSold: locks,
                stocksSold: stocks,
                barrelsSold: barrels,
                totalSales: totalSales,
                commission: commission
            });
            setError(null);
        }
    };

    return (
        <div>
            <h1>Commission Calculator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Locks Sold:</label>
                    <input
                        type="number"
                        value={locks}
                        onChange={(e) => setLocks(e.target.value)}
                        min="1"
                        max="70"
                        required
                    />
                </div>
                <div>
                    <label>Stocks Sold:</label>
                    <input
                        type="number"
                        value={stocks}
                        onChange={(e) => setStocks(e.target.value)}
                        min="1"
                        max="80"
                        required
                    />
                </div>
                <div>
                    <label>Barrels Sold:</label>
                    <input
                        type="number"
                        value={barrels}
                        onChange={(e) => setBarrels(e.target.value)}
                        min="1"
                        max="90"
                        required
                    />
                </div>
                <button type="submit">Calculate</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {result && (
                <div>
                    <h2>Results</h2>
                    <p>Locks Sold: {result.locksSold}</p>
                    <p>Stocks Sold: {result.stocksSold}</p>
                    <p>Barrels Sold: {result.barrelsSold}</p>
                    <p>Total Sales: ${result.totalSales.toFixed(2)}</p>
                    <p>Commission: ${result.commission.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default CommissionCalculator;
