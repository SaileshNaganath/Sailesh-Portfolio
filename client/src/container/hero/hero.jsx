import React from 'react';

import "./hero.scss";

import { motion } from 'framer-motion';
import { images } from "../../constants";

import { AppWrap, MotionWrap } from '../../wrapper';

const Hero = () => {
  return (
    
    <div className='app__hero app__flex' id="home">
      <motion.div
        whileInView={{x:[-100,0], opacity:[0,1]}}
        transition={{duration:0.5}}
        className='app__hero-info'
        >
      <div className='app__hero-badge'>
       
        <div className='badge-cmp app__flex'>
          <h1 className='head-text'> <span>{"< >"}</span> Bringing Dreams to Reality, by code.<span>{"< / >"}</span></h1>
        </div>
      </div>

      <div className='tag-cmp app__flex'>
      <a href="#contact"><button>Contact Me</button></a>
        </div>
      </motion.div>

      <motion.div 
        whileInView={{opacity:[0,1]}}
        transition={{ duration:0.5 , delayChildren:0.5 }}
        className='app__hero-img'
      >
        <img src={images.profile} alt= "profile_bg"/>
      <motion.img
        whileInView={{opacity:[0,1]}}
        transition={{ duration:1 , ease:"easeInOut" }}
        src={images.circle}
        alt="profile_circle"
        className="overlay_circle"
      />
      </motion.div>

      <div className='app__hero-circles'>
       {[images.react, images.javascript, images.node].map((circle, index) => (
        <div className="circle-cmp app__flex" key={`circle-${index}`}>
          <img src={circle} alt="profile_bg" />
        </div>
      ))}
      </div>
    </div>
  )
}

export default AppWrap(
  MotionWrap(Hero, 'app__hero'),
  'home',
  'app__primarybg',
);