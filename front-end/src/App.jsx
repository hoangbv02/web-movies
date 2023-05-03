import React, { useState } from "react";
import "./App.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Info from "./pages/Info/Info";
import Watch from "./pages/Watch/Watch";
import Movies from "./pages/Movies/Movies";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/info-movie" element={<Info />} />
                <Route path="/watch-movie" element={<Watch />} />
                <Route
                    path="/odd-movie"
                    element={<Movies title="Phim lẻ" isOddMovie={true} />}
                />
                <Route
                    path="/series-movie"
                    element={<Movies title="Phim bộ" isSeriesMovie={true} />}
                />
                <Route
                    path="/search"
                    element={
                        <Movies title="Kết quả tìm kiếm" isSearchMovie={true} />
                    }
                />
                <Route path="/genres" element={<Movies title="Kết quả " />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
