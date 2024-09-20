import { Request, Response } from 'express';
import appointmentsModel from '../models/appointments.model';

export function getAll(_req: Request, res: Response) {
  appointmentsModel
    .getAll()
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function getById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  appointmentsModel
    .getById(id)
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function create(req: Request, res: Response) {
  const body = req.body;

  const newApointment = {
    patientId: body.patientId,
    doctorId: body.doctorId,
    appointmentDate: body.appointmentDate
  };

  appointmentsModel
    .create(newApointment)
    .then((response) => {
      if (response.insertId)
        res.status(200).json({
          message: 'Appointment ' + response.insertId + ' was created!',
          data: { ...newApointment, appointmentId: response.insertId }
        });
      else throw 'Database error';
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function update(req: Request, res: Response) {
  const body = req.body;
  const id = parseInt(req.params.id);

  const newApointment = {
    patientId: body.patientId,
    doctorId: body.doctorId,
    appointmentDate: body.appointmentDate,
    appointmentId: id
  };

  appointmentsModel
    .update(newApointment)
    .then((response) => {
      if (response.affectedRows && response.affectedRows > 0)
        res.status(200).json({
          message: 'Appointment ' + id + ' success updated!',
          data: newApointment
        });
      else throw 'Database error';
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function remove(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  appointmentsModel
    .remove(id)
    .then((response) => {
      if (response.affectedRows && response.affectedRows > 0)
        res
          .status(200)
          .json({ message: 'Appointment ' + id + ' success removed!' });
      else throw 'Database error';
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}
