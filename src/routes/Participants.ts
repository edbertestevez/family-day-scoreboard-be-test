import express from "express";
import { IParticipant, IParticipantData } from "../types/Participant";
import { DELETE_QUERY, INSERT_QUERY, RAW_QUERY, SELECT_QUERY, UPDATE_QUERY } from "../utils/queries";
import db from "../utils/database";
import { CategoryIds } from "../types/Category";

let router = express.Router();

let MODULE_ROUTE = "/participants/";

router.get(MODULE_ROUTE + "list", (req, res) => {
  SELECT_QUERY(
    "SELECT participantId, lastName, firstName, C.categoryId, C.label AS categoryName, P.teamId, leaderId FROM participant P LEFT JOIN team T ON P.teamId = T.teamId INNER JOIN category C WHERE P.categoryId = C.categoryId GROUP BY participantId ORDER BY lastName",
    res
  );
});

router.post(MODULE_ROUTE + "create", (req, res) => {
  let params: IParticipantData = req.body;
  let { lastName, firstName, categoryId } = params;

  INSERT_QUERY(
    `INSERT INTO participant (lastName, firstName, categoryId) VALUES('${lastName}', '${firstName}', ${categoryId})`,
    res
  );
});

router.patch(MODULE_ROUTE + "update", (req, res) => {
  let params: IParticipant = req.body;
  let { participantId, lastName, firstName, categoryId } = params;

  UPDATE_QUERY(
    `UPDATE participant SET participantId=${participantId}, lastName='${lastName}', firstName='${firstName}', categoryId=${categoryId} WHERE participantId = ${participantId}`,
    res
  );
});

router.delete(MODULE_ROUTE + "delete/:id", (req, res) => {
  let id = req.params.id;

  DELETE_QUERY(`DELETE FROM participant WHERE participantId = ${id}`, res);
});

router.patch(MODULE_ROUTE + "assign-leader", (req, res) => {
  let params = req.body;
  let { teamId, participantId } = params;
  //CLEAR
  RAW_QUERY(`UPDATE team SET leaderId = NULL WHERE teamId = ${teamId}`);
  //REASSIGN TEAM
  RAW_QUERY(`UPDATE participant SET teamId = ${teamId} WHERE participantId = ${participantId}`);

  //REASSIGN LEADER
  UPDATE_QUERY(`UPDATE team SET leaderId = ${participantId} WHERE teamId = ${teamId}`, res);
});

router.post(MODULE_ROUTE + "generate-team", async (req, res) => {
  await db.query("SELECT participantId, lastName, firstName, categoryId, P.teamId, leaderId FROM participant P INNER JOIN team T ON (P.participantId != T.leaderId OR T.leaderId IS NULL) AND (T.teamId = P.teamId OR P.teamId IS NULL)", (err, result) => {
    let parents = result.filter((p: IParticipant) => p.categoryId === CategoryIds.PARENTS);
    let youngAdults = result.filter((p: IParticipant) => p.categoryId === CategoryIds.YOUNG_ADULTS);
    let kids = result.filter((p: IParticipant) => p.categoryId === CategoryIds.KIDS);

    let overallData: Array<IParticipant> = shuffleCategory(parents)
      .concat(shuffleCategory(youngAdults))
      .concat(shuffleCategory(kids));
    generateTeam(overallData);
  });

  SELECT_QUERY("SELECT participantId, lastName, firstName, C.categoryId, C.label AS categoryName, P.teamId, leaderId FROM participant P LEFT JOIN team T ON P.teamId = T.teamId INNER JOIN category C WHERE P.categoryId = C.categoryId GROUP BY participantId", res);
});

const shuffleCategory = (data: Array<IParticipant>) => {
  return data
    .map((item: IParticipant) => ({ sort: Math.random(), value: item }))
    .sort((a: any, b: any) => a.sort - b.sort)
    .map((a: any) => a.value);
};

const generateTeam = (data: Array<IParticipant>) => {
  let upsertQuery = "";

  data.map((value: any, index: number) => {
    let currCount = index + 1;
    let currTeam = 1;

    if (currCount % 3 === 0) {
      currTeam = 3;
    } else if (currCount % 3 === 2) {
      currTeam = 2;
    }

    upsertQuery += `(${value.participantId}, '${value.lastName}', '${value.firstName}', ${value.categoryId}, ${currTeam})`;

    if (currCount !== data.length) {
      upsertQuery += ", ";
    }
  });

  RAW_QUERY(`INSERT INTO participant VALUES${upsertQuery} ON DUPLICATE KEY UPDATE teamId=VALUES(teamId)`);
};
module.exports = router;
