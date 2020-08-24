import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CountryList.scss';
import Card from './Card/Card';
import Filter from './Filter/Filter';
import axios from 'axios';

const CountryList = props => {

    const select_continent_options = ["Africa","Americas","Asia","Europe","Oceania"];
    const [filter_continent,set_filter_continent] = useState('');
    const [search_input,set_search_input] = useState('');
    const [list_of_countries,set_list_of_countries] = useState([]);
    const [filtered_countries,set_filtered_countries] = useState([]);
    let inputRef = useRef();
    let selectRef = useRef();

    
    const fetchdata = useCallback(() =>{
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(res=>{
            let country_list = res.data.map((country,i)=>{
                return {flag: country.flag ,name: country.name, 
                        region: country.region, population: country.population, 
                        capital: country.capital, cioc: country.cioc }
            })
            set_list_of_countries(country_list);
            set_filtered_countries(country_list);                
        }).catch((err)=>{
            console.log(err)
        })
    },[]);

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

    const selectCountryHandler = (countrycode,name) =>{
        console.log(countrycode)
        console.log(name)
        console.log(props)
        props.history.push('/country/'+ name + '/' + countrycode);
    }

    let card_display = (<p>Nothing to display for now</p>);
    if(filtered_countries.length > 0){
        card_display = filtered_countries.map((ctr,i)=>{
            return <Card key={i} {...ctr} clicked={()=>selectCountryHandler(ctr.cioc,ctr.name)} />
        })
    }

    return (
        <React.Fragment>
           <Filter ipref={inputRef} selectRef={selectRef} darkmode={props.darkmode} onchange={searchInputHandler} onContinentChange={continentSelectHandler} select_continent_options={select_continent_options}/>
           <div className="card-list-container">
            {card_display}
           </div>
        </React.Fragment>
    );
    
}

export default CountryList;