import React from 'react';
import Home from './components/Home'
import MyContextProvider from './routes/MyContext';


function App() {
  return (
    <MyContextProvider>
        <Home/>
    </MyContextProvider>
  );
}

export default App;
