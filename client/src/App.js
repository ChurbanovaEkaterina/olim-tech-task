import {useState, useEffect, createContext} from 'react';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';

export const AppContext = createContext(null);

function App() {
  const [userName, setUserName]=useState("")
  const [login, setLogin]=useState(false)

  useEffect(() => {
    // TEST API, it might be removed
    fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
      console.log('API CONNECTION IS OK');
    }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
  }, []);

  return (
    <AppContext.Provider value={{userName, setUserName, login, setLogin}}>
      <div className="App">
        {login?<Main userName={userName}/>:
        <Login/>}
      </div>
    </AppContext.Provider>
  );
}

export default App;
