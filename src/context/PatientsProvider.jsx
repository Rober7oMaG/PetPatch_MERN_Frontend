import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import clientAxios from "../config/axios";

const PatientsContext = createContext();

export const PatientsProvider = ({children}) => {
    const [patients, setPatients] = useState({});
    const [patient, setPatient] = useState({});
    
    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('JWT');
                if (!token) {
                    return;
                }
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clientAxios.get('/patients', config);
                setPatients(data);
            } catch (error) {
                console.log(error);
            }
        }

        getPatients();
    }, []);

    const savePatient = async (patient) => {
        const token = localStorage.getItem('JWT');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        if (patient.id) {
            // Update patient
            try {
                const {data} = await clientAxios.put(`/patients/${patient.id}`, patient, config);
                const updatedPatients = patients.map(statePatient => statePatient._id === data._id ? data : statePatient);
                setPatients(updatedPatients);
            } catch (error) {
                console.log(error);
            }
        } else {
            // Create patient
            try {
                const {data} = await clientAxios.post('/patients', patient, config);
                const {createdAt, updatedAt, __v, ...storedPatient} = data;
                
                setPatients([storedPatient, ...patients]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    };

    const setEditing = (patient) => {
        setPatient(patient);
    };

    const deletePatient = async id => {
        const deleteConfirmation = confirm("Confirm Patient Deletion?");
        if (deleteConfirmation) {
            try {
                const token = localStorage.getItem('JWT');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                const {data} = clientAxios.delete(`/patients/${id}`, config);
                const updatedPatients = patients.filter(statePatients => statePatients._id !== id);
                setPatients(updatedPatients);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEditing,
                patient,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    );
};

export default PatientsContext;