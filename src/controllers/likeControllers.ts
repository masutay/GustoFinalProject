import { RequestHandler } from "express";
import { Celebs } from "../entity/Celebs";
import { CelebsLikes } from "../entity/CelebsLikes";
import { Movie } from "../entity/Movie";
import { MovieLikes } from "../entity/MovieLikes";

//to like movies we taking the movie id from params that shared.
//and saving likes table
export const likeMovie: RequestHandler = async (req, res) => {
  try {
    const currentMovie = await Movie.findOne({ id: req.params.id });
    const like =  MovieLikes.create({
      userId: req.userID,
      movie: currentMovie,
    });
    await MovieLikes.save(like).then(() => {
      //to show the current page that includes movie which we comment on it
      req.params.src === "profileMovies" ? res.status(200).redirect("/profileMovies") : res.status(200).redirect("/movieHome");
    });
  } catch (error) {
    throw new Error();
  }

};

//deleting user like from db
export const unlikeMovie: RequestHandler = async (req, res) => {
  try {
    const userlikes = await MovieLikes.createQueryBuilder("movielikes")
      .leftJoinAndSelect("movielikes.movie", "movie")
      .where("movielikes.userId = :userID", { userID: req.userID })
      .andWhere("movielikes.movie = :movieId", { movieId: req.params.id })
      .getOne();

    const deletingId = userlikes.id;
    const deleteLike = await MovieLikes.findOne({ id: deletingId });
    await MovieLikes.remove(deleteLike).then(() => {
      req.params.src === "profileMovies" ? res.status(200).redirect("/profileMovies") : res.status(200).redirect("/movieHome")
    })
  } catch (error) {
    throw new Error();
  }

};

export const likeCelebs: RequestHandler = async (req, res) => {
  try {
    const currentCelebs = await Celebs.findOne({ id: req.params.id });
    const like = await CelebsLikes.create({
      userId: req.userID,
      celebs: currentCelebs,
    });
    await CelebsLikes.save(like).then(() => {
      req.params.src === "profileCelebs" ? res.status(200).redirect("/profileCelebs") : res.status(200).redirect("/celebsHome");
    });
  } catch (error) {
    throw new Error();
  }
};

export const unlikeCelebs: RequestHandler = async (req, res) => {
  try {
    const userlikes = await CelebsLikes.createQueryBuilder("celebslikes")
      .leftJoinAndSelect("celebslikes.celebs", "celebs")
      .where("celebslikes.userId = :userID", { userID: req.userID })
      .andWhere("celebslikes.celebs = :celebsId", { celebsId: req.params.id })
      .getOne();
    const deletingId = userlikes.id;
    const deleteLike = await CelebsLikes.findOne({ id: deletingId });
    await CelebsLikes.remove(deleteLike).then(() => {
      req.params.src === "profileCelebs" ? res.status(200).redirect("/profileCelebs") : res.status(200).redirect("/celebsHome");
    });
  } catch (error) {
    throw new Error();
  }
};
