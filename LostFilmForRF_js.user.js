// ==UserScript==
// @name        LostFilmForRF
// @namespace   lf4rf
// @include     *www.lostfilm.tv/series/*
// @version     1
// @grant       none
// ==/UserScript==

// seasons
var seasons = document.querySelectorAll('div.series-block > div.serie-block > div.movie-details-block');
for (var i = 0; i < seasons.length; i++) {
  if (seasons[i].querySelector('div.external-btn2') !== null) {
    var btnseasons = seasons[i].querySelector('div.external-btn2');
    if (btnseasons.getAttribute('onclick') === 'copyrightedEpisode()') {
      btnseasons.setAttribute('onclick', 'PlayEpisode(' + btnseasons.nextElementSibling.getAttribute('data-code').replace(/-/g,",") + ',999)');
      btnseasons.setAttribute('class', 'external-btn');
    }
  }
}

var series = document.querySelectorAll('div.series-block tr:not(.not-available)');
for (var i = 0; i < series.length; i++) {
  if (series[i].querySelector('div.external-btn2') !== null) {
    var btnseries = series[i].querySelector('div.external-btn2');
    btnseries.setAttribute('onclick', 'PlayEpisode(' + series[i].querySelector('td.alpha > .haveseen-btn').getAttribute('data-code').replace(/-/g,",") + ')');
    btnseries.setAttribute('class', 'external-btn');
  }
}

// episode
if (document.querySelector('div.overlay-pane > div.external-btn2') !== null) {
  var episode = document.querySelector('div.overlay-pane > div.external-btn2');
  episode.setAttribute('onclick', 'PlayEpisode(' + document.querySelector('div.isawthat-btn').getAttribute('data-code').replace(/-/g,",") + ')');
  episode.setAttribute('class', 'external-btn');
}

// preview
var preview = document.querySelectorAll('table.movie-parts-list tr');
for (var i = 0; i < preview.length; i++) {
  var td = document.createElement('td');
  var div = document.createElement('div');
  td.className = 'zeta';
  div.className = 'external-btn';
  if (preview[i].querySelector('td.alpha > .haveseen-btn').getAttribute('data-code') !== null) {
    div.setAttribute('onclick', 'PlayEpisode(' + preview[i].querySelector('td.alpha > .haveseen-btn').getAttribute('data-code').replace(/-/g,",") + ')');
  }
  else {
    div.className += ' inactive';
  }
  td.appendChild(div);
  if (preview[i].querySelector('td.alpha > .haveseen-btn').getAttribute('onclick') === 'copyrightedEpisode()') {
    document.querySelector('table.movie-parts-list').rows[i].insertBefore(td, document.querySelector('table.movie-parts-list').rows[i].cells[7]);
  }
}