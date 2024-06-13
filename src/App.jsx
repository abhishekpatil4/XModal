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
    if (payload.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.")
      return;
    }
    const today = new Date();
    const dob = new Date(payload.dob);
    if (dob > today) {
      alert("Invalid date of birth. Date of birth cannot be in the future.")
      return;
    }
    setModalOpen(false);
  }
  return <div >
    <h1>User Details Modal</h1>
    <button type='button' onClick={() => setModalOpen(!modalOpen)}>Open Form</button>
    {
      modalOpen && <div className="modal"  style={{ position: 'fixed', top: '30vh', left: '30vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ref={modalRef}>
        <form className="modal-content" onSubmit={handleFormSubmit} style={{ backgroundColor: 'gray', height: '40vh', width: '40vw', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 10, borderRadius: '10px' }}>
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
            <label htmlFor="phone">Phone Number: </label>
            <input type="number" name="phone" id="phone" />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth: </label>
            <input type="date" name="dob" id="dob" />
          </div>
          <button type='submit' className='submit-button'>Submit</button>
        </form>
      </div>
    }
  </div>
}

export default App