var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyoOh8hESK8Y7saC' }).base('appn6eQqc5benb9zZ');
var deleteArtist = function(record) {
    record.destroy(function(err) {
        if (err) {
            console.log('Error destroying ', recordId, err);
        } else {
            console.log('Destroyed ', record.getId());
            $('div[data-record-id="'+record.getId()+'"]').remove();
        }
    });
};
// var updateArtist = function(recordId, recordData, opts, done) {
//         var record = new Record(this, recordId);
//         if (!done) {
//             done = opts;
//             record.patchUpdate(recordData, done);
//         } else {
//             record.patchUpdate(recordData, opts, done);
//         }
//     }

order_desk_data = []
var loadArtists = function() {
    $('#artists').empty();
    base('Order Desk').select({
        sort: [
            {field: 'Final PO Lookup', direction: 'desc'}
        ]
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            var dict = {};
            dict['Key'] = record.getId();
            dict['Info'] = record.get('Info');
            dict['Image']=record.get('ID Image URL');
            dict['Order QTY']=record.get('Order Quantity');
            dict['Recieved QTY']=record.get('RQ (Standard Units)');
            order_desk_data.push(dict);
        });
        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
};
console.log(order_desk_data);
// $('#create').click(function(){
//     base('Artists').create({
//         "Name": "Al Held",
//         "Bio": "Al Held began his painting career by exhibiting Abstract Expressionist works in New York; he later turned to hard-edged geometric paintings that were ...",
//         "Genre": [
//             "American Abstract Expressionism",
//             "Color Field"
//         ],
//         "On Display?": true
//     }, function(err, record) {
//         if (err) { console.log(err); return; }
//         loadArtists();
//     });
// });
loadArtists();