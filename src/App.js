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

/**
 * This is the main component for the application 
 * We are using two routes - Countrylist and second one is details for the country  
 */
const  App = (props) => {

  //Need to set the state for changing the theme color
  const [darktheme, setdarktheme] = useState(false)

  //Switch the theme to dark or light
  const themeChangeHandler = () =>{
    setdarktheme(!darktheme);
  }

  const rootPage = process.env.NODE_ENV === "development" ? "/" : "/countries-display-react/";

  //Two routers to display the required information
  let routes = (
    <Switch>
      <Route path={`${rootPage}country/:countryname`} render={props => <CountryDetails darkmode={darktheme} {...props} />}/>
      <Route path={rootPage} exact render={props => <CountryList darkmode={darktheme} {...props}/>} />
      <Redirect to={rootPage} />
    </Switch>
  );

  //Router component will be displayed inside the Main component
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
