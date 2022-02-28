import React, {useState} from 'react';
import { deletePlanet } from './PlanetSelector';
import PlanetContainer from '../containers/PlanetContainer';
import PlanetList from './PlanetList';


const PlanetDetail = ({selectedPlanet, onPlanetSubmit}) => {

    const baseURL = 'http://localhost:5000/api/planets/';

    const [englishName, setEnglishName] = useState('')
    const [description, setDescription] = useState('')
    const [isPlanet, setIsPlanet] = useState('')

    const IsItPlanet = {
        Yes: 'Yes',
        No: 'No'
    }

    console.log(selectedPlanet);
    const handleDeletePlanet = () => {
        deletePlanet(selectedPlanet._id)
        .then(() => {
            window.location.reload()
        })
    }


    const handleNameChange = (event) => {
        setEnglishName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleIsPlanetChange = (event) => {
        setIsPlanet(event.target.value)
    }

    const resetForm = () => {
        setEnglishName('')
        setDescription('')
        setIsPlanet('')
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const payload = {
            englishName,
            description,
            isPlanet,
            // img
        }
        onPlanetSubmit(payload)
        console.log(payload)
        resetForm()
        window.location.reload()
    }
    

    
  return (
        <>
        <div className='planet-image'>
        <img src={selectedPlanet.img} height="300px" width= "300px"></img>
        </div>
        <div className='planet-details'>
        <p><u>Name</u>: {selectedPlanet.englishName}</p>      
        <p><u>Description</u>: {selectedPlanet.description}</p>
        <p><u>Lenght of Year</u>: {selectedPlanet.lengthOfYear}</p>
        <p><u>Distance from Sun</u>: {selectedPlanet.distanceFromTheSun}</p>
        <p><u>Namesake</u>: {selectedPlanet.namesake}</p>
        <div className='delete-planet'>
            <button onClick={handleDeletePlanet}>
            Destroy Planet!
            </button>
        </div>
        </div>

        <div className='edit-planet'>
        <form onSubmit={handleFormSubmit} id="edit-planet-form" >
             <h2>Edit Planet Details:</h2>
          <div className="formWrap">
                <label htmlFor="name">Name:</label>
                <input 
                onChange={handleNameChange}
                type="text" 
                id="name" 
                value={englishName}
                required />
            </div>
            <div className="formWrap">
                <label htmlFor="description">Description:</label>
                <input 
                onChange={handleDescriptionChange} 
                type="text" 
                id="description" 
                value={description}
                required />
            </div>
            <label htmlFor="isPlanet">Is it a planet though?</label>
            <select name="isPlanet" value={isPlanet} onChange={handleIsPlanetChange}>
            <option value="" disabled>Choose...</option>
            <option value={IsItPlanet.Yes}>Yes it is!</option>
            <option value={IsItPlanet.No}>Nope</option>
            </select>
           

            <input type="submit" value="Save" id="save"/>
	    </form>
        </div>
        </>
        )


}

export default PlanetDetail;