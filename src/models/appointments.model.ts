import { Connection } from '../connection';

const connection = new Connection();

const getAll = async () => {
  try {
    const response = await connection.query(`
          SELECT 
            appointments.*, 
            CONCAT(patient.first_name, ' ', patient.last_name) AS patientName, 
            CONCAT(doctor.first_name, ' ', doctor.last_name) AS doctorName
          FROM appointments
          INNER JOIN users AS patient ON (appointments.patient_id = patient.user_id)
          INNER JOIN users AS doctor ON (appointments.doctor_id = doctor.user_id)
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err
  }
};

const getById = async (appointmentId: number) => {
  try {
    const response = await connection.query(`
            SELECT * FROM appointments
            WHERE appointment_id = ${appointmentId}
        `);
    return response;
  } catch (err) {
    console.log(err);
    return err
  }
};

const create = async (data: {
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
}) => {
  try {
    const response = await connection.query(`
            INSERT INTO appointments (
                patient_id,
                doctor_id,
                appointment_date
            ) VALUES (
                ${data.patientId},
                ${data.doctorId},
                '${data.appointmentDate}'
            )
        `);
    return response;
  } catch (err) {
    console.log(err);
    return err
  }
};

const update = async (data: {
  appointmentDate: Date;
  patientId: number;
  doctorId: number;
  appointmentId: number;
}) => {
  try {
    const response = await connection.query(`
            UPDATE appointments SET
                patient_id = ${data.patientId},
                doctor_id = ${data.doctorId},
                appointment_date = '${data.appointmentDate}'
            WHERE appointment_id = ${data.appointmentId}
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err
  }
};

const remove = async (appointmentId: number) => {
  try {
    const response = await connection.query(`
          DELETE FROM appointments WHERE appointment_id = ${appointmentId}
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err
  }
};

export default { create, getAll, getById, update, remove };
