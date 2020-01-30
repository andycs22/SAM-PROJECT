import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import sobre from '../assets/images/about-us.jpg';
import TypoGraphy from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';

export function About() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <h1 className='main-title top'>¿Quién es SAM?</h1>
        <Container maxWidth='lg'>
          <section className='intro'>
            <p>
              <TypoGraphy variant='body1' className='about-text'>
                SAM es el acróstico de Software A Medida. Nace tras ver la necesidad
                de ofrecer a los asistentes a eventos obsequios mas practicos y
                faciles de transportar que los 'paquetes de bienvenida'
            </TypoGraphy>
            </p>
          </section>

          <section className='content'>
            <img src={sobre} width='100%vw' />
            <p>
              <TypoGraphy variant='body1' className='about-text'>
                No sólo vendemos el software mas actual y con mayor demanda para las soluciones
                del día a día de las empresas y usuarios, sino que lo hacemos con los descuentos
                mas atractivos. La idea es que encuentres lo que busques rapido, facil y economico
                sin tener que perderte navegando por la web
            </TypoGraphy>
            </p>
            <p>
              <TypoGraphy variant='body1' className='about-text'>
                Tambien generamos software propio, estamos creciendo para poder dar respuesta a
                la gran demanda por lo que si quieres trabajar con nosotros dejanos tus datos y
                nos pondremos en contacto contigo
            </TypoGraphy>
            </p>
          </section>

          <section className='contact' id='contactUs'>
            <TypoGraphy variant='h4' gutterBottom className='about-text'>
              Contáctanos
          </TypoGraphy >
            <DialogContent>
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label='Email'
                type='email'
                variant='standard'
              />
              <TextField
                margin='dense'
                id='name'
                label='Texto'
                type='text'
                fullWidth
              />
            </DialogContent>
            <Button variant='contained' color='primary'>
              Enviar
          </Button>
          </section>

          <div className='job'>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleClickOpen}
            >
              ¿Quieres trabajar con nosotros?
          </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='form-dialog-title'
            >
              <DialogTitle id='form-dialog-title'>Datos</DialogTitle>
              <DialogContent>
                <DialogContentText>Escribe aquí tus datos</DialogContentText>
                <TextField
                  autofocus
                  margin='dense'
                  id='name'
                  label='Nombre'
                  type='text'
                  fullWidth
                  className='about-text'
                />
                <TextField
                  margin='dense'
                  id='surname'
                  label='Apellidos'
                  type='text'
                  fullWidth
                  className='about-text'
                />
                <TextField
                  margin='dense'
                  id='phone'
                  label='Teléfono'
                  type='phone'
                  fullWidth
                  className='about-text'
                />
                <TextField
                  margin='dense'
                  id='mail'
                  label='Email'
                  type='email'
                  fullWidth
                  className='about-text'
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color='primary'>
                  Cancelar
              </Button>
                <Button onClick={handleClose} color='primary'>
                  Enviar
              </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
