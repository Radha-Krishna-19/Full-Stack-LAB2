import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import GameHub from './pages/GameHub';
import NumberWorld from './pages/NumberWorld';
import AdditionQuest from './pages/AdditionQuest';
import SubtractionJourney from './pages/SubtractionJourney';
import ShapeAdventure from './pages/ShapeAdventure';
import PatternPlay from './pages/PatternPlay';
import MyProgress from './pages/MyProgress';
import About from './pages/About';
import './index.css';

function App() {
  return (
    <GameProvider>
      <Router basename="/Full-Stack-LAB2">
        <div className="app-container">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hub" element={<GameHub />} />
              <Route path="/numbers" element={<NumberWorld />} />
              <Route path="/addition" element={<AdditionQuest />} />
              <Route path="/subtraction" element={<SubtractionJourney />} />
              <Route path="/shapes" element={<ShapeAdventure />} />
              <Route path="/patterns" element={<PatternPlay />} />
              <Route path="/progress" element={<MyProgress />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
