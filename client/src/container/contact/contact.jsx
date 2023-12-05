import React, { useRef, useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './contact.scss';
import {motion , useInView} from "framer-motion";

const variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Contact = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <motion.div
       ref={ref}
      className="contact"
      variants={variants}
      initial="initial"
      whileInView="animate"
      >
      <motion.h1 className="head-text" variants={variants}>Feel free to contact me...</motion.h1>
      </motion.div>
      <div className="formContainer">
      <motion.div 
      className='emailSvg'
      initial={{opacity:1}}
      whileInView={{opacity:0}}
      transition={{delay:3,duration:1}}
      >

<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none">
<motion.path
        strokeWidth={0.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView && { pathLength: 1 }}
              transition={{ duration: 3 }} d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" 
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      </motion.div>
      
      <motion.div className="app__contact-cards"
      initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}>
        <div className="app__contact-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:sailesh0609@gmail.com" className="p-text">sailesh0609@gmail.com</a>
        </div>
      </motion.div>
      {!isFormSubmitted ? (
        <motion.form className="app__contact-form app__flex"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}>
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} autoComplete="off" />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} autoComplete="off" />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message (within 100 words) "
              value={message}
              maxLength={2000}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
        </motion.form>
      ) : (
        <div>
          <motion.h1 className="head-text" variants={variants}>
            Thanks for getting in touch!
          </motion.h1>
        </div>
      )}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Contact, 'app__contact'),
  'contact',
  'app__primarybg',
);