import './Css/ListView.scss'
import React  from 'react'


const totalKeyArray = ['confirmed' , 'recovered' , 'deaths'];

export default function ListView(props) {
    const { locationArray
        , selectedLocation 
        , onSelectItem 
        , onDeselectItem } = props;


    function onClickItem(id) {
        if(selectedLocation === null) {
            onSelectItem(id)
        }
        else if (selectedLocation.id !== id) {
            onSelectItem(id)
        }
        else {
            onDeselectItem();
        }

    }
    
    const locationElements = locationArray.map((location) => {
        const {
            id , 
            country , 
            province ,           
            latest: {confirmed}
         } = location;
      

        let title = `${country}-(${confirmed})`
        if (province !== '' && province !== country) {
            title = `${province}-${country}-(${confirmed})`;
        }

        let locationClass = 'list-view-location';
        if (selectedLocation !== null) {
            if (location.id === selectedLocation.id) {
                locationClass += ' selected';
            }
        }
        
        return (
            <div key={`${id}-${country}`}  
                className={locationClass}
                onClick={() => onClickItem(id)}    
            >
                <div className="columns">
                <div className="column">
                    <h6 className="title is-6">{title}</h6>
                </div>
                <div className="column">
                    <h6 className="title is-6">{confirmed}</h6>
                </div>
            </div>
            </div>
        )       
    }); // END : location elements
    const totalElements = totalKeyArray.map( (key) => {
     
        const sum = locationArray.reduce( (sum , location) => {
            return sum + location.latest[key]; // confirmed
        } , 0);

        return (
            <div key={key} className="columns">
                <div className="column">
                    <h6 className="title is-6">{key}</h6>
                </div>
                <div className="column">
                    <h6 className="title is-6">{sum}</h6>
                </div>
            </div>
        )
    });




    return (
        <div className="list-view">
                <div className="list-view-brand">
                    <h2 className="title is-4">COVID-19 Tracker</h2>
                </div>
                <div className="list-view-total">
                    <h2 className="title is-4">Total</h2>
                    {totalElements}
                </div>
                <div className="list-view-locations">
                    {locationElements}
                </div>          
        </div>
    )
}
