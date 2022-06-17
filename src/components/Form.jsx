import { useState } from "react"
import { useEffect } from "react";
import { Fragment } from "react"
import usePatients from "../hooks/usePatients";
import Alert from "./Alert";

const Form = () => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(Date.now());
  const [symptoms, setSymptoms] = useState('');
  const [id, setId] = useState(null);

  const [alert, setAlert] = useState({});

  const {patient, savePatient} = usePatients();

  useEffect(() => {
    if (patient?.name) {
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setDate(patient.date);
      setSymptoms(patient.symptoms);
      setId(patient._id);
    }
  }, [patient]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form
    if ([name, owner, email, date, symptoms].includes('')) {
      setAlert({
        message: "All fields are required",
        error: true
      });
      return;
    }

    savePatient({name, owner, email, date, symptoms, id});
    setAlert({
      message: "Saved successfully"
    });

    // Reset form
    setName('');
    setOwner('');
    setEmail('');
    setDate('');
    setSymptoms('');
    setId('');

    setTimeout(() => {
      setAlert({});
    }, 3000);
  }

  const {message} = alert
  
  return (
    <Fragment>
      <h2 className="font-black text-3xl text-center">Patients Manager</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Add your Patients and <span className="text-indigo-600 font-bold">Manage them</span>
      </p>
      <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="text-gray-700 uppercase font-bold">Pet's name</label>
          <input 
            type="text"
            id="name"
            placeholder="Name of the pet"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="owner" className="text-gray-700 uppercase font-bold">Owner</label>
          <input 
            type="text"
            id="owner"
            placeholder="Name of the owner"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={event => setOwner(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">Owner's email</label>
          <input 
            type="email"
            id="email"
            placeholder="Email of the owner"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 uppercase font-bold">Admission date</label>
          <input 
            type="date"
            id="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={event => setDate(event.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="symptoms" className="text-gray-700 uppercase font-bold">Symptoms</label>
          <textarea
            id="symptoms"
            placeholder="Describe pet's symptoms"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={symptoms}
            onChange={event => setSymptoms(event.target.value)}
          />
        </div>

        <input 
          type="submit" 
          value={id ? 'Save Changes' : 'Add Patient'}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" 
        />
      </form>

      {message && 
        <Alert 
          alert={alert}
        />
      }
    </Fragment>
  )
}

export default Form