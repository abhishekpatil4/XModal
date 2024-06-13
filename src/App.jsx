import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      } 
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);
    console.log("payload: ", payload);
  }
  return <div className="modal">
    <h1>User Details Modal</h1>
    <button type='button' onClick={() => setModalOpen(!modalOpen)}>Open Form</button>
    {
      modalOpen && <div className="modal-content" style={{ position: 'fixed',  top: '30vh', left:'30vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={modalRef}>
        <form onSubmit={handleFormSubmit} style={{ backgroundColor: 'gray', height: '40vh', width: '40vw', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 10, borderRadius: '10px' }}>
          <h2>Fill Details</h2>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input type="number" name="phoneNumber" id="phoneNumber" />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth: </label>
            <input type="date" name="dob" id="dob" />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    }
  </div>
}

export default App