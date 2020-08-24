import React, { useState, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';

const CountryList = React.lazy(() => {
  return import('./components/CountryList/CountryList');
});

const CountryDetails = React.lazy(() => {
  return import('./components/CountryDetails/CountryDetails');
});


const  App = (props) => {

  const [darktheme, setdarktheme] = useState(false)

  //Switch the them
  const themeChangeHandler = () =>{
    setdarktheme(!darktheme);
  }

  let routes = (
    <Switch>
      <Route path="/country/:countryname/:countrycode?" render={props => <CountryDetails darktheme={darktheme} {...props} />}/>
      <Route path="/" exact render={props => <CountryList darktheme={darktheme} {...props}/>} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="Site">
      <Header  onthemechange={themeChangeHandler} darkmode={darktheme}/>
      <Main className="Site-content" darkmode={darktheme}>
        <Suspense fallback={<p>Loading...</p>}>
              {routes}
        </Suspense>
      </Main>
      <Footer darkmode={darktheme}/>
    </div>
  );
}

export default withRouter(App);
