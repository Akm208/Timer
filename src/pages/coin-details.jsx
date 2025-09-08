// import {useState, useEffect} from 'react'
// import {Link, useParams} from 'react-router-dom';
// const API_URL=import.meta.env.VITE_COIN_API_URL;
// const CoinDetailsPage = () => {
//     const {id}=useParams();
//     const [coin,setCoin]=useState(null)
//     const [loading,setLoading]=useState(true)
//     const [error,setError]=useState(null)
//     useEffect(()=>{
//         const fetchCoin=async()=>{
// try {
//     const res=await fetch(`${API_URL}/${id}`);
//     if(!res.ok) throw new Error("Network response was not ok");
//     const data=await res.json();
//     setCoin(data);
    
// } catch (err) {
//     console.log(err);
    
//     setError(err);
   
// }finally{
//      setLoading(false);
// }
//         }
//         fetchCoin();
//     },[id])
//   return (
//     <div className='coin-details-container'>
//      <Link to='/'>Back to Home</Link>
     
//      <h1 className="coin-details-title">   {coin ? `${coin.name} (${coin.symbol})` : 'Coin Details'}</h1>
//    {loading && <p>Loading...</p>}
//    {error && <div className='error'> {error}</div>}
//    {!loading && !error &&  (
//     <div className='coin-details'>
//     <>
//         <img src={coin.image.large} alt={coin.name} className='coin-details-image'/>
//         </>
//     </div>
     
//   )
// }

// export default CoinDetailsPage



import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`); // ✅ no double slash
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  return (
    <div className="coin-details-container">
      <Link to="/">⬅ Back to Home</Link>

      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>

      {loading && <Spinner /> }
      {error && <div className="error">{error}</div>}

      {!loading && !error && coin && (
        <div className="coin-details">
          <img
            src={coin.image?.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>{coin.description.en.split(". ")[0] + '.'} </p>
          <p>Market Cap Rank: #{coin.market_cap_rank}</p>
          <h3>
          <p>Current Price: ${coin.market_data?.current_price?.usd.toLocaleString()}</p>
          </h3>
          <h4>
            Market Cap: ${coin.market_data?.market_cap?.usd.toLocaleString()}
          </h4>
          <h4>24h High: ${coin.market_data?.high_24h?.usd.toLocaleString()}</h4>
          <h4>24h Low: ${coin.market_data?.low_24h?.usd.toLocaleString()}</h4>
          <h4>
          24h Price Change: ${coin.market_data?.price_change_24h?.toLocaleString(undefined, { minimumFractionDigits: 2 })} (${coin.market_data?.price_change_percentage_24h?.toFixed(2)}%)
          </h4>
          <h4>Circulating Supply:{' '}
          {coin.market_data?.circulating_supply?.toLocaleString()}</h4>
          <h4>Total Supply:{' '}
          {coin.market_data?.total_supply?.toLocaleString() || 'N/A'}</h4>
          <h4>All Time High: ${coin.market_data?.ath?.usd.toLocaleString()} on{''} {new Date(coin.market_data?.ath_date.usd).toLocaleDateString()}</h4>
            <h4>All Time Low: ${coin.market_data?.atl?.usd.toLocaleString()} on{''} {new Date(coin.market_data?.atl_date.usd).toLocaleDateString()}</h4>

            <h4>Last Updated: {new Date(coin.last_updated).toLocaleString()}</h4>
            <CoinChart coinId={coin.id}/> 
            <div className="coin-details-links">
            {coin.links?.homepage[0] && (
                <p>
                {''}
            <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">
             Website
            </a>
            </p>
            )}
            {coin.links?.blockchain_site[0] && (
                <p>
                {''}
            <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">
              Visit Blockchain Explorer
            </a>
            </p>
            )}
            </div>
        </div>
      )}
      {coin?.categories?.length > 0 && (
        <p>Categories: {coin.categories.join(", ")}</p>
      )}
      {!loading && !error && !coin && <p>Coin not found.</p>}
    </div>
  );
};

export default CoinDetailsPage;
