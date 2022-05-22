import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [bkkJson, setbkkJson] = useState(null)


  useEffect(() => {
    const apiCall = () => {
      axios.get('https://firebasestorage.googleapis.com/v0/b/bangkok-election-2022.appspot.com/o/api%2Fgovernor%2Fcandidates.json?alt=media')
      .then(res => {
        const datas = res.data
        setbkkJson(datas)
      })
    }
    const id = setInterval(apiCall, 1000)
    return () => clearInterval(id);
  },[])//first reload
    

  

  return (
    <div className="App">
      <div className='group-box'>
        <div className='box'>
          <div className='img-governor'>
            <img src='https://img.freepik.com/free-vector/hand-painted-background-violet-orange-colours_23-2148427578.jpg?w=2000' />
          </div>
          <div className='name-governor'>
            <h1>ชนานุวัตร ฉายศรี</h1>
            <h2>พรรคผ่อน</h2>
          </div>
          <div className='score-total'>
            <h3>1,000,000</h3>
            <h4>คะแนน</h4>
          </div>
        </div>
         {
        !bkkJson ? null : bkkJson.map((item, i) => {
          return(
            <div className='box' key={i}>
              <div className='img-governor'>
                <img src={`https://firebasestorage.googleapis.com/v0/b/bangkok-election-2022.appspot.com/o/candidates%2Fcompress%2FNo${item.id}.png?alt=media`}  />
              </div>
              <div className='name-governor'>
                <h1>{item.firstName} {item.lastName}</h1>
                <h2>{item.party.name}</h2>
              </div>
              <div className='score-total'>
                <h3>{Number(item.totalVotes).toLocaleString()}</h3>
                <h4>คะแนน</h4>
              </div>
            </div>
          )
        })
      }
      </div>
    
    </div>
  );
}

export default App;
