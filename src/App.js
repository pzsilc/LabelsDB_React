import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <BrowserRouter>
            <ToastContainer/>
            <Header/>
            <main style={{
                width: '90%',
                maxWidth: '800px',
                margin: '100px auto 0',
                minHeight: '800px'
            }}>
                <Switch>
                    <Route exact path='/labelsdb' component={Home} />
                </Switch>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
