import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getName} from '../../actions';

export default function SearchBar(){
const dispatch = useDispatch()
const [name,setName] = useState("");

function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
}

function handleSubmit(e){
    e.preventDefault()
    if(name){
        dispatch(getName(name))
    }
    setName('')
}

return (
    <div>
<input type="text" placeholder='buscar por nombre exacto el poke' value={name} onChange={(e) => {handleInputChange(e)}}/>
<button type='submit' value={name} onClick={(e)=> {handleSubmit(e)}}>Buscar</button>
</div>
)


}