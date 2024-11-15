import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
     

       {/* Card Principal - Pasos */}
       <div className="bg-blue rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                </div>
                <h2 className="text-5xl font-bold text-gray-800 mb-2">
                 hola
                </h2>
                <p className="text-gray-500 text-lg">
                  Pasos Totales
                </p>
              </div>
            </div>



      </IonContent>
    </IonPage>
  );
};

export default Tab1;
