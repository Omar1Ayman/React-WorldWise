import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Content from "../components/content/Content";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/applayout/AppLayuot";
import ListCities from "../components/applayout/ListCities";
import ListCountries from "../components/applayout/ListCountries";
import City from "../components/applayout/City";
import Form from "../components/applayout/Form";
import Login from "./Login";
import Register from "./Rgister";
import ProtectedRoute from "./ProtectedRoute";

export const Home = () => {
  return (
    <div className="home">
      <div className="main">
        <Routes>
          <Route path="/" element={<Content />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="cities" replace />} />
            <Route
              path="cities"
              element={
                <>
                  <ListCities />
                </>
              }
            />
            <Route path="cities/:id" element={<City />} />

            <Route
              path="countries"
              element={
                <>
                  <ListCountries />
                </>
              }
            />
            <Route
              path="form"
              element={
                <>
                  <Form />
                </>
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};
