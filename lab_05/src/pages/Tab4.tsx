import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Kalkulator from '../components/Kalkulator';
import './Tab4.css';

const Tab4: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kalkulator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Kalkulator />
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
