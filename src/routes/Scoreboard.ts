import express from "express";
import { TScore } from "../types/Scores";
import { INSERT_QUERY, SELECT_QUERY } from "../utils/queries";

let router = express.Router();

let MODULE_ROUTE = "/scoreboard/";

router.get(MODULE_ROUTE + "games", (req, res) => {
  SELECT_QUERY("SELECT * FROM game", res);
});

router.get(MODULE_ROUTE + "scores", (req, res) => {
  SELECT_QUERY("SELECT * FROM team_games", res);
});

router.get(MODULE_ROUTE + "team_total", (req, res) => {
  SELECT_QUERY("SELECT teamId, COALESCE(SUM(score), 0) AS points FROM team_games GROUP BY teamId;", res);
});

router.patch(MODULE_ROUTE + "update", (req, res) => {
  let params = req.body;
  let upsertValueQuery = "";
  
  params.map((column: TScore, index: number) => {
    upsertValueQuery += `(${column.id}, ${column.teamId}, ${column.gameId}, ${column.score})`;

    if (index !== params.length - 1) {
      upsertValueQuery += ", ";
    }
  });

  console.log(upsertValueQuery)

  INSERT_QUERY(
    `INSERT INTO team_games (id, teamId, gameId, score) VALUES${upsertValueQuery} ON DUPLICATE KEY UPDATE score=VALUES(score)`,
    res
  );
});

module.exports = router;
