import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

function App() {

  const [darktheme, setdarktheme] = useState(false)

  //Switch the them
  const themeChangeHandler = () =>{
    setdarktheme(!darktheme);
  }

  return (
    <div className="App Site">
            <div className="Sitecontent">
              <div className="App-header"> 
                  <Header  onthemechange={themeChangeHandler} darkmode={darktheme}/>
              </div>
              <div className="main">
              {/*   <Main /> */}
              </div>
            </div>
            <Footer darkmode={darktheme}/>
    </div>
  );
}

export default App;
