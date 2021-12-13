import Body from './components/body/index';
import Header from './components/header/index';
import { GlobalProvider } from './contexts/GlobalContext';
import './App.css';

function Routes() {
  return (
    <div className="Routes">
      <GlobalProvider>
        <Header />
        <Body />
      </GlobalProvider>
    </div>
  );
};

export default Routes;
