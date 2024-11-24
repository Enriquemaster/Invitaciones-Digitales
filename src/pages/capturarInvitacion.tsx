import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton } from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import html2canvas from 'html2canvas';
import './css/felizcum.css';

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

const CapturarInvitacion: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  // Accedemos al estado recibido
  const { responseText, invitationData } = location.state || {}; 

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
        history.push({
          pathname: '/CompartirPor',
          state: { imageUrl, responseText, eventType },
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
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto relative"
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

export default CapturarInvitacion;
