import axios from 'axios';

export const setPlaces = (places) => ({
  type: 'SET_PLACES',
  payload: places,
});

export const addPlace = (place) => ({
  type: 'ADD_PLACE',
  payload: place,
});

export const updatePlace = (place) => ({
  type: 'UPDATE_PLACE',
  payload: place,
});

export const deletePlace = (id) => ({
  type: 'DELETE_PLACE',
  payload: id,
});

// Acción para cargar lugares desde el backend
export const fetchPlaces = () => async (dispatch) => {
  try {
    const response = await axios.get('localhost:4000/places'); 
    dispatch(setPlaces(response.data));
  } catch (error) {
    console.error('Error fetching places', error);
  }
};

// Acción para agregar un lugar en el backend
export const addPlaceAsync = (newPlace) => async (dispatch) => {
  try {
    // Realizar la solicitud al backend para guardar la información
    const response = await axios.post('http://localhost:4000/places', newPlace);
    dispatch(addPlace(response.data));
    return response.data;
  } catch (error) {
    console.error('Error al enviar datos al backend', error);
    throw error; 
  }
};

// Acción para obtener un lugar desde el backend
export const getPlacesAsync = () => async (dispatch) => {
    try {
      // Realizar la solicitud al backend para obtener la información
      const response = await axios.get('http://localhost:4000/places'); 
      dispatch(setPlaces(response.data));
      return response.data;
    } catch (error) {
      console.error('Error al obtener lugares desde el backend', error);
      throw error;
    }
  };

// Acción para editar un lugar en el backend
export const editPlaceAsync = (id, updatedFields) => async (dispatch) => {
    try {
      // Realizar la solicitud al backend para actualizar la información
      const response = await axios.patch(`http://localhost:4000/places/${id}`, updatedFields); 
      dispatch(updatePlace(response.data));
      return response.data;
    } catch (error) {
      console.error('Error al enviar datos al backend para editar', error);
      throw error; 
    }
  };

// Acción para eliminar un lugar en el backend
export const deletePlaceAsync = (id) => async (dispatch) => {
    try {
      // Realizar la solicitud al backend para eliminar la información
      await axios.delete(`http://localhost:4000/places/${id}`); 
      dispatch(deletePlace(id));
    } catch (error) {
      console.error('Error al enviar solicitud al backend para eliminar', error);
      throw error;
    }
  };
  