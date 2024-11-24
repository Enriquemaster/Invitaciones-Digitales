import { useLocation, useHistory  } from 'react-router-dom';
import { Browser } from '@capacitor/browser';
import storage from './storage/storage'; 
import { useState, useEffect } from 'react';
import { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

interface LocationState {
  imageUrl: string;
  responseText: string;
  eventType: string;
}

const RutaInvitacion: React.FC = () => {
  const location = useLocation<LocationState>();
  const { imageUrl } = location.state || {}; 
  const { responseText  } = location.state || {}; 
  const { eventType  } = location.state || {}; 

  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);


  const openWhatsApp = async () => {
    try {
      const message = `¡Hola! Te invito a un evento de tipo "${eventType}". ${responseText || ''}`;

      if (imageUrl) {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}%0A${encodeURIComponent(imageUrl)}`;
        await Browser.open({ url: whatsappUrl });
      } else {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        await Browser.open({ url: whatsappUrl });
      }
    } catch (error) {
      console.error("Error al abrir WhatsApp en el navegador:", error);
    }
  };


  const saveImage = async () => {
    if (imageUrl && !isSaved) {
      const images = (await storage.get('invitations')) || [];
      if (!images.includes(imageUrl)) {
        images.push(imageUrl);
        await storage.set('invitations', images);
        setIsSaved(true); // Marca como guardada
        console.log('Imagen guardada correctamente.');
      }
    }
  };






  const openGmailDirectly = async () => {
    try {
      const subject = eventType || "Invitación"; 
      const body = responseText || "Contenido no disponible";
  

      const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  
      await Browser.open({ url: gmailUrl });
    } catch (error) {
      console.error("Error al abrir Gmail en el navegador:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Invitación Capturada</h1>

      {/* Mostrar la imagen capturada si existe */}
      {imageUrl ? (
        <div className="flex justify-center">
          <img src={imageUrl} alt="Invitación Capturada" className="max-w-full rounded-lg shadow-lg" />
        </div>
      ) : (
        <p>No se encontró la imagen capturada. Por favor, regresa a la página anterior.</p>
      )}


      {imageUrl ? (
      <div className="flex justify-center">
          <IonButton onClick={() => setShowModal(true)} color="primary">
          Guardar Imagen
        </IonButton>
          </div>
          ) : (
            <p>No se encontró la imagen capturada. Por favor, regresa a la página anterior.</p>
            )}

      {/* Botones para compartir */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <div>
          <button onClick={openWhatsApp}>
            <img src="/iconos/whatsapp.png" alt="WhatsApp" className="rounded-lg mx-auto w-16 h-16" />
          </button>
          <p className="mt-2 text-sm font-medium text-center">WhatsApp</p>
        </div>
        <div>
          <img src="/iconos/facebook.png" alt="Facebook" className="rounded-lg w-16 h-16 mx-auto" />
          <p className="mt-2 text-sm font-medium text-center">Facebook</p>
        </div>
        <div>
          <img src="/iconos/mensajes.png" alt="Mensajes" className="rounded-lg w-16 h-16 mx-auto" />
          <p className="mt-2 text-sm font-medium text-center">Mensajes</p>
        </div>
        <div>
          <button onClick={openGmailDirectly}>
            <img src="/iconos/gmail.png" alt="Gmail" className="rounded-lg mx-auto w-16 h-16" />
          </button>
          <p className="mt-2 text-sm font-medium text-center">Abrir Gmail</p>
        </div>
      </div>
    </div>
  );
};

export default RutaInvitacion;
