#!/usr/bin/env node

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



