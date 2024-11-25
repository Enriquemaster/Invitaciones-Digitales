import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { Browser } from '@capacitor/browser';
import storage from './storage/storage';

const Tab3: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  // Cargar imágenes desde el almacenamiento al iniciar el componente
  useEffect(() => {
    const loadImages = async () => {
      const storedImages = (await storage.get('invitations')) || [];
      setImages(storedImages);
    };
    loadImages();
  }, []);

  const deleteImage = async (imageUrl: string) => {
    const updatedImages = images.filter((image) => image !== imageUrl);
    await storage.set('invitations', updatedImages);
    setImages(updatedImages);
  };

  const shareImage = async (imageUrl: string) => {
    try {
      const message = `¡Mira esta invitación! 🌟\n\n${imageUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      await Browser.open({ url: whatsappUrl });
    } catch (error) {
      console.error('Error al compartir la imagen por WhatsApp:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Invitaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="p-4">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {images.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Imagen ${index}`}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="flex justify-between mt-2">
                    <IonButton
                      color="danger"
                      size="small"
                      onClick={() => deleteImage(imageUrl)}
                    >
                      Eliminar
                    </IonButton>
                    <IonButton
                      color="success"
                      size="small"
                      onClick={() => shareImage(imageUrl)}
                    >
                      Compartir
                    </IonButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No tienes imágenes guardadas.</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
