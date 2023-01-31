import { useState } from 'react';
import './App.css';
import Footer from './components/Footer'
import Navbar from './components/Navbar';
import Results from './components/Results';
import Searchbar from './components/Searchbar';
import Tutorial from './components/Tutorial';

function App() {
  const [data, setData] = useState({
    videos: [],
    status: true
  })
  return (
    <div className="App">
      <div className="container-fluid p-0">
        <Navbar />
        <Searchbar onResultsFetch={(res) => {
          setData(res)
        }} />
        <Results {...data} />
        <Tutorial />
      </div>
      <Footer />
    </div>
  );
}

export default App;
