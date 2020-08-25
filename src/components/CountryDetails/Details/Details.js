import React from 'react';
import './Details.scss';

//Display the Country Details
const Details = props => {
    let details_container = ["detailContainer"];
    let light_theme = ["lighttheme"];
    let dark_theme = ["darktheme"];
    let currencies = props.currencies.map(cur => cur.code);
    let languages = props.languages.map(cur => cur.name);
    let element_style = [...light_theme,"lightthemeEle"];

    if(props.darkmode){
        details_container = [...details_container,...dark_theme];
        element_style = [...dark_theme,"darkthemeEle"];
    }else{
        details_container = [...details_container,...light_theme];
    }

    let border_countries = null;
    if(props.borders.length > 0){
        let border_button = props.borders_country.map((bord,i)=> 
                            <button className={element_style.join(' ')} key={i} onClick={()=>props.borderClick(bord.name)}>{bord.name}</button>)
        border_countries = (<div className="borderContainer">
                                <h3>Border Countries: </h3> <div>{border_button}</div> 
        </div>);
    }

    return (
        <div className={details_container.join(' ')}>
            <div><img src={props.flag} alt={props.name} /></div>
            <div className="detailsProviderContainer">
                <h1>{props.name}</h1>
                <div className="detailsProvider">
                    <div>
                        <div>Native Name: <span>{props.nativeName}</span></div>
                        <div>Population: <span>{props.population}</span></div>
                        <div>Region: <span>{props.region}</span></div>
                        <div>Sub Region: <span>{props.subregion}</span></div>
                        <div>Capital: <span>{props.capital}</span></div>
                    </div>
                    <div>
                        <div>Top Level Domain: <span>{props.topLevelDomain.join(',')}</span></div>
                        <div>Currrencies: <span>{currencies.join(',')}</span></div>
                        <div>Languages: <span>{languages.join(',')}</span></div>
                    </div>
                </div>
                {border_countries}
            <div>
            </div>
        </div>
        </div>
    );
    
}

export default Details;