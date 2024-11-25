import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFabList,
  IonFabButton,
  IonFab,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { add, calendarOutline, createOutline } from "ionicons/icons";
import "./Tab1.css";
import PulsatingButton from "@/components/ui/pulsating-button";

export function PulsatingButtonDemo() {
  return <PulsatingButton>Diego</PulsatingButton>;
}




const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>EvoParty</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Sección de bienvenida */}
        <div className="welcome-section">
          <h1>¡Bienvenido a EvoParty!</h1>
          <p>
            Diseña invitaciones increíbles, organiza tus eventos y sorprende a
            tus invitados.
          </p>


      
          
          <div className="social-icons">
            <img src="/iconos/facebook.png" alt="Facebook" />
            <img src="/iconos/gmail.png" alt="Gmail" />
          </div>
        </div>

        {/* Sección de funcionalidades */}
        <div className="features-section">
          <h2>Descubre nuestras funcionalidades</h2>
          <div className="card-container">
            {/* Tarjeta: Diseños personalizados */}
            <IonCard className="feature-card">
              <img
                src="/iconos/diseno.png"
                alt="Diseños personalizados"
                className="card-icon"
              />
              <IonCardHeader>
                <IonCardTitle>Diseños personalizados</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Escoge entre una variedad de plantillas para crear invitaciones
                únicas que impresionen.
              </IonCardContent>
            </IonCard>

            {/* Tarjeta: Calendario */}
            <IonCard className="feature-card">
              <img
                src="/iconos/calendario.jpg"
                alt="Calendario"
                className="card-icon"
              />
              <IonCardHeader>
                <IonCardTitle>Calendario</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Organiza y planifica tus eventos con nuestro calendario
                integrado.
              </IonCardContent>
            </IonCard>
          </div>
        </div>

        {/* Botón flotante con opciones */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="primary">
            <IonIcon icon={add} />
          </IonFabButton>

          <IonFabList side="top">
            <IonFabButton color="secondary" routerLink="/ImageGenerator">
              <IonIcon icon={calendarOutline} />
            </IonFabButton>
            <IonFabButton color="tertiary" routerLink="/ImageGenerator">
              <IonIcon icon={createOutline} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;