import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';
import Spinner from '../components/Spinner';

const HomePage = ({coins,filter,setFilter,limit,setLimit, sortBy,setSortBy,loading,error}) => {
    const filteredCoins=coins.filter(coin=>coin.name.toLowerCase().includes(filter.toLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLowerCase()))
    .slice()
    .sort((a,b)=>{
      if(sortBy==="market_cap_desc"){
        return b.market_cap - a.market_cap;
      } else if(sortBy==="market_cap_asc"){
        return a.market_cap - b.market_cap;
      } else if(sortBy==="price_desc"){
        return b.current_price - a.current_price;
      } else if(sortBy==="price_asc"){
        return a.current_price - b.current_price;
      } else if(sortBy==="change_desc"){
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      } else if(sortBy==="change_asc"){
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
      return 0;
    
    })
  return (
  <div>
      <h2> Crypto Dashboard</h2>
      {loading && <Spinner  color='white'/>}
      {error && <div className='error' style={{color:"red"}}>Error:{error}</div>}
      <div className="top-controls">
      <FilterInput filter={filter} onFilterChange={setFilter} />
      <LimitSelector limit={limit} onLimitChange={setLimit}/>
      <SortSelector  sortBy={sortBy} onSortChange={setSortBy}/>
      </div>
      
      {!loading && !error && (
        <main className='grid'>
          {filteredCoins.length >0 ? filteredCoins.map((coin)=>(
            <CoinCard  key={coin.id} coin={coin}/>
          )): (<p>No coins found</p>)}
        </main>
      )}
    </div>
  )
}

export default HomePage
