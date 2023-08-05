const router = require("express").Router();
const {
  getChildNotes,
  login,
  register,
  getStudents,
} = require("../controllers/parent.controller");
const { authenticateToken } = require("../middlewares/jwt");

router.post("/register", register);
router.post("/login", login);
router.get("/get-student", authenticateToken, getStudents);
router.get("/get-notes/:studentId", getChildNotes);

module.exports = router;
