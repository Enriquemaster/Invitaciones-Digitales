import React, { useState, useEffect } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButton, 
  IonFooter
} from '@ionic/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import storageCalendario from './storage/storageCalendario'; 

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  title1: string;
  start: Date;
  end: Date;
  type?: string;
  details?: string;
  icon?: string; // Asegúrate de que el evento tenga un campo icon
}

const EventsCalendarView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Cargar todos los eventos almacenados desde `storageCalendario` al montar el componente
    const loadEvents = async () => {
      const keys = await storageCalendario.keys();
      const loadedEvents: Event[] = [];

      for (const key of keys) {
        const storedEvent = await storageCalendario.get(key);
        if (storedEvent && storedEvent.eventType && storedEvent.eventDate && storedEvent.eventTime) {
          const start = new Date(`${storedEvent.eventDate}T${storedEvent.eventTime}`);
          const end = new Date(start);
          end.setHours(end.getHours() + 1);

          loadedEvents.push({
            title:  storedEvent.icon, 
            title1: `Programaste un evento de: ${storedEvent.eventType}`,
            start,
            end,
            type: storedEvent.eventType,
            details: `Evento programado para el ${storedEvent.eventDate} a las ${storedEvent.eventTime}.`,
            icon: storedEvent.icon, // Cargar el icono
          });
        }
      }

      // Evitar duplicados y actualizar el estado con los eventos cargados
      setEvents(loadedEvents);
    };

    loadEvents();
  }, []); // Este `useEffect` solo se ejecutará una vez, cuando el componente se monte

  const deleteEvent = async (eventToDelete: Event) => {
    // Eliminar el evento del estado
    setEvents((prevEvents) => prevEvents.filter((event) => event !== eventToDelete));

    // Eliminar el evento correspondiente del almacenamiento
    const keys = await storageCalendario.keys();
    for (const key of keys) {
      const storedEvent = await storageCalendario.get(key);

      // Verificar si el evento almacenado coincide con el evento a eliminar
      if (
        storedEvent &&
        storedEvent.eventType === eventToDelete.type &&
        new Date(`${storedEvent.eventDate}T${storedEvent.eventTime}`).getTime() === eventToDelete.start.getTime()
      ) {
        await storageCalendario.remove(key); // Eliminar el evento de storage
        console.log(`Evento con clave ${key} eliminado.`);
        break; // Detenerse después de encontrar y eliminar el evento
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-center'>Tus Eventos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ height: '500px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: '20px' }}
            views={['month', 'week', 'day']}
          />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Eventos programados</h2>
          {events.length === 0 ? (
            <p>No hay eventos programados.</p>
          ) : (
            events.map((event, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{event.title1}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {event.details}
                  <IonButton 
                    color="danger" 
                    onClick={() => deleteEvent(event)} 
                    style={{ marginTop: '10px' }}
                  >
                    Eliminar Evento
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </div>

        



      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonTitle className="text-center">© 2024 EvoParty</IonTitle>
        </IonToolbar>
      </IonFooter>
      
    </IonPage>
  );
};

export default EventsCalendarView;
