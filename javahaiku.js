#!/usr/bin/env node

/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var events = require('events');
var fs = require('fs');
var sys = require('sys');

var CMUDict = require('cmudict').CMUDict;
var cmudict = new CMUDict();

var fives = [];
var sevens = [];

var files = fs.readdirSync('./java')
files.forEach(function(filename) {
  if (!filename.match(/.java$/)) {
    return;
  }
  var data = fs.readFileSync('./java/'+filename);
  var classes = data.toString().match(/class [a-zA-Z]+ /);
  if (!classes) { return; } 
  classes.forEach(function(x) {
    var classname = x.split(' ')[1];
    var split = classname.match(/[A-Z][a-z]+/g);
    if (!split) { return; }
    var sc = 0;
    var bad = false;
    split.forEach(function(w) {
      var phos = cmudict.get(w);
      if (!phos) { bad = true; return; }
      phos.split(' ').forEach(function(p) {
        if (p.match(/^[AEIOU]/)) {
          sc += 1;
        }
      });
    });
    if (bad) { return; }
    if (sc === 5) {
      fives.push(classname);
    } else if (sc === 7) {
      sevens.push(classname);
    }
   });
});

var five_index_one = Math.floor(Math.random() * fives.length+1);
var seven_index = Math.floor(Math.random() * sevens.length+1);
var five_index_two = Math.floor(Math.random() * fives.length+1);

console.log(fives[five_index_one]);
console.log(sevens[seven_index]);
console.log(fives[five_index_two]);
