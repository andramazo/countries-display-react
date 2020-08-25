import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './Button.scss';

//Back button Component
const Button = props => {
    let button_container = ["backContainer"];
    let element_style = ["lightthemeEle"];
    
    if(props.darkmode){
        button_container = [...button_container,"darktheme"];
        element_style = ["darkthemeEle"];
    }else{
        button_container = [...button_container,"lighttheme"];
    }
 
    return (
        <div className={button_container.join(' ')}>
            <div className={element_style.join(' ')}>                
                <button onClick={props.clicked}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Back</span>
                </button>
            </div>
        </div>
    );
    
}

export default Button;