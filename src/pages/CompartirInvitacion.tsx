import React, { useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas'; // Librería para capturar el DOM como imagen
import './css/felizcum.css';
import { useHistory} from 'react-router-dom';

// Define el tipo para los datos que pasas en location.state
interface LocationState {
  responseText: string;
  invitationData: {
    inviteeName: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventType: string;
    birthdayName?: string;
    birthdayAge?: string;
  };
}
const CompartirInvitacion: React.FC = () => {
  // Usamos useLocation y especificamos el tipo de estado que esperamos
  const location = useLocation<LocationState>();
  const history = useHistory(); // Usamos his


  // Accedemos al estado recibido
  const { responseText, invitationData } = location.state || {}; // location.state puede ser null

  // Desestructuramos los datos de invitationData
  const {
    inviteeName,
    eventDate,
    eventTime,
    eventLocation,
    eventType,
    birthdayName,
    birthdayAge
  } = invitationData || {}; 

   const captureAsImage = () => {
    const invitationElement = document.getElementById('invitation');
    if (invitationElement) {
      html2canvas(invitationElement).then((canvas) => {
        const imageUrl = canvas.toDataURL();
 
        // Redirigir a la ruta y pasar la imagen como estado
        history.push({
          pathname: '/CompartirPor', 
          state: { imageUrl }, 
        });
      });
    }
  };


   



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Compartir Invitación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="p-6">
        {/* Mostrar el texto de la invitación */}
        {responseText ? (
          <div className="border border-gray-300 rounded-md p-4">
            <IonText>{responseText}</IonText>
          </div>
        ) : (
          <IonText>Compartir por...</IonText>
        )}

<div
  id="invitation"
  className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto relative "
  style={{
    backgroundImage: 'url(images/felizcum.png)', // Ruta de la imagen de fondo
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.8, // Aquí controlas la opacidad solo de la imagen
  }}
>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-purple-600">¡Estás invitado!</h1>
            <p className="text-lg mt-2 text-gray-600">A un evento muy especial</p>
          </div>

          {/* Mostrar los detalles del evento */}
          <div className="mb-4">
            <p><strong>Nombre del invitado:</strong> {inviteeName}</p>
            <p><strong>Fecha del evento:</strong> {eventDate}</p>
            <p><strong>Hora del evento:</strong> {eventTime}</p>
            <p><strong>Lugar del evento:</strong> {eventLocation}</p>
            <p><strong>Tipo de evento:</strong> {eventType}</p>
            {eventType === 'cumpleaños' && (
              <>
                <p><strong>Nombre del cumpleañero:</strong> {birthdayName}</p>
                <p><strong>Edad del cumpleañero:</strong> {birthdayAge}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4">
            <IonButton color="primary" onClick={captureAsImage}>
              Capturar Invitación
            </IonButton>
          </div>

      </IonContent>
    </IonPage>
  );
};

export default CompartirInvitacion;
