import { useLocation } from 'react-router-dom';
import { Browser } from '@capacitor/browser';
import React, { useState, useRef } from 'react';
import storage from './storage/storage'; // Importa tu configuración de storage
import { IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent,IonPage, IonFooter } from '@ionic/react';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import confetti from "canvas-confetti";


interface LocationState {
  imageUrl: string;
  responseText: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
}

const RutaInvitacion: React.FC = () => {
  const location = useLocation<LocationState>();
  const { imageUrl, responseText, eventType } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  

   

  const openWhatsApp = async () => {
    try {
      // Verifica si tienes la URL de la imagen de Cloudinary
      const message = `¡Hola! Te invito a un evento de tipo "${eventType}". ${responseText || ''}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      await Browser.open({ url: whatsappUrl });
    } catch (error) {
      console.error("Error al abrir WhatsApp:", error);
    }
  };
  const saveImage2 = async () => {
    if (imageUrl) {
      console.log('Imagen a subir:', imageUrl);
      try {
        const formData = new FormData();
        
        if (imageUrl.startsWith('data:image/')) {
          formData.append('file', imageUrl); // Base64
        } else {
          formData.append('file', imageUrl); // Archivo
        }
  
        
        formData.append('upload_preset', cloudinaryConfig.upload_preset);
  
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/upload`, {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (data.secure_url) {
          const cloudinaryImageUrl = data.secure_url; 
          console.log('Imagen subida correctamente en Cloudinary:', cloudinaryImageUrl);
  
          // Guardar la URL pública en el almacenamiento local
          const storedImages = (await storage.get('invitations')) || [];
          const updatedImages = [...storedImages, cloudinaryImageUrl];
          await storage.set('invitations', updatedImages);
  
          setIsSaved(true);
          setShowModal(false);
        } else {
          console.log('No se pudo obtener la URL de la imagen de Cloudinary:', data);
        }
      } catch (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
      }
    } else {
      console.log('No se ha proporcionado una imagen válida.');
    }
  };
  




  const openGmailDirectly = async () => {
    try {
      const subject = eventType || "Invitación";
      const body = responseText || "Contenido no disponible";
      const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      await Browser.open({ url: gmailUrl });
    } catch (error) {
      console.error("Error al abrir Gmail:", error);
    }
  };


  const handleClick = () => {
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

  
  

  return (
    <IonPage > 
      <IonHeader className='flex justify-center items-center'>
        <IonToolbar className=' flex justify-center items-center'>
          <IonTitle className='flex justify-center items-center'>Compartir Invitación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >

    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Tu Invitación</h1>

 
    
     

      {imageUrl ? (
        <div className="flex justify-center">
          <img src={imageUrl} alt="Invitación Capturada" className="max-w-full rounded-lg shadow-lg" />
        </div>
      ) : (
        <p>No se encontró la imagen capturada. Por favor, regresa a la página anterior.</p>
      )}

      {imageUrl && (
        <div className="flex justify-center mt-4">
          <IonButton onClick={() => setShowModal(true)} color="primary">
            Guardar Imagen
          </IonButton>
        </div>
      )}

<h1 className="flex flex-col items-center justify-center mt-2 font-bold ">Compartir por:</h1>
<div className="flex flex-col items-center justify-center mt-8">
  <div className="grid grid-cols-2 gap-2">
    <div className="flex flex-col items-center px-4">
      <button onClick={openWhatsApp}>
        <img
          src="/iconos/whatsapp.png"
          alt="WhatsApp"
          className="rounded-lg mx-auto w-16 h-16 "
        />
      </button>
      <p className="mt-2 text-sm font-medium text-center">WhatsApp</p>
    </div>
    <div className="flex flex-col items-center">
      <button onClick={openGmailDirectly}>
        <img
          src="/iconos/gmail.png"
          alt="Gmail"
          className="rounded-lg mx-auto w-16 h-16"
        />
      </button>
      <p className="mt-2 text-sm font-medium text-center">Gmail</p>
    </div>
  </div>
</div>


      <IonModal isOpen={showModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Guardar Imagen</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="p-4">
            <p>¿Deseas guardar esta imagen en tus invitaciones?</p>
            <div className="flex justify-around mt-4">
              <IonButton onClick={saveImage2} color="success">
                Guardar
              </IonButton>
              <IonButton onClick={() => setShowModal(false)} color="danger">
                Cancelar
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
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

export default RutaInvitacion;

