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


var loadArtists = function() {
    $('#artists').empty();
    base('Purchase Orders').select({
        sort: [
            {field: 'ID', direction: 'desc'}
        ]
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('ID'));
            var $artistInfo = $('<div>');
            $artistInfo.append($('<h3>').text(`${record.get('ID')}`));
            $artistInfo.append($('<p>').text(`Status: ${record.get('Status')}`));
            $artistInfo.append($('<p>').text(`Vendor: ${record.get('Vendor Name')}`));
            $artistInfo.append($('<p>').text(record.get('Order Date')));
            var OrderDesk = record.get('Order Desk Text');
            var Order_Split = OrderDesk.split(",");
            var i;
            for (i = 0; i < Order_Split.length; i++) { 
            $artistInfo.append($('<li>').text(Order_Split[i]));
            };
            console.log('split',Order_Split[0]);
            $artistInfo.append($('<p>').text(`Notes: ${record.get('Note')}`));
            $artistInfo.append($('<p>').text(`Projects: ${record.get('Projects')}`));
            var x = $('<button>').text('Delete').click(function() {
                deleteArtist(record);
            });
            $artistInfo.append(x)
            $artistInfo.attr('data-record-id', record.getId());
            $('#artists').append($artistInfo);
        });
        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
};

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