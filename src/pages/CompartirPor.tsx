import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Share } from '@capacitor/share';

interface LocationState {
  imageUrl: string;
}

const RutaInvitacion: React.FC = () => {
  const location = useLocation<LocationState>();
  const { imageUrl } = location.state || {}; // Puede ser undefined si no se pasa estado
 

  // Función para compartir la imagen
  const shareViaGmail = async () => {
    if (!imageUrl) {
      alert("No hay una imagen para compartir.");
      return;
    }

    try {
      await Share.share({
        title: 'Invitación',
        text: 'Te comparto esta invitación especial.',
        url: imageUrl,
        dialogTitle: 'Enviar invitación mediante Gmail',
      });
    } catch (error) {
      console.error('Error al compartir la invitación:', error);
    }
  };
 
  // Si la imagen no está presente, puedes redirigir al usuario a otra página o mostrar un mensaje.
  useEffect(() => {
    if (!imageUrl) {
      console.error("No se ha recibido la URL de la imagen.");
    }
  }, [imageUrl]);
  
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
          <button onClick={shareViaGmail}>
            <img src="/iconos/gmail.png" alt="Gmail" className="rounded-lg mx-auto w-16 h-16" />
          </button>
          <p className="mt-2 text-sm font-medium text-center">Gmail</p>
        </div>
      </div>
    </div>
  );
};

export default RutaInvitacion;
