import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './Filter.scss';

//Filter to look up for the desire country
//There are two filters here- input search by country name or by selecting the regions
const Filter = props => {
    let filter_container = ["filterContainer"];
    let element_style = ["lightthemeEle"];
    
    if(props.darkmode){
        filter_container = [...filter_container,"darktheme"];
        element_style = ["darkthemeEle"];
    }else{
        filter_container = [...filter_container,"lighttheme"];
    }
    
    let option_value = [(<option key="filterbyregion" value="">Filter by Region</option>)]
    option_value.push(props.select_continent_options.map((d,i)=>{
        return (<option key={i} value={d}>{d}</option>)
    }))

    return (
        <div className={filter_container.join(' ')}>
            <div className={element_style.join(' ')}>
                <FontAwesomeIcon icon={faSearch} />
                <input ref={props.ipref} type="text" placeholder="Search for a country..." onChange={props.onchange} />
            </div>
            <div className={element_style.join(' ')}>
                <label>
                    <select ref={props.selectRef} name="continents" onChange={props.onContinentChange}>
                        {option_value}
                    </select>
                </label>
            </div>
        </div>
    );    
}

export default Filter;