/*
 * Copyright 2010 Roman Skabichevsky.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Accesser/setter of user options that may be set in options screen.
 * Also used as a quick access to local storage.
 */

var DATA_OAUTH_TOKEN = "oauth_token";
var DATA_OAUTH_TOKEN_SECRET = "oauth_token_secret";
var DATA_AUTHORIZED = "authorized";
var DATA_PIN_REQUESTED = "pin_requested";

var OPTION_FIRST_RUN = "firstRun";
var OPTION_SHORTEN_LINKS = "alwaysShortenLinks";
var OPTION_USE_TWITTER_TAB = "useExistingTwitterTab";
var OPTION_USE_TWITTER_API = "useTwitterApi";
var OPTION_TWEET_SELECTION = "tweetSelection";

var defaults = {};
defaults[OPTION_FIRST_RUN] = "false";
defaults[OPTION_SHORTEN_LINKS] = "false";
defaults[OPTION_USE_TWITTER_TAB] = "true";
defaults[OPTION_USE_TWITTER_API] = "false";
defaults[OPTION_TWEET_SELECTION] = "true";

function setStringOption(name, value) {
  localStorage[name] = value;
}

function getStringOption(name) {
  var value = localStorage[name];
  if (value === undefined) {
    value = defaults[name];
  }
  return value;
}

function clearOption(name) {
  localStorage.removeItem(name);
}     

function setBooleanOption(name, value) {
  setStringOption(name, value);
}

function getBooleanOption(name) {
  var value = getStringOption(name);
  return value === 'true';
}

function updateCheckboxOption(optionName) {
  document.getElementById(optionName).checked = getBooleanOption(optionName) ? 'checked' : '';
}


// Used only on Options page.
function init() {
  // Report pageview to Google Analytics.
  trackPageView();

  updateCheckboxOption(OPTION_SHORTEN_LINKS);
  updateCheckboxOption(OPTION_USE_TWITTER_TAB);
  updateCheckboxOption(OPTION_TWEET_SELECTION);
  updateCheckboxOption(OPTION_USE_TWITTER_API);
  useTwitterApiChanged();
}

function saveAndClose() {
  setBooleanOption(OPTION_SHORTEN_LINKS, document.getElementById(OPTION_SHORTEN_LINKS).checked);
  setBooleanOption(OPTION_USE_TWITTER_TAB, document.getElementById(OPTION_USE_TWITTER_TAB).checked);
  setBooleanOption(OPTION_TWEET_SELECTION, document.getElementById(OPTION_TWEET_SELECTION).checked);
  setBooleanOption(OPTION_USE_TWITTER_API, document.getElementById(OPTION_USE_TWITTER_API).checked);
  window.close();
}

function useTwitterApiChanged() {
  document.getElementById(OPTION_USE_TWITTER_TAB).disabled = document.getElementById(OPTION_USE_TWITTER_API).checked;
}
