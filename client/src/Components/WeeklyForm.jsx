import React, { useState } from 'react';
import "bootswatch/dist/minty/bootstrap.min.css";


function SuggestionForm() {
  // Estado para almacenar las selecciones del usuario
  const [mealType, setMealType] = useState(''); // Opciones: 'Healthy', 'Regular', 'Vegetarian'

  // Manejar cambios en la selección del usuario
    const handleMealTypeChange = (event) => {
        setMealType(event.target.value);
    };

    // Manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes realizar acciones adicionales, como enviar las selecciones del usuario a un servidor o actualizar el estado de la aplicación.
        console.log('Selección del usuario:', mealType);
    };

    return (
        <div >
        <h4 className='m-3 d-flex justify-content-left'>Meals Suggested</h4>
        <form onSubmit={handleSubmit}>
            <div>
            <label className='m-3 d-flex justify-content-left'>
                Type of Menu:
                <select value={mealType} onChange={handleMealTypeChange} className='bg-info mb-3'>
                <option value="">Select an option</option>
                <option value="Healthy">Healthy</option>
                <option value="Regular">Regular</option>
                <option value="Vegetarian">Vegetarian</option>
                </select>
            </label>
            </div>
            <div>
                <button type="submit" className='btn btn-primary m-3 d-flex justify-content-left '>
                    Save
                </button>
            </div>
        </form>
        </div>
    );
}

export default SuggestionForm;
