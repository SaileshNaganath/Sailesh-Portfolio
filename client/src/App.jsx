import React from 'react';

import "./App.scss";

import { About, Contact, Hero, Skills ,Projects } from './container';

import { Cursor, Navbar } from './components';

const App = () => {

  return (

    <div className="App">
   <Cursor/>
    <Navbar/>
    <section><Hero/></section>
    <section><About/></section>
    <section><Skills/></section>
    <section><Projects/></section>
    <section><Contact/></section>
    
    </div>

  );
}

export default App;