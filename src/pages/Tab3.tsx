import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonModal, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useState, useEffect } from 'react';
import storage from './storage/storage';  // Asegúrate de importar el almacenamiento configurado

const Tab3: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);  // Guardar las URLs o base64 de las imágenes
  const [showModal, setShowModal] = useState<boolean>(false); // Controlar la visibilidad del modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Imagen seleccionada para borrar o compartir

  // Al cargar la página, obtenemos las imágenes almacenadas
  useEffect(() => {
    const loadImages = async () => {
      const storedImages = (await storage.get('invitations')) || [];
      setImages(storedImages);  // Establece las imágenes guardadas en el estado
    };

    loadImages();
  }, []);

  // Función para eliminar una imagen
  const deleteImage = async (imageUrl: string) => {
    const updatedImages = images.filter(image => image !== imageUrl);
    await storage.set('invitations', updatedImages);  // Actualizar el almacenamiento
    setImages(updatedImages);  // Actualizar el estado
    setShowModal(false); // Cerrar el modal
  };

  // Función para compartir la imagen (puedes agregar la lógica de compartir aquí)
  const shareImage = (imageUrl: string) => {
    console.log(`Compartiendo la imagen: ${imageUrl}`);
    // Aquí puedes agregar la lógica de compartir la imagen a través de WhatsApp, Gmail, etc.
    setShowModal(false); // Cerrar el modal
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
                <div key={index} className="flex justify-center" onClick={() => {
                  setSelectedImage(imageUrl);  // Establecer la imagen seleccionada
                  setShowModal(true);  // Mostrar el modal
                }}>
                  <img src={imageUrl} alt={`Imagen ${index}`} className="max-w-full rounded-lg shadow-lg cursor-pointer" />
                </div>
              ))}
            </div>
          ) : (
            <p>No hay imágenes guardadas.</p>
          )}
        </div>

        {/* Modal de opciones: Borrar o Compartir */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Opciones</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonItem>
              <IonLabel>Borrar o Compartir esta imagen?</IonLabel>
            </IonItem>
            <div className="p-4 flex justify-around">
              <IonButton color="danger" onClick={() => deleteImage(selectedImage!)}>Borrar</IonButton>
              <IonButton color="primary" onClick={() => shareImage(selectedImage!)}>Compartir</IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
