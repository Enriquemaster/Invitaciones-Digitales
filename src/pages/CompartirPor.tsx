import React from 'react';
import { useLocation } from 'react-router-dom';
import { Browser } from '@capacitor/browser';

interface LocationState {
  imageUrl: string;
  responseText: string;
}

const RutaInvitacion: React.FC = () => {
  const location = useLocation<LocationState>();
  const { imageUrl } = location.state || {}; 
  const { responseText } = location.state || {}; // Acceder al responseText desde el estado


  const openGmailDirectly = async () => {
    try {
      // Definir el asunto
      const subject = "Cumpleaños"; 
  
      // Usar el responseText como el cuerpo del mensaje
      const body = responseText || "Contenido no disponible"; // Asegúrate de manejar el caso en que no haya texto
  
      // Construir la URL con Gmail para abrir el formulario de redacción de correo
      const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      // Abrir Gmail en el navegador con el asunto y cuerpo predefinidos
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

      {/* Botones para compartir */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <div>
          <img src="/iconos/whatsapp.png" alt="WhatsApp" className="rounded-lg mx-auto w-16 h-16" />
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
