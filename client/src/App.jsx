import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import HomePage from './View/HomePage.view';
import NewRecipe from './View/NewRecipe.view';
import DetailRecipe from './View/DetailRecipe.view';
import WeeklyPlan from './View/WeeklyPlan.view';
import ShopList from './View/ShopList.view';
import AllRecipes from './View/AllRecipes.view';

import ProtectedRoute from './Components/ProtectedRoutes.component';
import './styles.css'; 

import "bootswatch/dist/minty/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
  {/* Rutas públicas (accesibles para todos) */}
  <Route index={true} path="/" element={<HomePage setUser={setUser} />} />
  
  {/* Rutas protegidas */}
  <Route
    path="/recipe/new/"
    element={
      <ProtectedRoute user={user} redirected="/login">
        <NewRecipe setUser={setUser} />
      </ProtectedRoute>
    }
  />
  <Route
    path="/recipe/:id/"
    element={
      <ProtectedRoute user={user} redirected="/login">
        <DetailRecipe setUser={setUser} />
      </ProtectedRoute>
    }
  />
  <Route
    path="/recipe/"
    element={
      <ProtectedRoute user={user} redirected="/login">
        <WeeklyPlan setUser={setUser} />
      </ProtectedRoute>
    }
  />
    <Route
    path="/recipe/all/"
    element={
      <ProtectedRoute user={user} redirected="/login">
        <AllRecipes setUser={setUser} />
      </ProtectedRoute>
    }
  />

  <Route
    path="/recipe/shoplist"
    element={
      <ProtectedRoute user={user} redirected="/login">
        <ShopList setUser={setUser} />
      </ProtectedRoute>
    }
  />

  {/* Otras rutas públicas o protegidas según sea necesario */}
  
  <Route path='*' element={<Navigate to="/" />} />
</Routes>

    </BrowserRouter>
  );
}
export default App;