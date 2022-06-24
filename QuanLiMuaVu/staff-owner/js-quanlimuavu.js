        //Load data: start

        var loop = $(".search-icon");
        loop.click(function(id) {
            var value = $("#search").val();
            var id = $("#.txtId");
            console.log(id);
            console.log(value);
        })

        var arrEle;
        function loadData() {
            $(".table tbody").empty();
            //Sau khi update xong thi xoa thanh phan cu~ tren HTML
            $.ajax({
            url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager",
            type: "GET",
            dataType: "json",
            success: function(data) {
                arrEle = data;
                let emptyStr = '';
                for(let i=0 ; i<data.length ; i++){
                    let edit = `<button class="feature" id="edit" onclick=edit(${data[i].id}) type="button"><i class="fa-solid fa-pen-to-square"></i></button>`;
                    let final = `<button class="feature" id="last" type="button" onclick=final(${data[i].id})><i class="fa-solid fa-circle-check"></i></button>`
                    let remove = `<button class="feature" id="remove" type="button" onclick=remove(${data[i].id})><i class="fa-solid fa-trash-can"></i></button>`;
                    if(data[i].quantity == data[i].quantityEstimate) {
                        data[i].comment = 'Đạt chỉ tiêu';
                    } else if(data[i].quantity > data[i].quantityEstimate) {
                        data[i].comment = 'Vượt chỉ tiêu';
                    } else {
                        data[i].comment = 'Chưa đạt';
                    }
                    let strTemp = "<tr> <th scope='row'>" + data[i].id + "</th>"
                        + "<td class='border'>" + data[i].seasonName + "</td>"
                        + "<td class='border'>" + data[i].dateStart + "</td>"
                        + "<td class='border'>" + data[i].dateEnd+ "</td>"
                        + "<td class='border'>" + data[i].quantity + "</td>"
                        + "<td class='border'>" + data[i].quantityEstimate + "</td>"
                        + "<td class='border'>" + data[i].comment + "</td>"
                        + "<td class='border'>" + edit + final + remove + "</td> </tr>";
                        emptyStr += strTemp;
                }
                $(".table tbody").append(emptyStr); //append : mở rộng 
                }
            });
        }
        loadData();
        //load data : end
        
        
        //sửa : start
        function edit(id){
            for(let i = 0; i<arrEle.length;i++){
                if(arrEle[i].id == id){
                    $(".editModal").show();
                    $(".txtId").val(arrEle[i].id);
                    $(".editModal .seasonName").val(arrEle[i].seasonName);
                    $(".editModal .dateStart").val(arrEle[i].dateStart);
                    $(".editModal .dateEnd").val(arrEle[i].dateEnd);
                    $(".editModal .state").val(arrEle[i].state);
                    break;
                }
            }
        };

        $(".editCancel").click(function() {
            $(".editModal").hide();
        });

        $("#editSuccess").click(function() {
            var editData = {};
            var id = $(".txtId").val();
            editData.seasonName = $(".editModal .seasonName").val();
            editData.dateStart = $(".editModal .dateStart").val();
            editData.dateEnd = $(".editModal .dateEnd").val();
            editData.state = $(".editModal .state").val();
            console.log(id);
            $.ajax({
                url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager/" + id,
                type: "PUT",
                data: editData,
                success: function(result) {
                    $(".editModal").hide();
                    loadData();
                }
            })
        })
        //sửa : end

        //thêm : start
        $("#add").click(function() {
            $(".addModal").show();
        });
        
        $(".addCancel").click(function() {
            $(".addModal").hide();
        });

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var miliseconds = date.getMilliseconds();
        var current = `${year}-0${month}-${day}T${hours}:${minutes}:${seconds}.${miliseconds}Z`;
        $("#addSuccess").click(function() {
            var addData = {};
            addData.seasonName = $(".addModal .seasonName").val();
            addData.quantityEstimate = $(".addModal .quantityEstimated").val(); 
                
            if($(".addModal .dateStart").val() != '' && $(".addModal .dateStart").val() != undefined) {
                addData.dateStart = $(".addModal .dateStart").val();
            } else {
                addData.dateStart = current;
                console.log(current);
            }

            if(addData.seasonName != '' && addData.seasonName != undefined && addData.quantityEstimate != '' && addData.quantityEstimate != undefined){
                $.ajax({
                    url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager",
                    type: "POST",
                    data: addData,
                    success: function(result) {
                        $(".addModal").hide();
                        loadData();
                    }
                })
            }
        })
        //thêm : end


        //Xoá : start
        function remove(id){
            $.ajax({
                url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager/" + id,
                type: "DELETE",
                success: function() {
                    loadData();
                }
            })
        };
        //Xoá : end

        //Final : start
        function final(id){
            for(let i = 0; i<arrEle.length;i++){
                if(arrEle[i].id == id){
                    $(".finalModal").show();
                    $(".finalModal .txtId").val(arrEle[i].id);
                    $(".finalModal .quantity").val(arrEle[i].quantity);
                    $(".finalModal .state").val(arrEle[i].state);
                    $(".finalModal .dateEnd").val(arrEle[i].dateEnd);
                    break;
                }
            }
        };

        $(".finalCancel").click(function() {
            $(".finalModal").hide();
        });

        $("#finalSuccess").click(function() {
            var finalData = {};
            var id = $(".finalModal .txtId").val();
            finalData.quantity = $(".finalModal .quantity").val();
            finalData.state = $(".finalModal .state").val();
            finalData.dateEnd = $(".finalModal .dateEnd").val() + `T${hours}:${minutes}:${seconds}.${miliseconds}Z`;
            $.ajax({
                url: "https://62b269f320cad3685c8db9c1.mockapi.io/farmManager/" + id,
                type: "PUT",
                data: finalData,
                success: function(result) {
                    $(".finalModal").hide();
                    loadData();
                }
            })
        });
        //Final : end