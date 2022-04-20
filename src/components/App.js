import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CardIndex from './CardIndex';
import ShowCard from './ShowCard';
import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<h1>Hello world</h1>} />
      <Route path="/cards" element={<CardIndex />} />
      <Route path="/cards/:id" element={<ShowCard />} />
    </Routes>
  </BrowserRouter>
);

export default App;
