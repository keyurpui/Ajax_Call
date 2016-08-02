/**
 * Created by keyur on 8/1/2016.
 */

(function($) {
    //all functions goes here
    $(function(){

        $("#addStudent").click(function(e){
            e.preventDefault();
            var dataToSend = {
                'id':$("#sId").val(),
                'name':$("#sName").val(),
                'age': $("#sAge").val(),
                'hobbies':$("#sHobbies").val()};
            var URL = "http://localhost:63342/Ajax_Call/newJson.JSON";
            $.ajax({
                url:URL,
                dataType:'JSON',
                'type':'POST',
                'data':JSON.stringify(dataToSend),
                'timeout':1000,
                success:function(data){
                    var list = "";
                    var docs = data.response.docs;
                    for(var i=0; i<docs.length; i++)
                    {
                        list += docs[i].description+"\n";
                    }

                },
                error:function(xhr,errorText, errorThrown){
                    $("#geoData").html(errorText+ ":" +errorThrown);
                }
            });
        });
        var studentData;
        loadstudents();

        function loadstudents() {
            var URL = "http://localhost:63342/Ajax_Call/newJson.JSON";
            $.ajax({
                url: URL,
                dataType: 'JSON',
                'type': 'GET',
                'timeout': 1000,
                success: function (response) {
                    studentData = response;
                    var student = response.student;

                    var list = '';
                    for (var i = 0; i < student.length; i++) {
                        list += "<tr>";
                        list += "<td>" + student[i].id + "</td>";
                        list += "<td>" + student[i].name + "</td>";
                        list += "<td>" + student[i].age + "</td>";
                        list += "<td>" + student[i].hobbies + "</td>";
                        list += "<td><a href='#' class='edit'>edit</a></td> "
                    }
                    list += "</tr></td>";
                    $("#sInfo tbody").append(list);
                    //Add Table Plugins
                    $(".studentTable").DataTable();
                },
                error: function (xhr, errorText, errorThrown) {
                    $("#geoData").html(errorText + ":" + errorThrown);
                }

            });
        }

    });

})(jQuery);


