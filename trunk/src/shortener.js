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

// {callback, longUrl}
Shortener.shortenData = {};

BitlyCB.shortenResponse = function(data) {
  var result;
  // Results are keyed by longUrl, so we need to grab the first one.
  for (var r in data.results) {
    result = data.results[r];
    result['longUrl'] = r;
    break;
  }
  var shortUrlResult = result['shortUrl'];
  if (!!shortUrlResult) {
    var shortenedUrl = shortUrlResult.toString();
    Shortener.shortenedCache[result['longUrl']] = shortenedUrl;
    Shortener.shortenData.callback({'status': 'SUCCESS', 'obj': {'shortUrl': shortenedUrl}});
  } else {
    Shortener.shortenData.callback({'status': 'ERROR', 'obj': {'error': 'Shorten error'}});
  }
};

Shortener.shorten = function(url, callback) {
  if (!!Shortener.shortenedCache[url]) {
    callback({'status': 'SUCCESS', 'obj': {'shortUrl': Shortener.shortenedCache[url]}});
  } else {
    Shortener.shortenData.callback = callback;
    BitlyClient.shorten(url, 'BitlyCB.shortenResponse');
  }
};
