// Select the submit button
var data_po = data;
var submit = d3.select("#submit");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#patient-form-input");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  console.log(inputValue);

  // clear the input value
  d3.select("#patient-form-input").node().value = "";


  var filteredData = data_po.filter(data_po=> data_po.ID === parseInt(inputValue));
  var PO_KEY = filteredData[0]['Key']
  var report_url = filteredData[0]['Report']
  console.log(PO_KEY);

  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'keyoOh8hESK8Y7saC'}).base('appn6eQqc5benb9zZ');

  base('Purchase Orders').find(PO_KEY, function(err, record) {
    if (err) { console.error(err); 
    var $artistInfo = $('<div class = "card-body">');
    $artistInfo.append($('<h3 class="card-title">').text(`PO Not Available`));}
    console.log(record);
    var $artistInfo = $('<div class = "card-body">');
    $artistInfo.append($('<h3 class="card-title">').text(`${record.get('ID')}`));
    $artistInfo.append($('<p>').text(`Status: ${record.get('Status')}`));
    $artistInfo.append($('<p>').text(`Vendor: ${record.get('Vendor Name')}`));
    $artistInfo.append($('<p>').text(record.get('Order Date')));
    var OrderDesk = record.get('Order Desk Text');
    var Order_Split = OrderDesk.split(",");
    var i;
    for (i = 0; i < Order_Split.length; i++) { 
    $artistInfo.append($('<li>').text(Order_Split[i]));
    };
    $artistInfo.append($('<p>').text(`Notes: ${record.get('Note')}`));
    $artistInfo.append($('<p>').text(`Projects: ${record.get('Projects')}`));
    $artistInfo.append($(`<h3><a href=${report_url} target="_blank">PO Link</a>`))
    
    

    // var x = $('<button class="btn btn-dark">').text('Delete').click(function() {
    //     deleteArtist(record);
    // });
    // $artistInfo.append(x)
    $artistInfo.attr('id', 'artists');
    $('#artists').append($artistInfo);
});
});