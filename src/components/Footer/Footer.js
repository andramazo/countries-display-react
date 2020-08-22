import React from 'react';
import  './Footer.scss';

const Footer = props => {

  let light_theme = ["lightthemeEle","lighttheme"];
  let dark_theme = ["darkthemeEle","darktheme"];
  let footer_style= ["footer"];

  if(props.darkmode){
    footer_style = [...footer_style,...dark_theme];
  }else{
    footer_style = [...footer_style,...light_theme];
  }

    return (<footer className={footer_style.join(' ')}>
              <div>Anushree Dave | <a className="linkStyle" href="https://www.andramazo.com">andramazo.com</a> | <a className="linkStyle" href="https://twitter.com/andramazo">@andramazo</a> </div>
              <div>Made with <span className="heartEmoji">&#10084;</span> in Toronto</div>
            </footer>
            )
};

export default Footer;