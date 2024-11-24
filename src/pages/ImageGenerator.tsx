import React, { useState } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonText, IonHeader, IonToolbar, IonTitle, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useHistory } from 'react-router-dom'; // Importar useHistory

const EventInvitationGenerator: React.FC = () => {
  // Estados para los campos de entrada
  const [inviteeName, setInviteeName] = useState<string>(''); // Nombre del invitado
  const API_KEY = 'AIzaSyCcrvK3Ebnvf9KlXY_sCtqAYK3vuKe0Kcw'; // Reemplaza con tu clave real
  const [eventDate, setEventDate] = useState<string>(''); // Fecha del evento
  const [eventTime, setEventTime] = useState<string>(''); // Hora del evento
  const [eventLocation, setEventLocation] = useState<string>(''); // Lugar del evento
  const [responseText, setResponseText] = useState<string>(''); // Respuesta de la API
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [eventType, setEventType] = useState<string>(''); // Tipo de evento
  const [birthdayName, setBirthdayName] = useState<string>(''); // Nombre del cumpleañero
  const [birthdayAge, setBirthdayAge] = useState<string>(''); // Edad que cumplirá el cumpleañero
  const history = useHistory(); // Inicializar useHistory

  const handleShareInvitation = () => {
    history.push('/capturarInvitacion', { responseText, invitationData  }); // Navegar y pasar el texto
  };


 // Crear un objeto con los datos relevantes que deseas pasar
 const invitationData = {
  inviteeName,
  eventDate,
  eventTime,
  eventLocation,
  eventType,
  birthdayName,
  birthdayAge,
};



  const handleGenerateInvitation = async () => {
    if (!inviteeName || !eventDate || !eventTime || !eventLocation || !eventType || (eventType === 'cumpleaños' && (!birthdayName || !birthdayAge))) {
      setResponseText('Por favor, llena todos los campos.');
      return; // Verifica que todos los campos estén llenos
    }

   

    // Crear el prompt para la invitación utilizando los valores de los campos
    let prompt = `Crea una invitación para un evento. El invitado es ${inviteeName}, el evento será el ${eventDate} a las ${eventTime} en ${eventLocation}.`;

    // Si el evento es de tipo "Cumpleaños", incluir detalles adicionales
    if (eventType === 'cumpleaños') {
      prompt += ` El evento es un cumpleaños, el cumpleañero es ${birthdayName}, que cumplirá ${birthdayAge} años.`;
    }

    setLoading(true); // Activa el estado de carga
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResponseText(response.text()); // Establece el texto generado como respuesta
    } catch (error) {
      console.error('Error al generar la invitación:', error);
      setResponseText('Error al generar la invitación'); // En caso de error
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Generador de Invitaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Generador de invitaciones para eventos</h1>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <IonLabel>Nombre del invitado</IonLabel>
              <IonInput
                value={inviteeName}
                onIonChange={e => setInviteeName(e.detail.value!)}
                placeholder="Nombre del invitado"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <IonLabel>Fecha del evento</IonLabel>
              <IonInput
                value={eventDate}
                onIonChange={e => setEventDate(e.detail.value!)}
                placeholder="Fecha del evento"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <IonLabel>Hora del evento</IonLabel>
              <IonInput
                value={eventTime}
                onIonChange={e => setEventTime(e.detail.value!)}
                placeholder="Hora del evento"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <IonLabel>Lugar del evento</IonLabel>
              <IonInput
                value={eventLocation}
                onIonChange={e => setEventLocation(e.detail.value!)}
                placeholder="Lugar del evento"
                className="border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <IonLabel>Tipo de evento</IonLabel>
            <IonSelect
              value={eventType}
              onIonChange={e => setEventType(e.detail.value!)}
              placeholder="Selecciona el tipo de evento"
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <IonSelectOption value="cumpleaños">Cumpleaños</IonSelectOption>
              <IonSelectOption value="boda">Boda</IonSelectOption>
              <IonSelectOption value="fiesta">Fiesta</IonSelectOption>
              <IonSelectOption value="reunion">Reunión</IonSelectOption>
            </IonSelect>
          </div>

          {eventType === 'cumpleaños' && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <IonLabel>Nombre del cumpleañero</IonLabel>
                <IonInput
                  value={birthdayName}
                  onIonChange={e => setBirthdayName(e.detail.value!)}
                  placeholder="Nombre del cumpleañero"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div>
                <IonLabel>Edad que cumplirá</IonLabel>
                <IonInput
                  value={birthdayAge}
                  onIonChange={e => setBirthdayAge(e.detail.value!)}
                  placeholder="Edad que cumplirá"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <IonButton onClick={handleGenerateInvitation} disabled={loading} className="w-full">
              {loading ? 'Generando...' : 'Generar Invitación'}
            </IonButton>
          </div>

          {responseText && (
           <div className="relative mt-4 border border-gray-300 rounded-md">
           {/* Fondo con opacidad */}
           <div className="absolute inset-0 bg-[url('/images/generado.png')]  bg-center bg-no-repeat opacity-60"></div>
           <div className="relative p-4">
             <IonText>{responseText}</IonText>
           </div>
         </div>
          )}
        </div>

        <div className="flex justify-center p-4">
             <IonButton className="w-full" onClick={handleShareInvitation}>
              Compartir invitación
            </IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default EventInvitationGenerator;