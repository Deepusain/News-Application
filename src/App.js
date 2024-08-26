import React, {useState}  from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App=()=> {
  const [mode,setMode] = useState('light');

  const toggleMode =()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor='black';

  
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
    }
  }
  const pagesize=15;
  const apikey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress]=useState(0)
  return (
    <div >
      <Router>
      <Navbar  apiKey={apikey} mode={mode} toggleMode={toggleMode}  />
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
      <Routes>
          <Route exact path="/" element={<News setProgress={setProgress}   key="general"  apiKey={apikey}  mode={mode} pageSize={pagesize} country='in' category="general"/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress}   key="business"  apiKey={apikey} mode={mode} pageSize={pagesize} country='in' category="business"/>} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress}   key="entertainment"  apiKey={apikey} mode={mode} pageSize={pagesize} country='in' category="entertainment"/>} />
          <Route exact path="/general" element={<News setProgress={setProgress}   key="general"  apiKey={apikey} mode={mode} pageSize={pagesize} country='in' category="general"/>} />
          <Route exact path="/health" element={<News setProgress={setProgress}   key="health"  apiKey={apikey} mode={mode} pageSize={pagesize} country='in' category="health"/>} />
          <Route exact path="/science" element={<News setProgress={setProgress}   key="science"  apiKey={apikey} mode={mode} pageSize={pagesize} country='in' category="science"/>} />
          <Route exact path="/sports" element={<News setProgress={setProgress}   key="sports"  apiKey={apikey} mode={mode} pageSize={pagesize} country='in' category="sports"/>} />
          <Route exact path="/technology" element={<News setProgress={setProgress}   key="tech"  apiKey={apikey} mode={mode} pageSize={pagesize} country='in' category="technology"/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
