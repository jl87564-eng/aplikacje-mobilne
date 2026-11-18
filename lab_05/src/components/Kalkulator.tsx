import { IonAlert, IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import { useState } from 'react';

const Kalkulator: React.FC = () => {
  const [wyswietlacz, setWyswietlacz] = useState<string>('0');
  const [poprzednia, setPoprzednia] = useState<number | null>(null);
  const [dzialanie, setDzialanie] = useState<string | null>(null);
  const [pokazAlert, setPokazAlert] = useState(false);

  const wpisz = (wartosc: string) => {
    if (wartosc === '.') {
      if (!wyswietlacz.includes('.')) {
        setWyswietlacz(wyswietlacz + '.');
      }
      return;
    }
    if (wyswietlacz === '0') {
      setWyswietlacz(wartosc);
    } else {
      setWyswietlacz(wyswietlacz + wartosc);
    }
  };

  const wybierzDzialanie = (znak: string) => {
    setPoprzednia(Number(wyswietlacz));
    setDzialanie(znak);
    setWyswietlacz('0');
  };

  const wyczysc = () => {
    setWyswietlacz('0');
    setPoprzednia(null);
    setDzialanie(null);
  };

  const oblicz = () => {
    if (poprzednia === null || dzialanie === null) {
      return;
    }
    const druga = Number(wyswietlacz);
    let wynik = 0;
    if (dzialanie === '+') {
      wynik = poprzednia + druga;
    } else if (dzialanie === '−') {
      wynik = poprzednia - druga;
    } else if (dzialanie === '×') {
      wynik = poprzednia * druga;
    } else if (dzialanie === '÷') {
      if (druga === 0) {
        wyczysc();
        setPokazAlert(true);
        return;
      }
      wynik = poprzednia / druga;
    }
    setWyswietlacz(String(parseFloat(wynik.toFixed(10))));
    setPoprzednia(null);
    setDzialanie(null);
  };

  return (
    <IonCard>
      <IonCardContent>
        <h1 className="kalkulator-wynik">{wyswietlacz}</h1>
        <IonGrid>
          <IonRow>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('7')}>7</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('8')}>8</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('9')}>9</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wybierzDzialanie('÷')}>÷</IonButton></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('4')}>4</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('5')}>5</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('6')}>6</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wybierzDzialanie('×')}>×</IonButton></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('1')}>1</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('2')}>2</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('3')}>3</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wybierzDzialanie('−')}>−</IonButton></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="3"><IonButton expand="block" onClick={wyczysc}>C</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('0')}>0</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wpisz('.')}>.</IonButton></IonCol>
            <IonCol size="3"><IonButton expand="block" onClick={() => wybierzDzialanie('+')}>+</IonButton></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12"><IonButton expand="block" onClick={oblicz}>=</IonButton></IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert isOpen={pokazAlert} header="Błąd" message="Nie można dzielić przez zero" buttons={['OK']} onDidDismiss={() => setPokazAlert(false)} />
      </IonCardContent>
    </IonCard>
  );
};

export default Kalkulator;
