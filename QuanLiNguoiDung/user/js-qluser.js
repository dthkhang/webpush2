var HOST = "https://627dc59db75a25d3f3ab7c94.mockapi.io"
var USER = "user"
class Student {
    constructor(name, username, password, role) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.role = role;
    }
}
var arrEle;
var loop = $(".search-icon");
        loop.click(function(id) {
            var value = $("#search").val();
            var id = $("#.txtId");
            console.log(id);
            console.log(value);
        })
        function loadData() {
            $(".table tbody").empty();
            //Sau khi update xong thi xoa thanh phan cu~ tren HTML
            $.ajax({
            url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user",
            type: "GET",
            dataType: "json",
            success: function(data) {
                arrEle = data;
                let emptyStr = '';
                for(let i=0 ; i<data.length ; i++){
                    let edit = `<button class="feature" id="edit" onclick=edit(${data[i].id}) type="button"><i class="fa-solid fa-pen-to-square"></i></button>`;
                    let remove = `<button class="feature" id="remove" type="button" onclick=remove(${data[i].id})><i class="fa-solid fa-trash-can"></i></button>`;
                    let strTemp = "<tr> <th scope='row'>" + data[i].id + "</th>"
                        + "<td class='border'>" + data[i].name + "</td>"
                        + "<td class='border'>" + data[i].username + "</td>"
                        + "<td class='border'>" + data[i].password+ "</td>"
                        + "<td class='border'>" + data[i].role + "</td>"
                        + "<td class='border'>" + edit + remove + "</td> </tr>";
                        emptyStr += strTemp;
                }
                $(".table tbody").append(emptyStr); //append : mở rộng 
                }
            });
        }
        loadData();
$("#add").click(function(){
    $(".addModal").show();
})
$(".addCancel").click(function(){
    $(".addModal").hide();
})
// add user
let role = "";
$(document).ready(function () {
    $("#addSuccess").click(function(){
        let name = $(".nameModal").val();
        let username = $(".userModal").val();
        let pass = $(".passModal").val();
        let role = $("#inputGroupSelect01").val();
        let newStudent = new Student(name, username, pass, role)
        $.ajax({
          url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user",
          type: "POST",
          data: newStudent,
          success: function(result) {
            alert("Them User thanh cong!");
            loadData();
            $(".addModal").hide()
            }
        })
    });
});
// -------
// edit user
$(".editCancel").click(function(){
    $(".editModal").hide()
})
$("#editSuccess").click(function(){
    var obj = {};
    var id = $(".txtId").val();
    obj.name = $(".editModal .nameEdit").val();
    obj.username = $(".editModal .userEdit").val();
    obj.password = $(".editModal .passEdit").val()
    console.log(obj)
    $.ajax({
        url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user/" + id,
        type: "PUT",
        data: obj,
        success:function(result){
            $(".editModal").hide()
            loadData();
        }
    })
})
function edit(id){
    for(let i = 0; i<arrEle.length;i++){
        if(arrEle[i].id == id){
            $(".editModal").show();
            $(".txtId").val(arrEle[i].id);
            $(".editModal .nameEdit").val(arrEle[i].name)
            $(".editModal .userEdit").val(arrEle[i].username)
            $(".editModal .passEdit").val(arrEle[i].password)
            break;
        }
    }
};
// ----------
// remove user
function remove(id){
    $.ajax({
        url: "https://627dc59db75a25d3f3ab7c94.mockapi.io/user/" + id,
        type: "DELETE",
        success: function() {
            alert("Ban muon xoa User nay?")
            loadData();
        }
    })
};
