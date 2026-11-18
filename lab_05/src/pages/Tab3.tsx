import { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  const slideChange = (s: SwiperType) => {
    setDisablePrev(s.isBeginning);
    setDisableNext(s.isEnd);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokaz slajdów</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Swiper className="slajdy" initialSlide={0} speed={300} onSwiper={setSwiper} onSlideChange={slideChange}>   
          <SwiperSlide><img src="/img/las.png" alt="Las" style={{ width: '100%', height: '180px', objectFit: 'contain' }} /><p>Las</p></SwiperSlide>
          <SwiperSlide><img src="/img/rzeka.png" alt="Rzeka" style={{ width: '100%', height: '180px', objectFit: 'contain' }} /><p>Rzeka</p></SwiperSlide>
          <SwiperSlide><img src="/img/gory.png" alt="Góry" style={{ width: '100%', height: '180px', objectFit: 'contain' }} /><p>Góry</p></SwiperSlide>
          <SwiperSlide><img src="/img/morze.png" alt="Morze" style={{ width: '100%', height: '180px', objectFit: 'contain' }} /><p>Morze</p></SwiperSlide>
        </Swiper>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="block" disabled={disablePrev} onClick={() => swiper?.slidePrev()}>PREV</IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" disabled={disableNext} onClick={() => swiper?.slideNext()}>NEXT</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
