import React from 'react';
import { useLocation } from 'react-router-dom';

// Definimos un tipo para el estado que contiene la URL de la imagen
interface LocationState {
  imageUrl: string;
}

const RutaInvitacion: React.FC = () => {
  // Usamos `useLocation` con la tipificación adecuada
  const location = useLocation<LocationState>();

  // Desestructuramos la `imageUrl` del estado
  const { imageUrl } = location.state || {};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Invitación Capturada</h1>
      {imageUrl ? (
        <div className="flex justify-center">
          <img src={imageUrl} alt="Invitación Capturada" className="max-w-full rounded-lg shadow-lg" />
        </div>
      ) : (
        <p>No se encontró la imagen capturada.</p>
      )}
    </div>
  );
};

export default RutaInvitacion;
