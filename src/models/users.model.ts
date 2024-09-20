import { Connection } from '../connection';

const connection = new Connection();

const getAll = async () => {
  try {
    const response = await connection.query(`
         SELECT 
            user_id AS userId,
            email,
            password,
            first_name AS firstName,
            last_name AS lastName,
            age,
            type
         FROM users 
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getById = async (userId: number) => {
  try {
    const response = await connection.query(`
            SELECT 
                user_id AS userId,
                email,
                password,
                first_name AS firstName,
                last_name AS lastName,
                age,
                type
            FROM users 
            WHERE user_id = ${userId}
        `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getByEmail = async (email: string) => {
  try {
    const response = await connection.query(`
            SELECT 
                user_id AS userId,
                email,
                password,
                first_name AS firstName,
                last_name AS lastName,
                age,
                type
            FROM users 
            WHERE email = '${email}'
          `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const create = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  type: string;
}) => {
  try {
    const response = await connection.query(`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                age,
                type
            ) VALUES (
                '${data.email}',
                '${data.password}',
                '${data.firstName}',
                '${data.lastName}',
                ${data.age},
                '${data.type}'
            )
        `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const update = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  type: string;
  userId: number;
}) => {
  try {
    const response = await connection.query(`
            UPDATE users SET
                email='${data.email}',
                password='${data.password}',
                first_name='${data.firstName}',
                last_name='${data.lastName}',
                age=${data.age},
                type='${data.type}'
            WHERE user_id = ${data.userId}
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const remove = async (userId: number) => {
  try {
    const response = await connection.query(`
          DELETE FROM users WHERE user_id = ${userId}
      `);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default { create, getAll, getById, update, remove, getByEmail };
