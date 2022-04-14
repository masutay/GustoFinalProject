import { RequestHandler } from "express";
import { CelebsCommentDto } from "../dtos/celebs.dto";
import { movieCommentDto, movieCreateDto } from "../dtos/movie.dto";
import { Celebs } from "../entity/Celebs";
import { CelebsComment } from "../entity/CelebsComment";
import { Movie } from "../entity/Movie";
import { MovieComment } from "../entity/MovieComment";
import { User } from "../entity/User";

//rwe reach current user who already loggin and the movie which wanting to comment 
//we save comments content with these formatiions 
export const createMovieComment: RequestHandler = async (req, res) => {
  try {
    const currentUser = await User.findOne({ id: req.userID });
    const currentMovie = await Movie.findOne({ id: req.params.id });
    let { text, writerName }: movieCommentDto = req.body;
    const commentOfMovie = MovieComment.create({
      text,
      writerName: currentUser.userName,
      movie: currentMovie,
    });
    //to show the current page that includes movie which we comment on it
    await MovieComment.save(commentOfMovie).then(() => {
      req.params.src === "profileMovies"? res.status(201).redirect("/profileMovies"): res.status(201).redirect("/movieHome");
    });
  } catch (error) {
    throw new Error();
  }
};

export const createCelebsComment: RequestHandler = async (req, res) => {
  try {
    const currentUser = await User.findOne({ id: req.userID });
    const currentCelebs = await Celebs.findOne({ id: req.params.id });
    let { text, writerName }: CelebsCommentDto = req.body;
    const commentOfCelebs = CelebsComment.create({
      text,
      writerName: currentUser.userName,
      celebs: currentCelebs,
    });
    await CelebsComment.save(commentOfCelebs).then(() => {
      req.params.src === "profileCelebs" ? res.status(201).redirect("/profileCelebs") : res.status(201).redirect("/celebsHome");
    });
  } catch (error) {
    throw new Error();
  }
};
