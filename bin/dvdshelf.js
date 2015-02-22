#!/usr/bin/env node

var file = process.argv[1];

var data = require( file )
  //, fields = data.fields.field
  //, items = data.items.item
  ;
/*
items.forEach( function( item ) {
    console.log( item.id, item.data.datum[0].value );
});
*/
console.log( data );
