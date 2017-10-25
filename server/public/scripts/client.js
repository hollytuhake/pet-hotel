$(document).ready(readyNow);
//     var pet = {
//         name:terry
// }
function readyNow() {
    console.log('js and jq sourced');
    getOwners();
    getPets();
    $('#ownerReg').on('click', addOwner);
    $('.table').on('click', '#checkInBtn', checkOutFunction);

    //click handlers.



}
function addOwner() {

    var firstIn = $('#ownerFirstNameIn').val();
    var lastIn = $('#ownerLastName').val();
    var owner = {
        first: firstIn,
        last: lastIn
    }
    
    sendOwner(owner)


    
}


//GET ROUTES -- get owners for DOM
function getOwners() { //getting List data append in done
    console.log('in getOwners');
    // ajax call to server to get List
    $.ajax({
        method: 'GET',
        url: '/hotel/owner',
    }).done(function (response) {
        console.log('response', response);
        var ownerList = response;
        appendOwners(ownerList);
    }).fail(function (error) {
        alert('something went wrong in getOwners', error);
    });//end of fail
} //end of getTables

function appendOwners(array) {
    for (var i = 0; i < array.length; i++) {
        var owner = array[i];
        var $dropDown = $("#ownerDropDown").append('<option value="data-id= ">' + owner.firstname + owner.lastname + '</option>');
    }
    console.log('owner');
    
};

//get pets for DOM
function getPets() {
    console.log('in getPets');
    $.ajax({
        method: 'GET',
        url: '/hotel/pet'
    }).done(function (response) {
        console.log(response);
        var completeList = response
        //append here
    }).fail(function (error) {
        alert('something went wront in getPets', error)
    });//end of fail
}//end of getPets

//POST ROUTES
function sendOwner(owner) {
    console.log('in sendOwner');
    $.ajax({
        method: "POST",
        url: '/hotel/owner',
        data: owner
    }).done(function (response) {
        console.log(response);
        getOwners();
    }).fail(function (error) {//end of done
        alert('something went wrong in sendOwner', error)
    })//end of fail
}//end of send owner

function sendPet() {
    console.log('In sendPet');
    $.ajax({
        method: 'POST',
        url: '/hotel/pet',
        Data: pet
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        alert('something went wrong in sendPet', error)
    })
}

//PUT ROUTES

<<<<<<< HEAD
function inOut() {
    console.log('in inOut');
    $.ajax({
        method: 'PUT',
        url: 'hotel/inOut/:id',
=======
function Out(date){
    console.log('in inOut');
    $.ajax({
        method: 'PUT',
        url:'hotel/inOut/' + id,
>>>>>>> create-checkout-function
        data: check
    }).done(function (response) {
        console.log(response);
    }).fail(function (response) {
        alert('something wrong in inOut')
    })
}

function editItem() {
    console.log('in edit item');
    $.ajax({
        method: 'PUT',
        url: 'hotel/editItem/:id',
        data: changePet
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        alert('something wrong in editItem');
    })//end of fail
}// end of editingItem

// DELETE ROUTES

function deletePet() {
    console.log('in deletePet');
    $.ajax({
        method: 'DELETE',
        url: 'hotel/deletePet/:id'
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        alert('something wrong in deletePet');
    })//end of fail
}//end deletePet

function checkOutFunction(){
  var checkDate = Date.now()
  var id = $(this).closest('tr').data() // Need to figure out what this data will be called.
  var outObject = {checkDate}
  console.log(checkDate);
  inOut(outObject);
}