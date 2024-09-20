import { Request, Response } from 'express';
import usersModel from '../models/users.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function getAll(_req: Request, res: Response) {
  usersModel
    .getAll()
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}

export function login(req: Request, res: Response) {
  const body = req.body;

  const user = {
    email: body.email,
    password: body.password
  };

  usersModel
    .getByEmail(user.email)
    .then(
      (
        response: Array<{
          userId: number;
          password: string;
          firstName: string;
          lastName: string;
          age: number;
          type: string;
        }>
      ) => {
        if (!response) {
          res.status(404).send({ message: 'User not found' });
          return;
        }

        bcrypt
          .compare(user.password, response[0].password)
          .then((response) => {
            if (!response) res.status(422).send({ message: 'Wrong password' });
          })
          .catch((err) => {
            throw err;
          });

        const secret = process.env.JWT_SECRET || '12345abcde!@#$%';

        jwt.sign(
          { userId: response[0].userId },
          secret,
          {
            expiresIn: process.env.JWT_EXPIRES_IN || '180m'
          },
          (err: any, token: any) => {
            if (err) throw err;
            res.status(200).json({ token, message: 'User loged!' });
          }
        );
      }
    )
    .catch((err) => {
      res.status(500).send({ message: err });
    });
}

export function getById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  usersModel
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

  const newUser = {
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    age: body.age,
    type: body.type
  };

  bcrypt.genSalt(12).then((salt) => {
    bcrypt
      .hash(newUser.password, salt)
      .then(async (hash) => {
        newUser.password = hash;

        usersModel
          .create(newUser)
          .then((response) => {
            if (response.insertId)
              res.status(200).json({
                message: 'User ' + response.insertId + ' was created!',
                data: { ...newUser, userId: response.insertId }
              });
            else throw 'Database error';
          })
          .catch((error) => {
            res.status(400).json(error || 'Undefined error');
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
}

export function update(req: Request, res: Response) {
  const body = req.body;
  const id = parseInt(req.params.id);

  const newApointment = {
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    age: body.age,
    type: body.type,
    userId: id
  };

  usersModel
    .update(newApointment)
    .then((response) => {
      if (response.affectedRows && response.affectedRows > 0)
        res.status(200).json({
          message: 'User ' + id + ' success updated!',
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

  usersModel
    .remove(id)
    .then((response) => {
      if (response.affectedRows && response.affectedRows > 0)
        res.status(200).json({ message: 'User ' + id + ' success removed!' });
      else throw 'Database error';
    })
    .catch((error) => {
      res.status(400).json(error || 'Undefined error');
    });
}
