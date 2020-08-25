import React from 'react';
import {Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";
import { faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";
import  './Header.scss';
import  '../../CSS/darkmode.scss';
import  '../../CSS/lightmode.scss';

library.add(
  faMoonSolid,
  faMoonRegular
);

//Header should have the navbar which allows the user to change the theme
const Header = props => {
  let header_style = ["Toolbar"];
  let light_theme = ["lightthemeEle","lighttheme"];
  let dark_theme = ["darkthemeEle","darktheme"];
  let theme_button_class = ["buttonBold"];

  if(props.darkmode){
    header_style = [...header_style,...dark_theme];
    //theme_button_class = [...theme_button_class,...dark_theme];
  }else{
    header_style = [...header_style,...light_theme];
    //theme_button_class = [...theme_button_class,...light_theme];
  }

  return(
    <header className={header_style.join(' ')}>
      <div className="Logo">
        <Link to="/">Where in the world?</Link>
      </div>
      <nav className="navstyle">
        <button className={theme_button_class.join(' ')} onClick={props.onthemechange}>{ !props.darkmode ? 
                    (<><FontAwesomeIcon icon={['far', 'moon']} /> Dark Mode</>) 
                    : (<><FontAwesomeIcon icon={['fas', 'moon']} />Light Mode</>) }
        </button>      
      </nav>
    </header>
  )
}

export default Header;