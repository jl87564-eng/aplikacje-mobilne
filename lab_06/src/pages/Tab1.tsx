import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, type RefresherCustomEvent } from '@ionic/react';
import PersonItem from '../components/PersonItem';
import { usePeopleStore } from '../store/peopleStore';

const Tab1: React.FC = () => {
  const people = usePeopleStore((s) => s.people);
  const addPerson = usePeopleStore((s) => s.addPerson);

  const odswiez = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      const id = Math.max(...people.map((p) => p.id)) + 1;
      addPerson({ id, name: 'Nowa', surname: `Osoba ${id}`, avatar: `https://i.pravatar.cc/150?img=${id + 20}`, following: false });
      event.detail.complete();
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ludzie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={odswiez}>
          <IonRefresherContent />
        </IonRefresher>
        <IonList>
          {people.map((person) => (
            <PersonItem key={person.id} person={person} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
