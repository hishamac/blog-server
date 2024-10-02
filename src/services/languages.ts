import Language, { ILanguage, LanguageDirection } from '../models/Language';
import { Document } from 'mongoose';

// Create a new language
export const createLanguage = async (name: string, direction: LanguageDirection): Promise<ILanguage> => {
  const language = new Language({
    name,
    direction,
    posts: []
  });

  return await language.save();
};

// Get all languages
export const getAllLanguages = async (): Promise<ILanguage[]> => {
  return await Language.find().sort({ name: 1 });
};

// Get a specific language by ID
export const getLanguageById = async (languageId: string): Promise<ILanguage | null> => {
  return await Language.findById(languageId);
};

// Update a language
export const updateLanguage = async (
  languageId: string, 
  name: string, 
  direction: LanguageDirection
): Promise<ILanguage | null> => {
  return await Language.findByIdAndUpdate(
    languageId,
    { name, direction },
    { new: true }
  );
};

// Delete a language
export const deleteLanguage = async (languageId: string): Promise<Document | null> => {
  return await Language.findByIdAndDelete(languageId);
};

// Add a post to a language
export const addPostToLanguage = async (languageId: string, postId: string): Promise<ILanguage | null> => {
  return await Language.findByIdAndUpdate(
    languageId,
    { $addToSet: { posts: postId } },
    { new: true }
  );
};

// Remove a post from a language
export const removePostFromLanguage = async (languageId: string, postId: string): Promise<ILanguage | null> => {
  return await Language.findByIdAndUpdate(
    languageId,
    { $pull: { posts: postId } },
    { new: true }
  );
};