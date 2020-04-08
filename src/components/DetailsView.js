import './Css/DetailsView.scss'
import React from 'react'

export default function DetailsView(props) {
    const totalKeyArray = ['confirmed' , 'recovered' , 'deaths'];

    const {
        location: {country , province , latest} , onClickClose
    } = props;


    let title = `${country}`
        if (province !== '' && province !== country) {
            title = `${province}-${country}`;
        }

    const totalElements = totalKeyArray.map((key) => {
        const count = latest[key];
        return (
            <div className="columns">
                <div className="column">
                    <h6 className="title is-6">{key}</h6>
                </div>
                <div className="column">
                    <h6 className="title is-6">{count}</h6>
                </div>
            </div>
        )
    })

    return (
        <div className="details-view">
            <div className="details-view-close"
                onClick={onClickClose}
            >&times;</div>
    
            <div className="details-view-content">
                <h2 className="title is-4">{title}</h2>
                {totalElements}
            </div>                     
        </div> 
    )
}
