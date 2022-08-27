import React from "react";


export default function Card({name, img, id, types, createdInDb}){
return(
    <div>
        <h3>{name}</h3>
        <h3> {id}</h3>
            <img src={img} alt="" />
        
        <div>
   
            {types && types[0].name}
            { types && types[1] && types[1].name    }

        </div>
    </div>

)




}