import React, { useState, useEffect ,useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './projects.scss';

const Single = ({ item  }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section className='project-card' >
      <div className="container app__flex">
        <div className="wrapper ">
          <div className="imageContainer" ref={ref}>
          <img src={urlFor(item.imgUrl)} alt={item.name} />
          </div>
          <motion.div className="textContainer " style={{y}}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className='button-group '>

            <a href={item.projectLink} target="_blank" rel="noreferrer">
            <button>Demo</button>
            </a>
           
            
            <a href={item.codeLink} target="_blank" rel="noreferrer">
            <button>Code</button>
            </a>

            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};
const Projects = () => {
  const [works, setWorks] = useState([]);

  
  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
    });
  }, []);

  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });


  return (
    <>
       <div className="portfolio app__flex" ref={ref}>
      
       <div className="progress">
      <h2 className="head-text" id="projects">Featured <span>Projects</span></h2>
      <motion.div  style={{scaleX}} className="progressBar app__flex"></motion.div>
      </div>

      <motion.div
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {works.map((item,index) => (

          <Single item={item} key={index}/>
         
        ))}
      </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Projects, 'app__works'),
  'work',
  'app__primarybg',
);