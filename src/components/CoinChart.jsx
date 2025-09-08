const API_URL=import.meta.env.VITE_COIN_API_URL
import {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale,
    LinearScale, PointElement, LineElement, TimeScale, Tooltip, Legend
} from 'chart.js'
import 'chartjs-adapter-date-fns'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Tooltip,
    Legend
)
const CoinChart = ({coinId}) => {
    const [chartData,setChartData]=useState(null)
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    useEffect(()=>{
        const fetchChartData=async()=>{
            try {
                const res=await fetch(`${API_URL}/${coinId}/market_chart?vs_currency=usd&days=30`);
                if(!res.ok) throw new Error("Network response was not ok");
                const data=await res.json();
                setChartData(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchChartData();
    },[coinId])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      {chartData && (
        <Line
          data={{
            labels: chartData.prices.map(price => new Date(price[0])),
            datasets: [
              {
                label: 'Price (USD)',
                data: chartData.prices.map(price => price[1]),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
              },
            ],
          }}
          options={{
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
              },
            },
          }}
        />
      )} 
    </div>
  )
}

export default CoinChart
