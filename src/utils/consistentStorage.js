import { getObjectStringName } from './object';

function setLocalStorage(key, value) {
  const name = getObjectStringName(value);

  if (name === '[object String]') localStorage.setItem(key, value);
  else localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

// ===== ACCESS_TOKEN_KEY =====
// Save access token to localStorage
const ACCESS_TOKEN_KEY = 'accessToken';
export function saveAccessToken(accessToken) {
  setLocalStorage(ACCESS_TOKEN_KEY, accessToken);
}

// Get access token in localStorage
export function readAccessToken() {
  return getLocalStorage(ACCESS_TOKEN_KEY);
}

// ===== REFRESH_TOKEN_KEY =====
// Save access token to localStorage
const REFRESH_TOKEN_KEY = 'refreshToken';
export function saveRefreshToken(refreshToken) {
  setLocalStorage(REFRESH_TOKEN_KEY, refreshToken);
}

// Get access token in localStorage
export function readRefreshToken() {
  return getLocalStorage(REFRESH_TOKEN_KEY);
}

// ===== TOKEN_LIFETIME_KEY =====
// Save access token to localStorage
const TOKEN_LIFETIME_KEY = 'tokenLifeTime';
export function saveTokenLifeTime(tokenLifeTime) {
  setLocalStorage(TOKEN_LIFETIME_KEY, tokenLifeTime);
}

// Get access token in localStorage
export function readTokenLifeTime() {
  return getLocalStorage(TOKEN_LIFETIME_KEY);
}

// ===== ISREMEMBER =====
// Save ISREMEMBER to localStorage
const REMEMBER = 'rememberMe';
export function saveRememberMe(rememberMe) {
  setLocalStorage(REMEMBER, rememberMe);
}

// Get ISREMEMBER in localStorage
export function readRememberMe() {
  return getLocalStorage(REMEMBER);
}

// ===== LOGIN_SUCCESS =====
// Save loginSuccess to localStorage
const LOGIN_SUCCESS = 'loginSuccess';
export async function saveLoginSuccess(login) {
  setLocalStorage(LOGIN_SUCCESS, login);
}
export function readLoginSuccess() {
  return JSON.parse(getLocalStorage(LOGIN_SUCCESS)) || {};
}

// ===== PROFILE =====
// Save userProfile to localStorage
const USER_PROFILE = 'userProfile';
export async function saveUserProfile(profile) {
  setLocalStorage(USER_PROFILE, profile);
}
export function readUserProfile() {
  return JSON.parse(getLocalStorage(USER_PROFILE)) || {};
}

// ===== FULLNAME =====
// Save FULLNAME to localStorage
const FULLNAME = 'fullName';
export function saveFullname(fullName) {
  setLocalStorage(FULLNAME, fullName);
}
// Get fullname in localStorage
export function readFullName() {
  return getLocalStorage(FULLNAME);
}

// ===== USER_ID =====
// Save USER_ID to localStorage
const USER_ID = 'userId';
export function saveUserId(userId) {
  setLocalStorage(USER_ID, userId);
}
// Get refresh token in localStorage
export function readUserId() {
  return getLocalStorage(USER_ID);
}

// ===== EMAIL =====
// Save EMAIL to localStorage
const EMAIL = 'email';
export function saveEmail(email) {
  setLocalStorage(EMAIL, email);
}
// Get refresh token in localStorage
export function readEmail() {
  return getLocalStorage(EMAIL);
}

// ===== PHONE_NUMBER =====
// Save PHONE_NUMBER to localStorage
const PHONE_NUMBER = 'phoneNumber';
export function savePhoneNumber(phoneNumber) {
  setLocalStorage(PHONE_NUMBER, phoneNumber);
}
// Get refresh token in localStorage
export function readPhoneNumber() {
  return getLocalStorage(PHONE_NUMBER);
}

// Remove all localStorage
export function clearAllStorage() {
  // Keep i18nextLng
  Object.keys(localStorage).forEach((key) => {
    localStorage.removeItem(key);
  });
}
