//Load Data in Table when documents is ready
$(document).ready(function () {
    load();
});

// load All
function load() {
    $.ajax({
        url: "/Admin/All",
        type: "GET",
        success: function (result) {
            $('#tbody').html(result);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function
function Create() {

    var res = validate();
    if (res == false) {
        return false;
    }

    var formData = new FormData();
    var file = document.getElementById("fileInput").files[0];
    formData.append("fileInput", file);

    $.ajax({
        url: "/Admin/SaveFilePath",
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,
        success: function (res) {
            if (res != "") {
                var Obj = {
                    id: $('#id').val(),
                    Price: $('#Price').val(),
                    Count: $('#Count').val(),
                    Name: $('#Name').val(),
                    SrcImg: res
                };

                $.ajax({
                    url: "/Admin/Create",
                    data: JSON.stringify(Obj),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        load();
                        $('#myModal').modal('hide');
                    },
                    error: function (errormessage) {
                        alert(errormessage.responseText);
                    }
                });
            }
        }
    })
}

        //Function for getting the Data Based upon  ID
    function Details(id) {
        clearTextBox();
        $.ajax({
            url: "/Admin/Details/" + id,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#id').val(result.id);
                $('#Price').val(result.Price);
                $('#Count').val(result.Count);
                $('#Name').val(result.Name);
                $('#SrcImg').val(result.SrcImg);
                $("#SrcImg").attr("src", "/images/" + result.SrcImg);
                $("#SrcImg").css({ height: "50%", width: "auto" });
                $('#myModal').modal('show');
                $('#btnUpdate').show();
                $('#btnAdd').hide();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
        return false;
    }

    //function for updating  record
    function Update() {

        var res = validate();

        if (res == false) {
            return false;
        }

        var formData = new FormData();
        var file = document.getElementById("fileInput").files[0];
        formData.append("fileInput", file);

        $.ajax({
            url: "/Admin/SaveFilePath",
            data: formData,
            type: "POST",
            contentType: false,
            processData: false,
            success: function (res) {
                if (res != "") {

                    var Obj = {
                        id: $('#id').val(),
                        Price: $('#Price').val(),
                        Count: $('#Count').val(),
                        Name: $('#Name').val(),
                        SrcImg: res
                    };
                    console.log(Obj);
                    $.ajax({
                        url: "/Admin/Edit",
                        data: JSON.stringify(Obj),
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            load();
                            $('#myModal').modal('hide');
                            $('#id').val(""),
                            $('#Price').val(""),
                            $('#Count').val(""),
                            $('#Name').val(""),
                            $('#SrcImg').val("")
                        },
                    })
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        })
    }

    //function for deleting record
    function Delele(ID) {

        var ans = confirm("Are you sure you want to delete?");
        if (ans) {

            $.ajax({
                url: "/Admin/Delete/" + ID,
                type: "POST",
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (result) {
                    load();
                },
                error: function (errormessage) {
                    alert(errormessage.responseText);
                }
            });
        }
    }

    //Function for clearing the textboxes
    function clearTextBox() {
        $('#id').val("");
        $('#Price').val("");
        $('#Count').val("");
        $('#Name').val("");
        $('#SrcImg').val("");
        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#NameTraining').css('border-color', 'lightgrey');
        $('#DescrTraining').css('border-color', 'lightgrey');
    }

    //Valdidation
    function validate() {
        var isValid = true;
        if ($('#Price').val().trim() == "") {
            $('#Price').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Price').css('border-color', 'lightgrey');
        }
        if ($('#Count').val().trim() == "") {
            $('#Count').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Count').css('border-color', 'lightgrey');
        }
        if ($('#Name').val().trim() == "") {
            $('#Name').css('border-color', 'Red');
            isValid = false;
        }
        else {
            $('#Name').css('border-color', 'lightgrey');
        }
        return isValid;
    }