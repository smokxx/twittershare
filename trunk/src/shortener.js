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
 * Bit.ly shortener helper.
 */

var Shortener = {};

// Cache for shortened earlier URLs (map longUrl->shortUrl).
Shortener.shortenedCache = [];

Shortener.shorten = function(url, callback) {
  if (!!Shortener.shortenedCache[url]) {
    callback({'status': 'SUCCESS', 'obj': {'shortUrl': Shortener.shortenedCache[url]}});
  } else {
    var login = getStringOption(OPTION_BITLY_LOGIN) || "twittershare";
    var apiKey = getStringOption(OPTION_BITLY_KEY) || "R_211fd6da0432008dc0f4a7cdbec19f91";
    $.getJSON("https://api-ssl.bitly.com/v3/shorten?callback=?",
        { "format": "json", "apiKey": apiKey, "login": login, "longUrl": url },
        function(response) {
          if (response.status_code == 200) {
            Shortener.shortenedCache[url] = response.data.url;
            callback({'status': 'SUCCESS', 'obj': {'shortUrl': response.data.url}});
          } else {
            callback({'status': 'ERROR', 'obj': {'error': 'Shorten error, status code: ' + response.status_code}});
          }
        }
    );
  }
};
