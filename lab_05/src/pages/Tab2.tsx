import { useState } from 'react';
import { IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';

const czyPierwsza = (n: number): boolean => {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

const kolejnePierwsze = (od: number, ile: number): number[] => {
  const wynik: number[] = [];
  let liczba = od;
  while (wynik.length < ile) {
    if (czyPierwsza(liczba)) {
      wynik.push(liczba);
    }
    liczba++;
  }
  return wynik;
};

const Tab2: React.FC = () => {
  const [liczby, setLiczby] = useState<number[]>(kolejnePierwsze(2, 30));
  const [present] = useIonToast();

  const dodaj = () => {
    const ostatnia = liczby[liczby.length - 1];
    const nowe = kolejnePierwsze(ostatnia + 1, 20);
    setLiczby([...liczby, ...nowe]);
    present({ message: `Załadowano liczby do ${nowe[nowe.length - 1]}`, duration: 1500, position: 'top' });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liczby pierwsze</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {liczby.map((liczba, i) => (
            <IonItem key={liczba}>
              <IonLabel>{i + 1}. {liczba}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonInfiniteScroll onIonInfinite={(ev) => {
          dodaj();
          ev.target.complete();
        }}>
          <IonInfiniteScrollContent loadingText="Liczę kolejne liczby..." />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
