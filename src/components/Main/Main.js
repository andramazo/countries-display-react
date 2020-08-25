import React from 'react';
import './Main.scss';

//Displays the child component passed from the route
const Main = props => {
    let main_style = ["Site-content"];
    let light_theme = ["lighttheme"];
    let dark_theme = ["darktheme"];

    if(props.darkmode){
        main_style = [...main_style,...dark_theme];
    }else{
        main_style = [...main_style,...light_theme];
    }

    return (
        <main className={main_style.join(' ')} >
            {props.children}
        </main>
    );
    
}

export default Main;