import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CardIndex from './CardIndex';
import ShowCard from './ShowCard';
import Login from './auth/login';
import Register from './auth/register';
import CreateCard from './CreateCard';
import Profile from './Profile';
import Match from './Match';
import '../styles/style.scss';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<h1>Hello world</h1>} />
      <Route path="/cards" element={<CardIndex />} />
      <Route path="/cards/:id" element={<ShowCard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreateCard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/play" element={<Match />} />
    </Routes>
  </BrowserRouter>
);

export default App;
