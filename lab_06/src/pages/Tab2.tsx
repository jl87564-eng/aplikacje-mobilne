import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PersonItem from '../components/PersonItem';
import { usePeopleStore } from '../store/peopleStore';

const Tab2: React.FC = () => {
  const people = usePeopleStore((s) => s.people);
  const following = people.filter((p) => p.following);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Obserwowani</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {following.length === 0 && <p className="ion-padding">Nikogo nie obserwujesz.</p>}
        <IonList>
          {following.map((person) => (
            <PersonItem key={person.id} person={person} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
