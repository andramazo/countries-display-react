import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CountryList.scss';
import Filter from './Filter/Filter';
import axios from 'axios';
import Card from './Card/Card';

//This component is used for displaying the list of the countries
const CountryList = props => {
    const select_continent_options = ["Africa","Americas","Asia","Europe","Oceania"];
    const [filter_continent,set_filter_continent] = useState('');
    const [search_input,set_search_input] = useState('');
    const [list_of_countries,set_list_of_countries] = useState([]);
    const [filtered_countries,set_filtered_countries] = useState([]);
    let inputRef = useRef();
    let selectRef = useRef();
    
    //Fetches the data from the rest api
    const fetchdata = useCallback(() =>{
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(res=>{
            set_list_of_countries(res.data);
            set_filtered_countries(res.data);                
        }).catch((err)=>{
            console.log(err)
        })
    },[]);

    //Filter the country based on the provided input or dropdown
    const call_countries_api = useCallback(() =>{
        let filtered_country = list_of_countries;
        if(search_input){
            filtered_country = list_of_countries.filter(country=>{
                let name = country.name.toLowerCase();
                return name.includes(search_input.toLowerCase());
            })
        }
        if(filter_continent){
            filtered_country = filtered_country.filter(country=>{
                let region = country.region.toLowerCase();
                return region.includes(filter_continent.toLowerCase());
            })
        }
        set_filtered_countries(filtered_country);      
    },[filter_continent,list_of_countries,search_input])

    //Run it only when component is loaded
    useEffect(()=>{
        fetchdata()
    },[fetchdata]);

    //Filter the country list based on the filter
    useEffect(()=>{
        if((search_input ===  inputRef.current.value) || (filter_continent ===  selectRef.current.value)){
            call_countries_api();
        }
    },[search_input,inputRef,filter_continent,selectRef,call_countries_api]);


    //Get the value for the user search input to display the list of the countries
    const searchInputHandler = (e) =>{
        set_search_input(e.target.value)
    }

    //Filter the countries by continet
    const continentSelectHandler = (e) =>{
        set_filter_continent(e.target.value)
    }

    //Called when specific country is selected
    const selectCountryHandler = (countryname) =>{
        props.history.push('/country/'+ countryname);
    }

    let card_display = (<div className="notFoundContainer"><p>Oops! unable to find the country you are looking for.</p></div>);
    //Display the list of countries
    if(filtered_countries.length > 0){
        card_display = filtered_countries.map((ctr,i)=>{
            return <Card key={i} {...ctr} clicked={()=>selectCountryHandler(ctr.name)} />
        })
        card_display = (<div className="card-list-container">{card_display}</div>)
    }

    return (
        <React.Fragment>
           <Filter ipref={inputRef} selectRef={selectRef} darkmode={props.darkmode} onchange={searchInputHandler} onContinentChange={continentSelectHandler} select_continent_options={select_continent_options}/>
            {card_display}
        </React.Fragment>
    );
    
}

export default CountryList;