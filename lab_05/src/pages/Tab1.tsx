import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';

type Item = {
  src: string;
  text: string;
};

const items: Item[] = [
  { src: '/img/las.png', text: 'Las' },
  { src: '/img/rzeka.png', text: 'Rzeka' },
  { src: '/img/miasto.png', text: 'Miasto' },
  { src: '/img/gory.png', text: 'Góry' },
  { src: '/img/morze.png', text: 'Morze' }
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Obrazki</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {items.map((image) => (
            <IonItem key={image.src}>
              <IonThumbnail slot="start">
                <img src={image.src} alt={image.text} loading="lazy" />
              </IonThumbnail>
              <IonLabel>{image.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
