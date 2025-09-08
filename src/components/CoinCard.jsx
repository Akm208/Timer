// import React from 'react'
// import { Link } from 'react-router-dom'

// const CoinCard = ({ coin }) => {
//   return (
//     <Link to={`/coin/${coin.id}`}>
//    <div className='coin-card' >
              
//               <div className='coin-header'>
//                 <img src={coin.image} alt={coin.name} className='coin-image' />
//                 <div>
//                   <h2>{coin.name}</h2>
//                   <p>{coin.symbol.toUpperCase()}</p>
//                 </div>
//               </div>
//               <p>Price: ${coin.current_price.toLocaleString()}</p>
//               <p className={coin.price_change_percentage_24h>=0 ? 'positive' : 'negative'}>
//                 {coin.price_change_percentage_24h.toFixed(2)}%
//               </p>
//               <p>Market cap: ${coin.market_cap.toLocaleString()}</p>
//             </div>
//             </Link>
//   )
// }

// export default CoinCard


import React from 'react'
import { Link } from 'react-router-dom'   // ✅ use react-router-dom, not react-router

const CoinCard = ({ coin }) => {
  // Safely handle price change percentage
  const priceChange = coin.price_change_percentage_24h;

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className='coin-card'>
        <div className='coin-header'>
          <img src={coin.image} alt={coin.name} className='coin-image' />
          <div>
            <h2>{coin.name}</h2>
            <p>{coin.symbol.toUpperCase()}</p>
          </div>
        </div>

        <p>Price: ${coin.current_price?.toLocaleString()}</p>

        <p className={priceChange >= 0 ? 'positive' : 'negative'}>
          {priceChange != null ? `${priceChange.toFixed(2)}%` : "N/A"}
        </p>

        <p>Market cap: ${coin.market_cap?.toLocaleString()}</p>
      </div>
    </Link>
  )
}

export default CoinCard
