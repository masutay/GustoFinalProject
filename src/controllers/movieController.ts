import { RequestHandler } from "express";
import { movieCreateDto } from "../dtos/movie.dto";
import { Movie } from "../entity/Movie";
import { User } from "../entity/User";
import * as fs from "fs";
import { MovieLikes } from "../entity/MovieLikes";
import { nanoid } from "nanoid";
// create movie  with loading image and save the images to uploads file which is under the public file
//we have relations with user table so when saving movie to db we have to send user information who is login
export const createMovie: RequestHandler = async (req, res) => {
  try {
    if (!req.userID) res.redirect("/login");
    const reqFiles = req.files;
    const image = uploadsField(reqFiles);
    const currentUser = await User.findOne(req.userID);
    let { visibility, ...movie }: movieCreateDto = req.body;
    (visibility == "on") ? (visibility = true) : (visibility = false);
    const film = Movie.create({
      ...movie,
      image,
      visibility: visibility,
      user: currentUser,
    });
    await Movie.save(film).then(() => { res.status(201).redirect("/profileMovies") });
  } catch (error) {
    throw new Error();
  }


};

// update movie information we saved to before.
//we catch the movies that we shared form paramsId so we can make changes on this.
export const updateMovie: RequestHandler = async (req, res) => {
  try {
    const reqFiles = req.files;
    const image = uploadsField(reqFiles);

    let { movieName, description, visibility }: movieCreateDto = req.body;
    visibility == "on" ? (visibility = true) : (visibility = false);

    const movie = await Movie.findOne({ id: req.params.id });
    movie.movieName = movieName;
    movie.description = description;
    movie.visibility = visibility;
    movie.image = image;
    await Movie.save(movie)
      .then(() => { res.status(201).redirect("/profileMovies") })
      ;
  } catch (error) {
    throw new Error();
  }
};

export const getMyProfileMovie: RequestHandler = async (req, res) => {
  try {
    const userMovieLikes = [];
    // we reach the movie cards that user shared by using left join
    const userMovies = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.movie", "movie")
      .where("user.id = :userID", { userID: req.userID })
      .getOne();
    // we reach the movie cards comments 
    const movieComments = await Movie.createQueryBuilder("movie")
      .leftJoinAndSelect("movie.comments", "comments")
      .leftJoinAndSelect("movie.likes", "likes")
      .where("movie.user.id = :userID", { userID: req.userID })
      .getMany();
    // we reach the movie cards likes 
    const userlikes = await MovieLikes.createQueryBuilder("movielikes")
      .leftJoinAndSelect("movielikes.movie", "movie")
      .where("movielikes.userId = :userID", { userID: req.userID })
      .getMany();
    //save all likes of the movie card to in array to know count and all user who liked or unlike this cards 
    // so any user can like once time   
    userlikes.forEach((likes) => {
      userMovieLikes.push(likes.movie.id);
    });
    res.status(200)
      .render("profileForMovies", {
        userMovies: userMovies,
        movieComments,
        userMovieLikes,
      });
  } catch (error) {
    throw new Error();
  }
};
// when delete movies cards that we shared,we delete all likes and comments from db by using typeorm propertieses that is CASCADE
export const deleteMovie: RequestHandler = async (req, res) => {
  try {
    const movie = await Movie.findOne({ id: req.params.id });
    await Movie.remove(movie)
      .then(() => {
        res.status(200).redirect("/profileMovies");
      })

  } catch (error) {
    throw new Error();
  }
};
//this function for creating uploads file and adding the image which sharing to file
const uploadsField = (reqFiles) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const imageName = nanoid()
  let uploadedImageName = imageName + reqFiles.image["name"];;
  let uploadedImage = reqFiles.image["data"];
  const image = "/uploads/" + uploadedImageName;
  fs.writeFileSync(uploadDir + "/" + uploadedImageName, uploadedImage);

  return image;
};


