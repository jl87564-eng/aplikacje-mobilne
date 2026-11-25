import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Navigate, Route } from 'react-router-dom';
import { create, heart, people } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import PersonDetail from './pages/PersonDetail';

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="tab1" element={<Tab1 />} />
      <Route path="tab1/:id" element={<PersonDetail />} />
      <Route path="tab2" element={<Tab2 />} />
      <Route path="tab3" element={<Tab3 />} />
      <Route index element={<Navigate to="tab1" replace />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/tab1">
        <IonIcon aria-hidden="true" icon={people} />
        <IonLabel>Ludzie</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/tab2">
        <IonIcon aria-hidden="true" icon={heart} />
        <IonLabel>Obserwowani</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/tab3">
        <IonIcon aria-hidden="true" icon={create} />
        <IonLabel>Rejestracja</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
