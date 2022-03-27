import { Router } from "express";
import { Op } from "sequelize";
import Room from "../schemas/room";
import User from "../schemas/user";

const router = Router();

// 유저 목록
router.get("/", async (req, res) => {
  try {
    const result = await User.findAndCountAll({
      where: {
        id: {
          [Op.ne]: req.session.userId,
        },
      },
    });

    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

// 세션 조회
router.get("/me", async (req, res) => {
  try {
    res.json({
      username: req.session.user.username,
      userId: req.session.userId,
      isLogged: req.session.isLogged,
    });
  } catch (err) {
    console.error(err);
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const userId = uuid();
    const username = req.body.username;

    const user = await User.create({
      id: userId,
      username,
    });

    req.session.username = username;
    req.session.userId = userId;
    req.session.isLogged = true;

    req.session.save(() => {
      req.json({
        statusText: "success",
        data: user,
      });
    });
  } catch (err) {
    console.error(err);
  }
});

// 로그아웃
router.post("/logout", async (req, res) => {
  try {
    delete req.session.user;

    req.session.save(() => {
      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
  }
});
export default router;
