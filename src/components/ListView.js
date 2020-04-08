import './Css/ListView.scss'
import React  from 'react'


const totalKeyArray = ['confirmed' , 'recovered' , 'deaths'];

export default function ListView(props) {
    const { locationArray } = props;
    console.log(locationArray);

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
                <div className="list-view-location">
                    <div className="columns">
                        <div className="column">
                            <h6 className="title is-6">Country</h6>
                        </div>
                        <div className="column">
                            <h6 className="title is-6">1234</h6>
                        </div>
                    </div>
                </div>          
        </div>
    )
}
