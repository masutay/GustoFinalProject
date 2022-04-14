import { RequestHandler } from "express";
import * as fs from "fs";
import { User } from "../entity/User";
import { celebsCreateDto } from "../dtos/celebs.dto";
import { Celebs } from "../entity/Celebs";
import { CelebsLikes } from "../entity/CelebsLikes";

// create celebs  with loading image and save the images to uploads file which is under the public file
//we have relations with user table so when saving celebs to db we have to send user information who is login
export const createCelebs: RequestHandler = async (req, res) => {
try {
  if (!req.userID) res.redirect("/login");
  const reqFiles = req.files;
  const image = uploadsField(reqFiles);
  const currentUser = await User.findOne(req.userID);
  let { visibility, ...celebs }: celebsCreateDto = req.body;
  (visibility == "on") ? (visibility = true) : (visibility = false);
  const celeb = Celebs.create({
    ...celebs,
    image,
    visibility: visibility,
    user: currentUser,
  });
 await Celebs.save(celeb)
 .then(()=>{res.status(201).redirect("/profileCelebs")})
} catch (error) {
  throw new Error();
}
};

// update celebs information we saved to before.
//we catch the celebs that we shared form paramsId so we can make changes on this.
export const updateCelebs: RequestHandler = async (req, res) => {
    try {     
      const reqFiles = req.files;
      const image = uploadsField(reqFiles);
      let { celebsName, description, visibility }: celebsCreateDto = req.body;
      (visibility == "on") ? (visibility = true) : (visibility = false);
      const celebs = await Celebs.findOne({ id: req.params.id });
      celebs.celebsName = celebsName;
      celebs.description = description;
      celebs.visibility = visibility;
      celebs.image = image;
  
      await Celebs.save(celebs)
      .then(()=>{ res.status(201).redirect("/profileCelebs")})
     
    } catch (error) {
      throw new Error();
    }
};

// when delete celebs cards that we shared,we delete all likes and comments from db by using typeorm propertieses that is CASCADE
export const deleteCelebs: RequestHandler = async (req, res) => {
  try {
    const celebs = await Celebs.findOne({ id: req.params.id });
    await Celebs.remove(celebs)
    .then(()=>{ res.status(200).redirect("/profileCelebs")})
  } catch (error) {
  throw new Error();
  }
};

export const getMyProfileCelebs: RequestHandler = async (req, res) => {
  try {
    const userCelebsLikes = [];
    // we reach the celebs cards that user shared by using left join
    const userCelebs = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.celebs", "celebs")
      .where("user.id = :userID", { userID: req.userID })
      .getOne();
 // we reach the celebs cards comments 
    const celebsComments = await Celebs.createQueryBuilder("celebs")
      .leftJoinAndSelect("celebs.comments", "comments")
      .leftJoinAndSelect("celebs.likes", "likes")
      .where("celebs.user.id = :userID", { userID: req.userID })
      .getMany();
// we reach the celebs cards likes 
    const userlikes = await CelebsLikes.createQueryBuilder("celebslikes")
      .leftJoinAndSelect("celebslikes.celebs", "celebs")
      .where("celebslikes.userId = :userID", { userID: req.userID })
      .getMany();
    //save all likes of the celebs card to in array to know count and all user who liked or unlike this cards 
    // so any user can like once time 
    userlikes.forEach((likes) => {
      userCelebsLikes.push(likes.celebs.id);
    });
    res
      .status(200)
      .render("profileForMovies", {
        userCelebs: userCelebs,
        celebsComments,
        userCelebsLikes,
      });
  } catch (error) {
    throw new Error();
  }
};

const uploadsField = (reqFiles) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImageName = reqFiles.image["name"];
  let uploadedImage = reqFiles.image["data"];
  const image = "/uploads/" + uploadedImageName;
  fs.writeFileSync(uploadDir + "/" + uploadedImageName, uploadedImage);

  return image;
};