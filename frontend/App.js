import { Platform } from 'react-native';
import MobileNavigation from './components/MobileNavigation';
import WebNavigation from './components/WebNavigation';

export default function App() {
  if (Platform.OS === 'web') {
    return <WebNavigation />;
  } else {
    return <MobileNavigation />;
  }
}

