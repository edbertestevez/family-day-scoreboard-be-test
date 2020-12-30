import { Response } from "express";
import db from "../utils/database";

export const RAW_QUERY = (query: string) => {
  return db.query(query, (err, response) => {
    return response;
  });
};

export const SELECT_QUERY = (query: string, res: Response) => {
  return db.query(query, (err, response) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(response);
    }
  });
};


export const INSERT_QUERY = (query: string, res: Response) => {
  return db.query(query, (err, response) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(response);
    }
  });
};

export const DELETE_QUERY = (query: string, res: Response) => {
  return db.query(query, (err, response) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(response);
    }
  });
};

export const UPDATE_QUERY = (query: string, res: Response) => {
  return db.query(query, (err, response) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(response);
    }
  });
};