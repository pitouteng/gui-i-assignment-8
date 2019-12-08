// name: Pitou Teng
// email: pitou_teng@student.uml.edu
// gui i - a7

var minVal = -12;
var maxVal = 12;
var rangeMessage = "Please enter a value in range " + minVal + " to " + maxVal;
var mult_table;

function validate() {
  // using validation plug
  $("#myForm").validate({
  // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      first_box_multiplier: {
        required: true,
        number: true,
        min: minVal,
        max: maxVal
      },
      sec_box_multiplier: {
        required: true,
        number: true,
        min: minVal,
        max: maxVal
      },
      first_box_multiplicand: {
        required: true,
        number: true,
        min: minVal,
        max: maxVal
      },
      sec_box_multiplicand: {
        required: true,
        number: true,
        min: minVal,
        max: maxVal
      }
    },
  // Specify validation error messages
    messages:{
      first_box_multiplier:{
        min: rangeMessage,
        max: rangeMessage
      },
      sec_box_multiplier:{
        min: rangeMessage,
        max: rangeMessage
      },
      first_box_multiplicand:{
        min: rangeMessage,
        max: rangeMessage
      },
      sec_box_multiplicand:{
        min: rangeMessage,
        max: rangeMessage
      }
    }
  });
}

// function to setting and event handling slider
function slider() {
  // sliding changes the value of input box and update multiplication table
  $("#slider1").slider({
    animate: true,
    min: -12,
    max: 12,
    slide: function(event, ui) {
      $("input[name=first_box_multiplier]").val(ui.value);
      if($("#myForm").valid()) {
        generate_table();
        $( "#tabs" ).tabs("option", "active", 0);
      }
    }
  });
  // double binding
  $("input[name=first_box_multiplier]").keyup(function() {
    $("#slider1").slider("value", $(this).val());
    if($("#myForm").valid()) {
      generate_table();
      $( "#tabs" ).tabs("option", "active", 0);
    }
  });

// for second input box and slider
  $("#slider2").slider({
    animate: true,
    min: -12,
    max: 12,
    slide: function(event, ui) {
        $("input[name=sec_box_multiplier]").val(ui.value);
        if($("#myForm").valid()){
          generate_table();
          $( "#tabs" ).tabs("option", "active", 0);
        }
      }
  }) ;
  $("input[name=sec_box_multiplier]").keyup(function() {
      $("#slider2").slider("value", $(this).val());
      if($("#myForm").valid()) {
        generate_table();
        $( "#tabs" ).tabs("option", "active", 0);
      }
  });

  // for third input box and slider
  $("#slider3").slider({
    animate: true,
    min: -12,
    max: 12,
    slide: function(event, ui) {
      $("input[name=first_box_multiplicand]").val(ui.value);
      if($("#myForm").valid()) {
        generate_table();
        $( "#tabs" ).tabs("option", "active", 0);
      }
    }
  }) ;
  $("input[name=first_box_multiplicand]").keyup(function() {
      $("#slider3").slider("value", $(this).val());
      if($("#myForm").valid()){
        generate_table();
        $( "#tabs" ).tabs("option", "active", 0);
      }
  });

  // for fouth input box and slider
  $("#slider4").slider({
    animate: true,
    min: -12,
    max: 12,
    slide: function(event, ui) {
      $("input[name=sec_box_multiplicand]").val(ui.value);
      if($("#myForm").valid()){
        generate_table();
        $( "#tabs" ).tabs("option", "active", 0);
      }

    }
  }) ;
  $("input[name=sec_box_multiplicand]").keyup(function() {
      $("#slider4").slider("value", $(this).val());
      if($("#myForm").valid()){
        generate_table();
        $( "#tabs" ).tabs("option", "active", 0);
      }
  });
}

// set up table and create new tab when saving
function tabs() {
  $("#tabs").tabs();
  $("#save").click(function() {
    if($("#myForm").valid()) {
      // get variable to give new tab a name
      var num1 = $("input[name=first_box_multiplier]").val();
      var num2 = $("input[name=sec_box_multiplier]").val();
      var num3 = $("input[name=first_box_multiplicand]").val();
      var num4 = $("input[name=sec_box_multiplicand]").val();
      tab_name = num1 + " to " + num2 + " by " + num3 + " to " + num4;
      // increase the tab count by one
      var num_tabs = $("div#tabs ul li").length + 1;

      // adding content
      $("div#tabs ul").append(
          "<li><a href='#tab" + num_tabs + "'>" + tab_name + "</a> <span class=\"ui-icon ui-icon-close\" role=\"presentation\">Remove Tab</span> </li>"
      );
      $("div#tabs").append(
          "<div id='tab" + num_tabs + "'></div>"
      );
      // change table id to so the previously saved table won't get removed when new table is created
      $("#generatedTable").attr("id", "generatedTable" + num_tabs);

      $("div#tab"+num_tabs).append(mult_table);
      generate_table();
      $("div#currenTab").append(mult_table);
      $("#tabs").tabs("refresh");
      $( "#tabs" ).tabs("option", "active", -1);
    }
  });

  // add the remove tab button
  $( "#tabs" ).tabs().on( "click", "span.ui-icon-close", function() {
    var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    $("#tabs").tabs("refresh");
  });

}


function generate_table() {
  // remove old table if there is one
  old_table = document.getElementById('generatedTable');
  if(old_table){
    old_table.parentNode.removeChild(old_table);
  }
  var table = document.createElement('table');
  table.setAttribute('id', 'generatedTable');

  // get value from form
  var first_box_plier = Number(document.getElementsByName('first_box_multiplier')[0].value);
  var sec_box_plier = Number(document.getElementsByName('sec_box_multiplier')[0].value);
  var first_box_cand = Number(document.getElementsByName('first_box_multiplicand')[0].value);
  var sec_box_cand = Number(document.getElementsByName('sec_box_multiplicand')[0].value);

  // allow reverse range when entering number
  init_plier = Math.min(first_box_plier, sec_box_plier);
  end_plier = Math.max(first_box_plier, sec_box_plier);
  init_cand = Math.min(first_box_cand, sec_box_cand);
  end_cand = Math.max(first_box_cand, sec_box_cand);


  // create first row table header
  var tr = document.createElement('tr');
  var th = document.createElement('th');
  th.appendChild(document.createTextNode(''));
  tr.appendChild(th);
  for (var i = init_plier; i <= end_plier; i++) {
    tr.appendChild(create_table_box(i, 'th'));
  }
  table.appendChild(tr);


  for (var j = init_cand; j <= end_cand; j++) {
    // create column table header
    var tr = document.createElement('tr');
    tr.appendChild(create_table_box(j, 'th'));
    for (var i = init_plier; i <= end_plier; i++) {
      // fill in products
      var value = j * i;
      tr.appendChild(create_table_box(value, 'td'));
    }

    // add class to achieve check pattern with css rule associated to the class
    if (j%2 == 0)
      tr.classList.add('oddRow');
    else
      tr.classList.add('evenRow');

    table.appendChild(tr);
  }
  // save the table globally so the it can added to another tab when save button is clicked
  mult_table = table;
  // add the table to the currentTab
  $("#currentTab").html(mult_table);

}

// function for creating each box
function create_table_box(text, type) {
  var v = document.createElement(type);
  v.appendChild(document.createTextNode(text))
  v.style.padding = "10px";
  return v
}
