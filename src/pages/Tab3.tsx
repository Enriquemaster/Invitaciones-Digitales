import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import storage from './storage/storage'; // Asegúrate de importar el almacenamiento configurado

const Tab3: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // Guardar las URLs o base64 de las imágenes
  const [showModal, setShowModal] = useState<boolean>(false); // Controlar la visibilidad del modal principal
  const [showShareModal, setShowShareModal] = useState<boolean>(false); // Controlar la visibilidad del modal de compartir
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Imagen seleccionada para ver o compartir

  // Al cargar la página, obtenemos las imágenes almacenadas
  useEffect(() => {
    const loadImages = async () => {
      const storedImages = (await storage.get('invitations')) || [];
      setImages(storedImages); // Establece las imágenes guardadas en el estado
    };

    loadImages();
  }, []);

  // Función para eliminar una imagen
  const deleteImage = async (imageUrl: string) => {
    const updatedImages = images.filter(image => image !== imageUrl);
    await storage.set('invitations', updatedImages); // Actualizar el almacenamiento
    setImages(updatedImages); // Actualizar el estado
    setShowModal(false); // Cerrar el modal principal
  };

  // Función para abrir el modal de compartir
  const openShareModal = () => {
    setShowShareModal(true); // Mostrar el modal de compartir
  };

  // Función para compartir la imagen por WhatsApp
  const shareViaWhatsApp = (imageUrl: string) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(imageUrl)}`;
    window.open(whatsappUrl, '_blank'); // Abrir WhatsApp en una nueva pestaña
    setShowShareModal(false); // Cerrar el modal de compartir
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Mostrar las imágenes almacenadas */}
        <div className="p-6">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="flex justify-center"
                  onClick={() => {
                    setSelectedImage(imageUrl); // Establecer la imagen seleccionada
                    setShowModal(true); // Mostrar el modal principal
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Imagen ${index}`}
                    className="max-w-full rounded-lg shadow-lg cursor-pointer"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No hay imágenes guardadas.</p>
          )}
        </div>

        {/* Modal principal de imagen en grande */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent>
            <div className="flex flex-col justify-center items-center h-full bg-black">
              {selectedImage && (
                <>
                  {/* Imagen seleccionada */}
                  <img
                    src={selectedImage}
                    alt="Imagen seleccionada"
                    className="max-h-[70vh] max-w-[90vw] rounded-lg shadow-lg mb-4"
                  />
                  {/* Botones debajo de la imagen */}
                  <div className="flex justify-center space-x-4">
                    <IonButton color="danger" onClick={() => deleteImage(selectedImage!)}>
                      Eliminar
                    </IonButton>
                    <IonButton color="primary" onClick={openShareModal}>
                      Compartir
                    </IonButton>
                    <IonButton onClick={() => setShowModal(false)}>Cancelar</IonButton>
                  </div>
                </>
              )}
            </div>
          </IonContent>
        </IonModal>

        {/* Modal para compartir */}
        <IonModal
          isOpen={showShareModal}
          onDidDismiss={() => setShowShareModal(false)}
          swipeToClose={true}
          cssClass="ion-modal-share"
        >
          <IonContent>
            <div className="flex flex-col justify-center items-center h-1/3 bg-white rounded-t-3xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Compartir Imagen</h2>
              <div className="flex justify-center space-x-4">
                <IonButton color="success" onClick={() => shareViaWhatsApp(selectedImage!)}>
                  Compartir por WhatsApp
                </IonButton>
                <IonButton onClick={() => setShowShareModal(false)}>Cancelar</IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
