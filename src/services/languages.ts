import { Request, Response } from "express";
import Language, { ILanguage, LanguageDirection } from "../models/Language";

// Create a new language
export const createLanguage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, direction } = req.body;

  try {
    const language = new Language({
      name,
      direction,
      posts: [],
    });

    await language.save();

    return res.status(201).json({
      _id: language._id,
      name: language.name,
      direction: language.direction,
      posts: language.posts,
      createdAt: language.createdAt,
      updatedAt: language.updatedAt,
    });
  } catch (err) {
    return res.status(200).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Get all languages
export const getAllLanguages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const languages = await Language.find().sort({ name: 1 });
    return res.status(201).json(languages);
  } catch (err) {
    return res.status(200).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Get a specific language by ID
export const getLanguageById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { languageId } = req.params;

  try {
    const language = await Language.findById(languageId);
    if (language) {
      return res.status(201).json(language);
    } else {
      return res.status(200).json({ message: "Language not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Update a language
export const updateLanguage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { languageId } = req.params;
  const { name, direction } = req.body;

  try {
    const updatedLanguage = await Language.findByIdAndUpdate(
      languageId,
      { name, direction },
      { new: true }
    );
    if (updatedLanguage) {
      return res.status(201).json(updatedLanguage);
    } else {
      return res.status(200).json({ message: "Language not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Delete a language
export const deleteLanguage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { languageId } = req.params;

  try {
    const deletedLanguage = await Language.findByIdAndDelete(languageId);
    if (deletedLanguage) {
      return res.status(201).json({ message: "Language deleted successfully" });
    } else {
      return res.status(200).json({ message: "Language not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Add a post to a language
export const addPostToLanguage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { languageId } = req.params;
  const { postId } = req.body;

  try {
    const updatedLanguage = await Language.findByIdAndUpdate(
      languageId,
      { $addToSet: { posts: postId } },
      { new: true }
    );
    if (updatedLanguage) {
      return res.status(201).json(updatedLanguage);
    } else {
      return res.status(200).json({ message: "Language not found" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};

// Remove a post from a language
export const removePostFromLanguage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { languageId, postId } = req.params;

  try {
    const updatedLanguage = await Language.findByIdAndUpdate(
      languageId,
      { $pull: { posts: postId } },
      { new: true }
    );
    if (updatedLanguage) {
      return res.status(201).json(updatedLanguage);
    } else {
      return res.status(200).json({ message: "Language or post not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};
