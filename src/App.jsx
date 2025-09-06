import {useState, useEffect } from 'react'
const API_URL=import.meta.env.VITE_API_URL;
import './App.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/home';

const App=() => {
  const [coins,setCoins]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);
const [limit,setLimit]=useState(100);
const [filter,setFilter]=useState("");
const [sortBy, setSortBy]=useState("market_cap_desc");
  useEffect(() => {
    const fetchCoins= async ()=>{
      try {
        const res=await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if(!res.ok) throw new Error("Network response was not ok");
        const data=await res.json();
        console.log(data);
        setCoins(data);
        
        
      } catch (err) {
        setError(err.message);
        
      }
      finally{
setLoading(false);
      }
    }
    fetchCoins();
  },[limit])


  

  return (
  <Routes>
    <Route  path='/' element={<HomePage 
    coins={coins}
    filter={filter}
    setFilter={setFilter}
    limit={limit}
    setLimit={setLimit}
    sortBy={sortBy}
    setSortBy={setSortBy}
    loading={loading}
    error={error}

    />} />
  </Routes>


)
}
export default App
  


// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';

// const API_URL =
//   'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false';

// export default function App() {
//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const abortRef = useRef(null); // store current fetch controller so we can abort it

//   // Fetch function we can call on mount or when user clicks refresh
//   const fetchCoins = async () => {
//     // abort any previous fetch (if still running)
//     abortRef.current?.abort();

//     const controller = new AbortController();
//     abortRef.current = controller;

//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch(API_URL, { signal: controller.signal });
//       if (!res.ok) throw new Error(`Network response was not ok (status ${res.status})`);

//       const data = await res.json();
//       // data is an array of coin objects
//       console.log('Fetched coins:', data);
//       setCoins(data);
//     } catch (err) {
//       if (err.name === 'AbortError') {
//         // fetch was aborted — ignore
//         console.log('Fetch aborted');
//         return;
//       }
//       setError(err.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCoins();

//     // cleanup on unmount: abort any ongoing fetch
//     return () => {
//       abortRef.current?.abort();
//     };
//     // empty dependency => run once on mount
//   }, []);

//   const formatCurrency = (n) =>
//     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

//   return (
//     <div className="app" style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
//       <h2>Crypto Dashboard</h2>

//       <div style={{ marginBottom: 12 }}>
//         <button onClick={fetchCoins} disabled={loading}>
//           {loading ? 'Loading...' : 'Refresh'}
//         </button>
//       </div>

//       {loading && <p>Loading coins, please wait…</p>}

//       {error && (
//         <p style={{ color: 'red' }}>
//           Error: {error}
//         </p>
//       )}

//       {!loading && !error && (
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
//               <th>#</th>
//               <th>Coin</th>
//               <th>Price</th>
//               <th>24h %</th>
//               <th>Market Cap</th>
//             </tr>
//           </thead>
//           <tbody>
//             {coins.map((coin) => (
//               <tr key={coin.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
//                 <td style={{ padding: '8px 6px' }}>{coin.market_cap_rank}</td>
//                 <td style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 6px' }}>
//                   <img src={coin.image} alt={coin.name} width="28" height="28" />
//                   <div>
//                     <div style={{ fontWeight: 600 }}>{coin.name}</div>
//                     <div style={{ fontSize: 12, color: '#555' }}>{coin.symbol.toUpperCase()}</div>
//                   </div>
//                 </td>
//                 <td style={{ padding: '8px 6px' }}>{formatCurrency(coin.current_price)}</td>
//                 <td
//                   style={{
//                     padding: '8px 6px',
//                     color: (coin.price_change_percentage_24h ?? 0) >= 0 ? 'green' : 'red',
//                     fontWeight: 600,
//                   }}
//                 >
//                   {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
//                 </td>
//                 <td style={{ padding: '8px 6px' }}>{formatCurrency(coin.market_cap)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
