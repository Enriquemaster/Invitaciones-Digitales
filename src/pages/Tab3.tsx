import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonModal,
  IonImg,
  IonIcon,
  IonFooter,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { Browser } from '@capacitor/browser';
import storage from './storage/storage';
import { close } from 'ionicons/icons';

const Tab3: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tus Invitaciones Guardadas</IonTitle>
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
                    className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
                    onClick={() => openModal(imageUrl)} // Abrir modal al hacer clic
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

        {/* Modal para ver imagen en grande */}
        <IonModal isOpen={showModal} onDidDismiss={closeModal}>
          <div className="flex justify-center items-center h-full bg-black bg-opacity-75">
            {selectedImage && (
              <div className="relative">
                <IonImg src={selectedImage} alt="Imagen grande" className="max-w-full max-h-full" />
                <IonButton
                  color="danger"
                  size="small"
                  onClick={closeModal}
                  className="absolute top-4 right-4"
                >
                  <IonIcon icon={close} />
                </IonButton>
              </div>
            )}
          </div>
        </IonModal>

       


      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle className="text-center">© 2024 EvoParty</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Tab3;
