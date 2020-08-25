import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button/Button';
import Details from './Details/Details';
import  './CountryDetails.scss';

//Displays the details for the selected country
const CountryDetails = props => {

  const [country_details,set_country_details] = useState([])

  //Fetch the selected country information
  useEffect(()=>{
    if(props.match.params.countryname){
      //+ props.match.params.countryname + '?fullText=true'
      axios.get('https://restcountries.eu/rest/v2/all')
      .then(res=>{
        let country = res.data.filter(da=> da.name === props.match.params.countryname)
        let borders_country = res.data.filter(bor=>{
          return country[0].borders.includes(bor.alpha3Code);
        })
        country = [{...country[0], borders_country: borders_country}];
        set_country_details(country)
      }).catch((err)=>{
      })
    }else{
      set_country_details([])
    }
  },[props.match.params.countryname]);

  //Takes user to previous page
  const goBackHandler = () =>{
    props.history.goBack();
  }

  //When the country is selected from the bordr- it displays the value for that country
  const selectBorderHandler = (countryname) =>{
    props.history.push('/country/'+ countryname);
  }

  let display_country_details = (<div className="notFoundContContainer">
                                    <p>Sorry, unable to find the city you are looking for.</p></div>);

  if(country_details.length > 0){
    display_country_details = (<Details borderClick={selectBorderHandler} darkmode={props.darkmode} {...country_details[0]}/>)
  }

  return (
      <React.Fragment>
        <Button darkmode={props.darkmode} height="50" clicked={goBackHandler} />
        {display_country_details}
      </React.Fragment>
  );
    
}

export default CountryDetails;