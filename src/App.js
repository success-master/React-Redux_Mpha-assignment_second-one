import React from 'react';
import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Container />
        <Footer />
      </div>
    );
  }
}

export default App;
