
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Sandwich from './sandwich';
import ParticleBackground from './ParticleBackground';
import InitialModal from "./initialmodal"
function App() {
  return (
    // <InitialModal>
    <>

      <ParticleBackground />
      <Header />

      <div className="sandwichBoss">
        <Sandwich />

      </div>

      {/* <Footer /> */}

      <div className="footer">
        <h3>&copy; 2020 Brocoli & Co. All Rights Reserved</h3>
      </div>
    </>
    // </InitialModal>
  );
}

export default App;
