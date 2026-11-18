import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { calculator, ellipse, square, triangle } from 'ionicons/icons';
import { Navigate, Route } from 'react-router-dom';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="tab1" element={<Tab1 />} />
      <Route path="tab2" element={<Tab2 />} />
      <Route path="tab3" element={<Tab3 />} />
      <Route path="tab4" element={<Tab4 />} />
      <Route index element={<Navigate to="tab1" replace />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/tabs/tab1">
        <IonIcon aria-hidden="true" icon={triangle} />
        <IonLabel>Obrazki</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/tabs/tab2">
        <IonIcon aria-hidden="true" icon={ellipse} />
        <IonLabel>Liczby</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/tabs/tab3">
        <IonIcon aria-hidden="true" icon={square} />
        <IonLabel>Slajdy</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab4" href="/tabs/tab4">
        <IonIcon aria-hidden="true" icon={calculator} />
        <IonLabel>Kalkulator</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
