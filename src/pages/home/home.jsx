import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { addPlaceAsync, getPlacesAsync, editPlaceAsync, deletePlaceAsync } from '../../redux/actions/placesActions';
import { connect } from 'react-redux';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import AddLocationRoundedIcon from '@mui/icons-material/AddLocationRounded';
import EditLocationRoundedIcon from '@mui/icons-material/EditLocationRounded';
import WrongLocationRoundedIcon from '@mui/icons-material/WrongLocationRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const Home = ({ places }) => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editPlaceId, setEditPlaceId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [telefonoError, setTelefonoError] = useState(false);
  const [longitud, setLongitud] = useState('');
  const [longitudError, setLongitudError] = useState('');
  const [latitud, setLatitud] = useState('');
  const [latitudError, setLatitudError] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [horario, setHorario] = useState('');
  const [horarioError, setHorarioError] = useState('');
  const [tipo, setTipo] = useState('');
  const [tipoError, setTipoError] = useState('');
  const [placesList, setPlacesList] = useState([]);
  const defaultLat= -29.42981677595742;
  const defaultLng= -66.86879206086878;
  const defaultZoom=17;

  const handleOpenModal = () => {
    setOpenModal(true);
    setNombre('');
    setTelefono('');
    setLongitud('');
    setLatitud('');
    setUrl('');
    setDescripcion('');
    setHorario('');
    setTipo('');

    setNombreError(false);
    setTelefonoError(false);
    setLongitudError(false);
    setLatitudError(false);
    setUrlError(false);
    setDescripcionError(false);
    setHorarioError(false);
    setTipoError(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditModal(false);
    setEditPlaceId(null);
    setNombreError(false);
    setTelefonoError(false);
    setLongitudError(false);
  };

  const handleCargarPuntoInteres = async () => {
    if (!nombre) {
      setNombreError(true);
      return;
    }

    if (!/^\d+$/.test(telefono)) {
      setTelefonoError(true);
      return;
    }

    if (!/^-?\d+(\.\d+)?$/.test(longitud)) {
      setLongitudError(true);
      return;
    }

    if (!/^-?\d+(\.\d+)?$/.test(latitud)) {
        setLatitudError(true);
        return;
      }
  
      if (!url) {
        setUrlError(true);
        return;
      }
  
      if (!descripcion) {
        setDescripcionError(true);
        return;
      }
  
      if (!horario) {
        setHorarioError(true);
        return;
      }
  
      if (!tipo) {
        setTipoError(true);
        return;
      }

    const tipoArray = tipo ? tipo.split(',').map((item) => item.trim()) : [];

    const newPlace = {
      nombre: nombre,
      telefono: telefono,
      longitud: parseFloat(longitud),
      latitud: latitud,
      url: url,
      descripcion: descripcion,
      horario: horario,
      tipo: tipoArray,
    };

    try {
      await dispatch(addPlaceAsync(newPlace));
      alert('Punto de interés cargado');
      handleCloseModal();
    } catch (error) {
      console.error('Error al cargar el punto de interés', error);
    }
  };

  const handleVerPuntosInteres = async () => {
    try {
      const placesData = await dispatch(getPlacesAsync());
      setPlacesList(placesData);
    } catch (error) {
      console.error('Error al obtener puntos de interés', error);
    }
  };

  const handleEditarPuntoInteres = (placeId) => {
    const placeToEdit = placesList.find((place) => place._id === placeId);
    setEditPlaceId(placeId);
    setNombre(placeToEdit.nombre);
    setTelefono(placeToEdit.telefono);
    setLongitud(placeToEdit.longitud.toString());
    setLatitud(placeToEdit.latitud.toString());
    setUrl(placeToEdit.url);
    setDescripcion(placeToEdit.descripcion);
    setHorario(placeToEdit.horario);
    setTipo(placeToEdit.tipo);
    setEditModal(true);
  };

  const handleGuardarEdicion = async () => {
    if (!nombre) {
      setNombreError(true);
      return;
    }

    if (!/^\d+$/.test(telefono)) {
      setTelefonoError(true);
      return;
    }

    if (!/^-?\d+(\.\d+)?$/.test(longitud)) {
      setLongitudError(true);
      return;
    }

    if (!/^-?\d+(\.\d+)?$/.test(latitud)) {
        setLatitudError(true);
        return;
      }
  
      if (!url) {
        setUrlError(true);
        return;
      }
  
      if (!descripcion) {
        setDescripcionError(true);
        return;
      }
  
      if (!horario) {
        setHorarioError(true);
        return;
      }
  
      if (!tipo) {
        setTipoError(true);
        return;
      }

    const editedPlace = {
      nombre: nombre,
      telefono: telefono,
      longitud: parseFloat(longitud),
      latitud: latitud,
      url: url,
      descripcion: descripcion,
      horario: horario,
      tipo: tipo,
    };

    try {
      await dispatch(editPlaceAsync(editPlaceId, editedPlace));
      alert('Punto de interés Actualizado');
      handleCloseModal();
    } catch (error) {
      console.error('Error al editar el punto de interés', error);
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
    setNombreError(false);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
    setTelefonoError(false);
  };

  const handleLongitudChange = (event) => {
    setLongitud(event.target.value);
    setLongitudError(false);
  };

  const handleLatitudChange = (event) => {
    setLatitud(event.target.value);
    setLatitudError(false);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setUrlError(false);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
    setDescripcionError(false);
  };

  const handleHorarioChange = (event) => {
    setHorario(event.target.value);
    setHorarioError(false);
  };

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
    setTipoError(false);
  };
  

  const isCargarButtonDisabled =
    !nombre ||
    !telefono ||
    !longitud ||
    !/^\d+$/.test(telefono) ||
    !/^-?\d+(\.\d+)?$/.test(longitud);


  const handleEliminarPuntoInteres = async (placeId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este punto de interés?')) {
      try {
        await dispatch(deletePlaceAsync(placeId));
        alert('Punto de interés Eliminado');
        handleVerPuntosInteres();
      } catch (error) {
        console.error('Error al eliminar el punto de interés', error);
      }
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          startIcon={<AddLocationRoundedIcon />}
        >
          Cargar Punto de Interés
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVerPuntosInteres}
          startIcon={<MapsHomeWorkRoundedIcon />}
        >
          Ver Puntos de Interés
        </Button>
      </div>

      <Grid container spacing={2}>
        {placesList.map((place) => (
          <Grid item xs={12} sm={6} md={4} lg={5} key={place._id}>
            <Paper style={{ padding: 10, position: 'relative', height: '100%' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {place.nombre}
              </Typography>
              {place.url && (
                <img
                  src={place.url}
                  alt={`Imagen de ${place.nombre}`}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '8px' }}
                />
              )}
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={1}>
                  <AccountCircleRoundedIcon color="primary" />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    Telefono: {place.telefono}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={1}>
                  <PublicRoundedIcon color="primary" />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    Longitud: {place.longitud}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    Latitud: {place.latitud}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={1}>
                  <InfoRoundedIcon color="primary" />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                     {place.descripcion}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={1}>
                  <WatchLaterRoundedIcon color="primary" />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    Horario: {place.horario}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={1}>
                  <FilterAltRoundedIcon color="primary" />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    Tipo: {place.tipo.join(', ')}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditarPuntoInteres(place._id)}
                style={{ width: '100%', marginTop: '10px' }}
                startIcon={<EditLocationRoundedIcon />}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleEliminarPuntoInteres(place._id)}
                style={{ width: '100%', marginTop: '10px' }}
                startIcon={<WrongLocationRoundedIcon />}
              >
                Eliminar
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

        
      <div style={{ margin: '20px 0', height: '400px', position: 'relative' }}>
        <MapContainer
          center={[defaultLat, defaultLng]}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {placesList.map((place) => (
            <Marker key={place._id} position={[place.latitud, place.longitud]}>
              <Popup>{place.nombre}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>


      <Dialog open={openModal || editModal} onClose={handleCloseModal}>
        <DialogTitle>{editModal ? 'Editar' : 'Cargar'} Punto de Interés</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              value={nombre}
              onChange={handleNombreChange}
              error={nombreError}
              helperText={nombreError ? 'El nombre es obligatorio' : ''}
              required
            />
            <TextField
              label="Teléfono"
              fullWidth
              margin="normal"
              value={telefono}
              onChange={handleTelefonoChange}
              error={telefonoError}
              helperText={telefonoError ? 'El teléfono debe ser numérico' : ''}
              required
            />
            <TextField
              label="Longitud"
              fullWidth
              margin="normal"
              value={longitud}
              onChange={handleLongitudChange}
              error={longitudError}
              helperText={longitudError ? 'La longitud debe ser numérica' : ''}
              required
            />
            <TextField
              label="Latitud"
              fullWidth
              margin="normal"
              value={latitud}
              onChange={handleLatitudChange}
              error={latitudError}
              helperText={latitudError ? 'La latitud debe ser numérica' : ''}
              required
            />
            <TextField
              label="Imagen URL"
              fullWidth
              margin="normal"
              value={url}
              onChange={handleUrlChange}
              error={urlError}
              helperText={urlError ? 'La url es obligatoria' : ''}
              required
            />
            <TextField
              label="Descripcion"
              fullWidth
              margin="normal"
              value={descripcion}
              onChange={handleDescripcionChange}
              error={descripcionError}
              helperText={descripcionError ? 'La descripcion es obligatoria' : ''}
              required
            />
            <TextField
              label="Horario"
              fullWidth
              margin="normal"
              value={horario}
              onChange={handleHorarioChange}
              error={horarioError}
              helperText={horarioError ? 'El horario es obligatorio' : ''}
              required
            />
            <TextField
              label="Tipo"
              fullWidth
              margin="normal"
              value={tipo}
              onChange={handleTipoChange}
              error={tipoError}
              helperText={tipoError ? 'El tipo es obligatorio' : ''}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={editModal ? handleGuardarEdicion : handleCargarPuntoInteres}
            color="primary"
            disabled={isCargarButtonDisabled}
          >
            {editModal ? 'Guardar Edición' : 'Cargar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  places: state,
});

export default connect(mapStateToProps)(Home);
