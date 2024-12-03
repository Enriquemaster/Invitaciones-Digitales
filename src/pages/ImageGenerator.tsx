import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonText, IonHeader, IonToolbar, IonTitle, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import ShimmerButton from "@/components/ui/shimmer-button";
import { useHistory } from 'react-router-dom'; // Importar useHistory
import storageCalendario from './storage/storageCalendario'; 
import confetti from "canvas-confetti";

// Define un tipo para los eventos
type EventData = {
  inviteeName: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  icon?: string; // Propiedad opcional icon
};


  
const EventInvitationGenerator: React.FC = () => {
  // Estados para los campos de entrada
  const [inviteeName, setInviteeName] = useState<string>(''); // Nombre del invitado
  const [eventDate, setEventDate] = useState<string>(''); // Fecha del evento
  const [eventTime, setEventTime] = useState<string>(''); // Hora del evento
  const [eventLocation, setEventLocation] = useState<string>(''); // Lugar del evento
  const [responseText, setResponseText] = useState<string>(''); // Respuesta de la API
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [eventType, setEventType] = useState<string>(''); // Tipo de evento
  const [birthdayName, setBirthdayName] = useState<string>(''); // Nombre del cumpleañero
  const [birthdayAge, setBirthdayAge] = useState<string>(''); // Edad que cumplirá el cumpleañero
  const [nameperson1, setNameperson1] = useState<string>(''); // Edad que cumplirá el cumpleañero
  const [nameperson2, setNameperson2] = useState<string>(''); // Edad que cumplirá el cumpleañero
  const [meetingSubject, setMeetingSubject] = useState<string>(''); // Asunto de la reunión
  const [meetingOrganizer, setMeetingOrganizer] = useState<string>(''); // Organizador de la reunión
  const [asunto, setAsunto] = useState<string>(''); // Asunto de la reunión
  const [organizador, setOrganizer] = useState<string>(''); // Organizador de la reunión
  
  
  const history = useHistory(); // Inicializar useHistory

  const handleShareInvitation = () => {
    history.push('/capturarInvitacion', { responseText, invitationData, eventType  }); 
   
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
  nameperson1,
  nameperson2,
  meetingSubject,
  meetingOrganizer,
  asunto,
  organizador,
  
};


const clearStorage = async () => {
  await storageCalendario.clear(); // Borra todo el almacenamiento
  console.log("Almacenamiento limpiado.");
};


let eventList: EventData[] = []; // Arreglo de eventos
 // Función para guardar en el almacenamiento
 const saveToStorage = async () => {
  const eventData: EventData = {
    inviteeName,
    eventDate,
    eventTime,
    eventType,
    
  };

 
 if (eventType === 'cumpleaños') {
  eventData.icon = '🎂'; 
}

if (eventType === 'boda') {
  eventData.icon = '👰';
}

if (eventType === 'fiesta') {
  eventData.icon = '🥳';
}

if (eventType === 'reunion') {
  eventData.icon = '🧑‍🤝‍🧑';
}



// Agregar el evento al arreglo
eventList.push(eventData);

   // Usar un identificador único para cada evento
   const timestamp = new Date().toISOString();
   await storageCalendario.set(`eventData-${timestamp}`, eventData);
  console.log('Datos guardados en almacenamiento:', eventData);
};


 // Función para mostrar todos los datos almacenados
const showAllFromStorage = async () => {
  const allKeys = await storageCalendario.keys();
  
  // Definir el tipo del objeto como un índice genérico
  const allData: { [key: string]: any } = {};

  for (const key of allKeys) {
    const value = await storageCalendario.get(key);
    allData[key] = value; // TypeScript ya no se quejará
  }

  console.log('Datos en el almacenamiento:', allData);
};

  const handleGenerateInvitation = async () => {
    if (!inviteeName || !eventDate || !eventTime || !eventLocation || !eventType || (eventType === 'cumpleaños' && (!birthdayName || !birthdayAge))) {
      setResponseText(`¡Hola, ${inviteeName}! 
      Tenemos el placer de invitarte a un evento único y especial que no querrás perderte. Este evento tendrá lugar el próximo ${eventDate} a las ${eventTime} horasen ${eventLocation}, un lugar especialmente preparado para esta ocasión tan memorable. 

      Nos encantaría contar con tu presencia, ya que tu compañía hará que este día sea aún más especial y significativo. Prepárate para disfrutar de una velada llena de momentos inolvidables, risas y una experiencia que quedará grabada en nuestros corazones.

      ¡Marca la fecha en tu calendario y ven a celebrar con nosotros! Te estaremos esperando con los brazos abiertos y mucha alegría. ¡No faltes!`);
       // Guarda los datos// Navegar y pasar el texto
       saveToStorage();
      return; // Verifica que todos los campos estén llenos
   
       
    }

    if (!inviteeName || !eventDate || !eventTime || !eventLocation || !eventType || (eventType === 'boda' && (!nameperson1 || !nameperson2))) {
      console.log(`nameperson1: ${nameperson1}, nameperson2: ${nameperson2}`);
      setResponseText(`¡Hola, ${inviteeName}!
      Nos complace invitarte a un evento muy especial: ¡una boda! El enlace de ${nameperson1} y ${nameperson2} se celebrará el próximo ${eventDate} a las ${eventTime} en ${eventLocation}.
      
      Será una ocasión única llena de amor, alegría y momentos inolvidables, y sería un honor contar con tu presencia en este día tan significativo para ellos. ¡Ven a ser parte de esta hermosa celebración de unión!
  
      Marca la fecha en tu calendario y acompáñanos para celebrar este día tan importante. Estamos ansiosos por compartir con ustedes este hermoso momento. ¡Te esperamos con los brazos abiertos!
      `);
      saveToStorage();
      return; // Verifica que todos los campos estén llenos
    }

    if (!inviteeName || !eventDate || !eventTime || !eventLocation || !eventType || (eventType === 'reunion' &&  (!meetingSubject || !meetingOrganizer))) {
      setResponseText(`¡Hola, ${inviteeName}!

      Nos complace invitarte a una reunión especial organizada por ${meetingOrganizer}. Este importante encuentro se llevará a cabo el próximo ${eventDate} a las ${eventTime} en ${eventLocation}. Durante esta reunión, abordaremos el tema: "${meetingSubject}", un asunto de gran relevancia y que contará con tu valiosa participación.
      
      Esperamos contar contigo para compartir ideas, colaborar y trabajar juntos hacia nuestros objetivos comunes. Tu asistencia marcará una diferencia significativa y enriquecerá esta conversación tan importante.
      
      Por favor, confirma tu asistencia a la brevedad. ¡Te esperamos con mucho entusiasmo!`);
      saveToStorage();
      return;
    }

    if (!inviteeName || !eventDate || !eventTime || !eventLocation || !eventType || (eventType === 'fiesta' &&  (!asunto || !organizador))) {
      setResponseText(`¡Hola, ${inviteeName}!
    
      Nos encantaría invitarte a una fiesta que organizo  ${organizador} para disfrutar de un momento especial lleno de alegría y diversión. La fiesta se llevará a cabo el próximo ${eventDate} a las ${eventTime} en ${eventLocation}, un lugar perfecto para esta ocasión.
      
      Habrá música, comida, y actividades emocionantes que estamos seguros de que disfrutarás. Tu presencia hará que esta celebración sea aún más memorable.
      
      ¡Ven y únete a nosotros para compartir momentos inolvidables! No olvides confirmar tu asistencia. ¡Te esperamos!`);
      saveToStorage();
      return;
    }


  };

  const handleConfetti = () => {
    const scalar = 2;
    const triangle = confetti.shapeFromPath({
      path: "M0 10 L5 0 L10 10z",
    });
    const square = confetti.shapeFromPath({
      path: "M0 0 L10 0 L10 10 L0 10 Z",
    });
    const coin = confetti.shapeFromPath({
      path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
    });
    const tree = confetti.shapeFromPath({
      path: "M5 0 L10 10 L0 10 Z",
    });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [triangle, square, coin, tree],
      scalar,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };



  const handleBothActions = () => {
   //  handleConfetti(); // Llama al método que maneja el confeti
    handleGenerateInvitation(); // Llama al método que maneja la generación de invitaciones
  };

   // Ejecutar al cargar la página
   useEffect(() => {
    showAllFromStorage(); // Llama a la función cuando el componente se monta
  }, []); 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Generador de Invitaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">Crea tu invitación</h1>
          
          <div className="space-y-4">
         
            <div className="grid grid-cols-2 gap-4">
              <div>
                <IonLabel>Nombre del invitado</IonLabel>
                <IonInput
                  value={inviteeName}
                  onIonChange={(e) => setInviteeName(e.detail.value!)}
                  placeholder="Nombre del invitado"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div>
                <IonLabel>Fecha del evento</IonLabel>
                <IonInput
                 type="date" // Tipo date para seleccionar la fecha
                  value={eventDate}
                  onIonChange={(e) => setEventDate(e.detail.value!)}
                  placeholder="Fecha del evento"
                  className="border border-gray-300 p-2 rounded-md"
                  />
              </div>
              <div>
                <IonLabel>Hora del evento</IonLabel>
                <IonInput
                  type="time" // Tipo time para seleccionar la hora
                  value={eventTime}
                  onIonChange={(e) => setEventTime(e.detail.value!)}
                  placeholder="Hora del evento"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div>
                <IonLabel>Lugar del evento</IonLabel>
                <IonInput
                  value={eventLocation}
                  onIonChange={(e) => setEventLocation(e.detail.value!)}
                  placeholder="Lugar del evento"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <IonLabel className="font-semibold text-lg">Tipo de evento</IonLabel>
            <div className="space-y-4">
  <label htmlFor="eventType" className="font-semibold text-lg">
    Tipo de evento
  </label>
  <select
    id="eventType"
    value={eventType}
    onChange={(e) => setEventType(e.target.value)}
    className="w-full border border-gray-300 p-2 rounded-md"
  >
    <option value="" disabled>
      Selecciona el tipo de evento
    </option>
    <option value="cumpleaños">Cumpleaños</option>
    <option value="boda">Boda</option>
    <option value="fiesta">Fiesta</option>
    <option value="reunion">Reunión</option>
  </select>
</div>

          </div>

          {eventType === 'cumpleaños' && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">Detalles del cumpleaños</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <IonLabel>Nombre del cumpleañero</IonLabel>
                  <IonInput
                    value={birthdayName}
                    onIonChange={(e) => setBirthdayName(e.detail.value!)}
                    placeholder="Nombre del cumpleañero"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div>
                  <IonLabel>Edad que cumplirá</IonLabel>
                  <IonInput
                    value={birthdayAge}
                    onIonChange={(e) => setBirthdayAge(e.detail.value!)}
                    placeholder="Edad que cumplirá"
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}

        {eventType === 'boda' && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <IonLabel>Nombre del Esposo</IonLabel>
                <IonInput
                  value={nameperson1}
                  onIonChange={e => setNameperson1(e.detail.value!)}
                  placeholder="nombre del Esposo"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div>
                <IonLabel>Nombre de la Esposa</IonLabel>
                <IonInput
                  value={nameperson2}
                  onIonChange={e => setNameperson2(e.detail.value!)}
                  placeholder="Nombre de la esposa"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
          )}
 {eventType === 'reunion' && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <IonLabel>Asunto</IonLabel>
                <IonInput
                  value={meetingSubject}
                  onIonChange={(e) => setMeetingSubject(e.detail.value!)}
                  placeholder="Asunto de la reunión"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div>
                <IonLabel>Organizador</IonLabel>
                <IonInput
                  value={meetingOrganizer}
                  onIonChange={(e) => setMeetingOrganizer(e.detail.value!)}
                  placeholder="Organizador de la reunión"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
          )}

{eventType === 'fiesta' && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <IonLabel>Asunto</IonLabel>
                <IonInput
                  value={asunto}
                  onIonChange={(e) => setAsunto(e.detail.value!)}
                  placeholder="Asunto de la reunión"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div>
                <IonLabel>Organizador</IonLabel>
                <IonInput
                  value={organizador}
                  onIonChange={(e) => setOrganizer(e.detail.value!)}
                  placeholder="Organizador de la reunión"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
          )}




          <div className="flex justify-center mt-6">
            <ShimmerButton onClick={handleBothActions} disabled={loading} className="w-full">
              {loading ? 'Generando...' : 'Generar Invitación'}
            </ShimmerButton>
          </div>

          {responseText && (
           <div className="relative mt-4 border border-gray-300 rounded-md">
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