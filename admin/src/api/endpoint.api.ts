// This file contains all the API endpoints used in the application.

//Base URL
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// news
export const GET_NEWS_ALL = "/api/news/all";
export const CREATE_NEWS = "/api/news";
export const UPDATE_NEWS = "/api/news/";
export const DELETE_NEWS = "/api/news/";

// Category
export const CATEGORY_ZODIAC_ID = "e62b08e2-4ae8-42de-a96f-2fef94eff5a0";
export const CATEGORY_SEEMSEE_ID = "957ebdfc-97fd-4d2d-89ff-edff1f4fdb1e";
export const CATEGORY_TAROT_ID = "23835c08-883d-4672-828c-1cdd2540d0fc";
export const CATEGORY_CURSED_ID = "b596de94-876f-42f5-bfd0-09007aa11bfd";

export const CATEGORY = "/api/category/";

// Item
export const CREATE_ITEM = "/api/item/";
export const DELETE_ITEM = "/api/item/";
export const UPDATE_ITEM = "/api/item/";

// Auth
export const LOGIN = "/api/login";
export const LOGOUT = "/api/logout";
export const ADMIN = "/api/current-admin";
