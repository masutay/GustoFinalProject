import { RequestHandler } from "express";
import { Celebs } from "../entity/Celebs";
import { CelebsLikes } from "../entity/CelebsLikes";
import { Movie } from "../entity/Movie";
import { MovieLikes } from "../entity/MovieLikes";
import { User } from "../entity/User";

export const getRegisterPage: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) res.redirect("/profileMovies");
    res.status(200).render("register");
  } catch (error) {
    throw new Error();
  }
};

export const getLoginPage: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) res.redirect("/profileMovies");
    res.status(200).render("login");
  } catch (error) {
    throw new Error();
  }
};

//MOVIE PAGE CONTROLLERS
export const movieHomePage: RequestHandler = async (req, res) => {
  try {
    const thisUser = await User.findOne(req.userID);
    const movies = await Movie.createQueryBuilder("movie")
      .leftJoinAndSelect("movie.user", "user")
      .leftJoinAndSelect("movie.comments", "comments")
      .leftJoinAndSelect("movie.likes", "likes")      
      .where("movie.visibility = true")
      .orderBy({
        "movie.date":"DESC",
        "comments.date":"DESC"
      })
      .getMany();

    const userlikes = await MovieLikes.createQueryBuilder("movielikes")
      .leftJoinAndSelect("movielikes.movie", "movie")
      .where("movielikes.userId = :userID", { userID: req.userID })
      .getMany();

    const userMovieLikes = [];
    for (let i = 0; i < userlikes.length; i++) {
      userMovieLikes.push(userlikes[i].movie.id);
    }  
    res.status(200).render("movieHome", {
      thisUser,
      movies,
      userMovieLikes,
    });
  } catch (error) {
    throw new Error();
  }
};

export const editMoviePage: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) res.status(200).render("login");
    const userMovieLikes = [];
    const selectedMovie = await Movie.createQueryBuilder("movie")
      .leftJoinAndSelect("movie.comments", "comments")
      .leftJoinAndSelect("movie.likes", "likes")
      .leftJoinAndSelect("movie.user", "user")
      .where("movie.id = :movieId", { movieId: req.params.id })
      .orderBy({
        "movie.date":"DESC",
        "comments.date":"DESC"
      })
      .getMany();
    const userlikes = await MovieLikes.createQueryBuilder("movielikes")
      .leftJoinAndSelect("movielikes.movie", "movie")
      .where("movielikes.userId = :userID", { userID: req.userID })
      .getMany();
    userlikes.forEach((likes) => {
      userMovieLikes.push(likes.movie.id);
    });
    const movie = await Movie.findOne({ id: req.params.id });

   res
      .status(200)
      .render("editMovie", { movie: movie, selectedMovie, userMovieLikes });
  } catch (error) {
    throw new Error();
  }
};

export const userProfileMovie: RequestHandler = async (req, res) => {
  try {
    const userMovieLikes = [];

    const userMovies = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.movie", "movie")
      .where("user.id = :userID", { userID: req.userID })
      .orderBy({
        "movie.date":"DESC"
      })
      .getOne();

    const movieComments = await Movie.createQueryBuilder("movie")
      .leftJoinAndSelect("movie.comments", "comments")
      .leftJoinAndSelect("movie.likes", "likes")
      .where("movie.user.id = :userID", { userID: req.userID })
      .orderBy({ 
        "movie.date":"DESC",      
        "comments.date":"DESC"
      })
      .getMany();

    const userlikes = await MovieLikes.createQueryBuilder("movielikes")
      .leftJoinAndSelect("movielikes.movie", "movie")
      .where("movielikes.userId = :userID", { userID: req.userID })
      .getMany();

    userlikes.forEach((likes) => {
      userMovieLikes.push(likes.movie.id);
    });
    res.status(200).render("profileForMovies", {
      userMovies: userMovies,
      movieComments,
      userMovieLikes,
    });
  } catch (error) {
    throw new Error();
  }
};

//CELEBS PAGE CONTROLLERS
export const celebsHomePage: RequestHandler = async (req, res) => {
  try {
    const userCelebsLikes = [];
    const thisUser = await User.findOne(req.userID);
    const celebs = await Celebs.createQueryBuilder("celebs")
      .leftJoinAndSelect("celebs.user", "user")
      .leftJoinAndSelect("celebs.comments", "comments")
      .leftJoinAndSelect("celebs.likes", "likes")
      .where("celebs.visibility = true")
      .orderBy({
        "celebs.date":"DESC",
        "comments.date":"DESC"
      })
      .getMany();

    const userlikes = await CelebsLikes.createQueryBuilder("celebslikes")
      .leftJoinAndSelect("celebslikes.celebs", "celebs")
      .where("celebslikes.userId = :userID", { userID: req.userID })
      .getMany();

    userlikes.forEach((likes) => {
      userCelebsLikes.push(likes.celebs.id);
    });
    res.status(200).render("celebsHome", {
      thisUser,
      celebs,
      userCelebsLikes,
    });
  } catch (error) {
    throw new Error();
  }
};

export const userProfileCelebss: RequestHandler = async (req, res) => {
  try {
    const userCelebsLikes = [];

    const userCelebs = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.celebs", "celebs")
      .where("user.id = :userID", { userID: req.userID })
      .orderBy({
        "celebs.date":"DESC"
      })
      .getOne();

    const celebsComments = await Celebs.createQueryBuilder("celebs")
      .leftJoinAndSelect("celebs.comments", "comments")
      .leftJoinAndSelect("celebs.likes", "likes")
      .where("celebs.user.id = :userID", { userID: req.userID })
      .orderBy({       
        "celebs.date":"DESC",      
        "comments.date":"DESC"
      })
      .getMany();

    const userlikes = await CelebsLikes.createQueryBuilder("celebslikes")
      .leftJoinAndSelect("celebslikes.celebs", "celebs")
      .where("celebslikes.userId = :userID", { userID: req.userID })
      .getMany();

    userlikes.forEach((likes) => {
      userCelebsLikes.push(likes.celebs.id);
    });

    res.status(200).render("profileForCelebs", {
      userCelebs: userCelebs,
      celebsComments,
      userCelebsLikes,
    });
  } catch (error) {
    throw new Error();
  }
};

export const editCelebsPage: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) res.status(200).render("login");
    const userCelebsLikes = [];
    const selectedCelebs = await Celebs.createQueryBuilder("celebs")
      .leftJoinAndSelect("celebs.comments", "comments")
      .leftJoinAndSelect("celebs.likes", "likes")
      .leftJoinAndSelect("celebs.user", "user")
      .where("celebs.id = :celebsId", { celebsId: req.params.id })
      .orderBy({
        "celebs.date":"DESC",
        "comments.date":"DESC"
      })
      .getMany();
    const userlikes = await CelebsLikes.createQueryBuilder("celebslikes")
      .leftJoinAndSelect("celebslikes.celebs", "celebs")
      .where("celebslikes.userId = :userID", { userID: req.userID })
      .getMany();
    userlikes.forEach((likes) => {
      userCelebsLikes.push(likes.celebs.id);
    }); 
    const celebs = await Celebs.findOne({ id: req.params.id });
    res
      .status(200)
      .render("editCelebs", {
        celebs: celebs,
        selectedCelebs,
        userCelebsLikes,
      });
  } catch (error) {
    throw new Error();
  }
};
