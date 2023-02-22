$( document ).ready(function() {
  var base_color = "rgb(230,230,230)";
  var active_color = "rgba(254, 97, 72)";
  
  var child = 1;
  var length = $("section").length - 1;
  $("#prev").addClass("disabled");
  $("#submit").addClass("disabled");
  
  $("section").not("section:nth-of-type(1)").hide();
  $("section").not("section:nth-of-type(1)").css('transform','translateX(100px)');
  
  var svgWidth = length * 200 + 24;
  $("#svg_wrap").html(
    '<svg version="1.1" id="svg_form_time" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ' +
      svgWidth +
      ' 24" xml:space="preserve"></svg>'
  );
  
  function makeSVG(tag, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  
  for (i = 0; i < length; i++) {
    var positionX = 12 + i * 200;
    var rect = makeSVG("rect", { x: positionX, y: 9, width: 200, height: 6 });
    document.getElementById("svg_form_time").appendChild(rect);
    // <g><rect x="12" y="9" width="200" height="6"></rect></g>'
    var circle = makeSVG("circle", {
      cx: positionX,
      cy: 12,
      r: 12,
      width: positionX,
      height: 6
    });
    document.getElementById("svg_form_time").appendChild(circle);
  }
  
  var circle = makeSVG("circle", {
    cx: positionX + 200,
    cy: 12,
    r: 12,
    width: positionX,
    height: 6
  });
  document.getElementById("svg_form_time").appendChild(circle);
  
  $('#svg_form_time rect').css('fill',base_color);
  $('#svg_form_time circle').css('fill',base_color);
  $("circle:nth-of-type(1)").css("fill", active_color);
  
  /* function validate(){
    let valid = true;
    let section = document.getElementById("dp")
    if(section){
      let input = section.getElementsByTagName("input");
      for(let i=0; i<input.length; i++){
        if(input[i].value == ""){
          if(input[i].type == "email"){
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (input[i].value.match(validRegex)) {
              valid = true;
            }
            else {
              input[i].className += " invalid";
              input[i].placeholder = "* NO ES UN EMAIL VALIDO *";
              valid = false;
            }
          }
          if(input[i].type == "number"){ 
            number = Number(input[i].value);
            if(isNaN(number.value)){
              input[i].className += " invalid";
              input[i].placeholder = "* RELLENE LOS CAMPOS CON NUMEROS *";
              valid = false;
            }
          }
          if(input[i].type == "text"){
            input[i].className += " invalid";
            input[i].placeholder = "* RELLENE LOS CAMPOS *";
            valid = false;
          }
        }
        if(input[i].type == "checkbox"){
          if(($('input[type=checkbox]:checked').length === 0) || ($('input[type=checkbox]:checked').length === 2)){
            console.log("no seleccionado")
            document.getElementById("error").innerHTML = "** DEBE SELECCIONAR UNO **";
            valid = false;
          }
          else {
            console.log("seleccionado")
          }
        }
      }
      if(valid){
          return valid;
      }
    }
  } */
  /* const multiStepForm = document.querySelector("[data-multi-step]");
  const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
  let currentStep = formSteps.findIndex( step => {
      return step.classList.contains("active")
  })
  
  if (currentStep < 0) {
    currentStep = 0;
    showCurrentStep();
  }
  
  multiStepForm.addEventListener("click", e => {
    let incrementor;
    if (e.target.matches("[data-next]")) {
      incrementor = 1
    } else if (e.target.matches("[data-previous]")) {
      incrementor = -1
    }
    if(incrementor == null) return
  
    const inputs = [...formSteps[currentStep].querySelectorAll("input")];
    const allValid = inputs.every(input => input.reportValidity());
    console.log(allValid)
    if (allValid){
      currentStep += incrementor;
      showCurrentStep();
    }
  })
  
  function showCurrentStep (){
    formSteps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
    })
  } */
  
  const multiStepForm = document.querySelector("[data-multi-step]");
  const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
  let currentStep = formSteps.findIndex( step => {
    return step.classList.contains("active")
  })
  currentStep = 0;
  
  function validate(currentStep){
    let inputs = [...formSteps[currentStep].querySelectorAll("input")];
    let allValid = inputs.every(input => input.reportValidity());
    if(allValid){
      return true;
    }
    console.log(inputs.length)
    for(let i=0; i<inputs.length ; i++) {
      if(($('input[type=checkbox]:checked').length === 0)){
        document.getElementById("error").innerHTML = "** DEBE SELECCIONAR UNO **";
        setTimeout(()=>{ document.getElementById("error").innerHTML = "";},2000);
      }
    }
  }
  
  $(".button").click(function () {
    $("#svg_form_time rect").css("fill", active_color);
    $("#svg_form_time circle").css("fill", active_color);
    var id = $(this).attr("id");
    if (id == "next") {
      if(child === 1){
        console.log("case 0 " + child)
        currentStep = 0;
        if(validate(currentStep)){
          $("#prev").removeClass("disabled");
          if (child >= length) {
            $(this).addClass("disabled");
            $('#submit').removeClass("disabled");
          }
          if (child <= length) {
            child++;
          }
        }
      }
      else if (child === 2){
        console.log("case 1 " + child)
        currentStep = 1;
        if(validate(currentStep)){
          $("#prev").removeClass("disabled");
          if (child >= length) {
            $(this).addClass("disabled");
            $('#submit').removeClass("disabled");
          }
          if (child <= length) {
            child++;
          }
        }
      }
      else if (child === 3){
        currentStep = 2;
        console.log("case 2 " + child)
        if(validate(currentStep)){
          $("#prev").removeClass("disabled");
          if (child >= length) {
            $(this).addClass("disabled");
            $('#submit').removeClass("disabled");
          }
          if (child <= length) {
            child++;
          }
        }
      }
      else if (child === 4){
        currentStep = 3;
        console.log("case 2 " + child)
        if(validate(currentStep)){
          $("#prev").removeClass("disabled");
          if (child >= length) {
            $(this).addClass("disabled");
            $('#submit').removeClass("disabled");
          }
          if (child <= length) {
            child++;
          }
        }
      }
  
    } else if (id == "prev") {
      $("#next").removeClass("disabled");
      $('#submit').addClass("disabled");
      if (child <= 2) {
        $(this).addClass("disabled");
      }
      if (child > 1) {
        child--;
      }
    }
    var circle_child = child + 1;
    $("#svg_form_time rect:nth-of-type(n + " + child + ")").css(
      "fill",
      base_color
    );
    $("#svg_form_time circle:nth-of-type(n + " + circle_child + ")").css(
      "fill",
      base_color
    );
    var currentSection = $("section:nth-of-type(" + child + ")");
    currentSection.fadeIn();
    currentSection.css('transform','translateX(0)');
   currentSection.prevAll('section').css('transform','translateX(-100px)');
    currentSection.nextAll('section').css('transform','translateX(100px)');
    $('section').not(currentSection).hide();
  });
  
  });