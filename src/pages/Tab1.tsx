import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonFabList,IonFabButton, IonFab, IonButton, IonIcon, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { addCircleOutline, calendarOutline } from 'ionicons/icons';
import './Tab1.css';
import { add, createOutline  } from 'ionicons/icons';


const Tab1: React.FC = () => {
  return (
    <IonPage>
      
      <IonContent fullscreen>
  
  {/* Botón flotante con opciones */}
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
          {/* Botón principal */}
          
          <IonFabButton color="primary">
            <IonIcon icon={add} />
          </IonFabButton>

          {/* Opciones del menú */}
          <IonFabList side="top">
            <IonFabButton color="secondary" routerLink="/Calendario">
              <IonIcon icon={calendarOutline} />
            </IonFabButton>
            <IonFabButton color="tertiary" routerLink="/Crear-evento">
              <IonIcon icon={createOutline} />

            </IonFabButton>
          </IonFabList>
        </IonFab>

      
      </IonContent>
    </IonPage>
  );
};


export default Tab1;
