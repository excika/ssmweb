var pathname = window.location.pathname;
var arr = pathname.split("/");
var proName = arr[1];
var rootPath = "http://" + window.location.host + "/" + proName;
var $metaTree;
var cancelFlag = true;
var directoryFlag;
var metaTreeData ;
var updateArr=[];
var showitemLen = false;
var drawMetaTreeData;
$(document).ready(function () {
    //树的搜索功能
    var treeSearch = function (tree) {
        var treedata;
        treedata = drawMetaTreeData;
        drawTree(treedata);
        var search = $('#appSystemCode').val();
        var pattern = toEscStr(search);
        var selectableNodes = tree.treeview('search', [pattern, {ignoreCase: false, exactMatch: false}]);
        if (search) {
            if (selectableNodes.length > 0) {
                var Nodes = [];
                for (var i = 0; i < selectableNodes.length; i++) {
                    var node = selectableNodes[i];
                    delete node.state;
                    if (node.nodes) delete node.nodes;
                    Nodes.push(node);
                }
            }
            tree = drawMetaTree(Nodes)
        } else {
            var treedata;
            treedata = drawMetaTreeData;
            tree = drawTree(treedata);
        };

    };

    $appSystemCode.keyup(function () {
        treeSearch($metaTree);

    });

    drawMetaTree(drawMetaTreeData);

});


//画树
function drawTree(treeData) {
    var tree = $('#appSystemList').treeview({
        data: treeData,
        levels: 1,
        searchResultColor: "black",
        selectedBackColor: "#C7E7FE",
        selectedColor: "#55A0FE",
        onNodeSelected: function (event, node) {
            if(node.resourceTypeName != "Category"){
                var $metaList = $("#appSystemCode");
                $metaList.data("metaName", node.text);
                $metaList.data("metacode", node.code);
                $metaList.data("catecode", node.parent_code);
                $metaList.val($metaList.data("metaName"));
                $("#appSystemCode").removeClass("errorC");
                $("#appSystemCode").siblings("small").hide();
                // $("#appSystemList").hide();
            }else{
                dmallError("只能选择数据元，类目不可选");
            }
        },
        onNodeUnselected: function (event, node) {
            metaTag = 1;
        }
    });

    return tree;
}
function drawMetaTree(data){
    $metaTree = $('#appSystemList').treeview({
        data: data,
        levels: 1,
        searchResultColor: "black",
        selectedBackColor: "#C7E7FE",
        selectedColor: "#55A0FE",
        onNodeSelected: function (event, node) {
            if(node.resourceTypeName != "Category"){
                var $metaList = $("#appSystemCode");
                $metaList.data("metaName", node.text);
                $metaList.data("metacode", node.code);
                $metaList.data("catecode", node.parent_code);
                $metaList.val($metaList.data("metaName"));
                $("#appSystemCode").removeClass("errorC");
                $("#appSystemCode").siblings("small").hide();
                // $("#appSystemList").hide();
            }else{
                dmallError("只能选择数据元，类目不可选");
            }
        },
        onNodeCollapsed: function (event, node) {
            metaTag = 1;
        },
        onNodeExpanded: function (event, node) {
            metaTag = 1;
        }
    });
    return $metaTree;
}



    $("#btn btn-block btn-primary").click(function () {
        $.post("/dmall/directory/datadirectory/update",
            {

            },
            function (data, status) {

                if (data.result == "success") {

                } else {
                    dmallError(data.result);
                }
            },
            "json");
    })
    function checkItemNo(){
        var string = $("#itemNo").val();
        var ret = inputCheckItemNo(string);
        if(!ret)
        {
            $("#itemNo").addClass("border-red");
            $(".error3").html("*请输数据目录编号");
            $(".error3").css("display", "block");
            directoryFlag = false;
            preventDefaultFlag = true;
        }
    };
    $("#itemNo").blur(function(){
        checkItemNo();
    });
    $("#itemNo").focus(function () {
        var string = $("#itemNo").val();
        var ret = inputCheckItemNo(string);
        if(!ret)
        {
            $("#itemNo").removeClass("border-red");
            $(".error3").hide();
        }
    });
    /*名称栏获取焦距*/
    $("#itemName").focus(function () {
        var string = $("#itemName").val();
        var ret = inputCheckName(string);
        if(!ret)
        {
            $("#itemName").removeClass("border-red");
            $(".error4").hide();
        }
    });
    /*名称栏失去焦距*/
    $("#itemName").blur(function(){
        checkName();
    });
    function checkName(){
        var string = $("#itemName").val();
        var ret = inputCheckName(string);
        if(string == ""){
            $("#itemName").addClass("border-red");
            $(".error4").html("*请输入数据目录名称，1-100个字符");
            $(".error4").css("display", "block");
            directoryFlag = false;
            preventDefaultFlag = true;
        }
        // else if(!ret){
        //     $("#itemName").addClass("border-red");
        //     $(".error4").html("*输入的数据目录名称有误，由中文、数字、字母、下划线组成，1-100个字符");
        //     $(".error4").css("display", "block");
        // }
    };
//数据项编号校验
    function checkInputNum(){
        var string = $("#inputNum").val();
        var ret = inputCheckCodeNum(string);
        if(string==""){
            $("#inputNum").addClass("border-red");
            $(".error1").html("*请输入数据项编号，格式为数字，长度为3位");
            $(".error1").css("display", "block");
            $("#btn_create").prop("disabled",true);
            return false;
        }else if(!ret){
            $("#inputNum").addClass("border-red");
            $(".error1").html("*数据项应该是数字");
            $(".error1").css("display", "block");
            $("#btn_create").prop("disabled",true);
            return false;

        }else if(string.length!=3){
            $("#inputNum").addClass("border-red");
            $(".error1").html("*数据项长度应该为3");
            $(".error1").css("display", "block");
            $("#btn_create").prop("disabled",true);
            return false;
        }
        return true;
    };
    $("#inputNum").blur(function(){
        checkInputNum();
    });
    $("#inputNum").focus(function () {
        var string = $("#inputNum").val();
        $("#inputNum").removeClass("border-red");
        $(".error1").hide();

    });

//数据格式类型
    function checkInputDataType(){
        // var string = $("#inputDataType").val();
        // if(string=="请选择"){
        //     $("#inputDataType").addClass("border-red");
        //     $(".error10").html("*请输数据目录名称");
        //     $(".error10").css("display", "block");
        //     preventDefaultFlag = true;
        // }else if(string == "6"){
        //     showitemLen=true;
        //     $("#inputDatalength").removeClass("border-red");
        //     $(".error7").hide();
        // }
    };
    $("#inputDataType").change(function(){
        checkInputDataType();
    });
    function selectChange() {
        var string = $("#inputDataType").val();
        if(string!=" "){
            $("#inputDataType").removeClass("border-red");
            $(".error10").hide();
        }
    };

    //数据格式类型1
    function checkInputDataType1(){
        // var string = $("#inputDataType1").val();
        // if(string=="请选择"){
        //     $("#inputDataType1").addClass("border-red");
        //     $(".error11").html("*请输数据目录名称");
        //     $(".error11").css("display", "block");
        //     preventDefaultFlag = true;
        // }else if(string == "6"){
        //     showitemLen=true;
        //     $("#inputDatalength1").removeClass("border-red");
        //     $(".error7").hide();
        // }
    };
    $("#inputDataType1").change(function(){
        checkInputDataType1();
    });

//数据项名称校验
    function checkInputName(){
        var string = $("#inputName").val();
        var ret = inputCheckItemName(string);
        if(string ==""){
            $("#inputName").addClass("border-red");
            $(".error2").html("*请输入数据项名称，1-120个字符");
            $(".error2").css("display", "block");
            preventDefaultFlag = true;
        }
        // else if(!ret){
        //     $("#inputName").addClass("border-red");
        //     $(".error2").html("*数据项名称格式不正确，应该为数字、字母、下划线，1-120个字符");
        //     $(".error2").css("display", "block");
        //     preventDefaultFlag = true;
        // }


    };
    $("#inputName").blur(function(){
        checkInputName();
    });
    $("#inputName").focus(function () {
        var string = $("#inputName").val();
        var ret = inputCheckName(string);
        if(!ret)
        {
            $("#inputName").removeClass("border-red");
            $(".error2").hide();
        }
    });
function selectChange1() {

    // var string = $("#inputDataType1").val();
    // if(string!=" ")
    // {
    //     $("#inputDataType1").removeClass("border-red");
    //     $(".error11").hide();
    // }
};
//数据项中文名称
    function checkInputChineseNameName(){
        var string = $("#inputChineseName").val();
        var ret = inputCheckName(string);
        if(string==""){
            $("#inputChineseName").addClass("border-red");
            $(".error5").html("*请输入数据项中文名称，1-120个字符");
            $(".error5").css("display", "block");
            preventDefaultFlag = true;
        }
        // else if(!ret){
        //     $("#inputChineseName").addClass("border-red");
        //     $(".error5").html("*数据项中文名称格式有误，应该为中文、数字、字母、下划线, 1-120个字符");
        //     $(".error5").css("display", "block");
        //     preventDefaultFlag = true;
        // }
    };
    $("#inputChineseName").blur(function(){
        checkInputChineseNameName();
    });
    $("#inputChineseName").focus(function () {
        var string = $("#inputChineseName").val();
        var ret = inputCheckName(string);
        if(!ret)
        {
            $("#inputChineseName").removeClass("border-red");
            $(".error5").hide();
        }
    });

//数据项长度
    function checkInputDatalength(){
        var string = $("#inputDatalength").val();
        var num = inputCheckNum1(string);
        var che = inputCheckCodeNum(string);
        // if(string ==""){
        //     $("#inputDatalength").addClass("border-red");
        //     $(".error7").html("*请输数据项长度");
        //     $(".error7").css("display", "block");
        //     // preventDefaultFlag = true;
        //     $("btn-submit").disabled;
        //     return false;
        // }else
         if(string !="" && !num){
            $("#inputDatalength").addClass("border-red");
            $(".error7").html("*数据项长度格式应为数字");
            $(".error7").css("display", "block");
            $("btn-submit").disabled;
            return false;
        }
        // else if(!che){
        //     $("#inputDatalength").addClass("border-red");
        //     $(".error7").html("*数据项最大长度为16位");
        //     $(".error7").css("display", "block");
        //     $("btn-submit").disabled;
        //     return false;
        // }
        };
$("#inputDatalength").blur(function(){
    checkInputDatalength();

});
$("#inputDatalength").focus(function () {
    $("#inputDatalength").removeClass("border-red");
    $(".error7").hide();
});
//数据目录校验
function inputCheckNum1(string){
    var regex = /^[0-9]{1,}$/
    return regex.test(string);
}

    function inputCheckItemNo(string){
        //var regex =  /^[a-zA-Z0-9_\u4e00-\u9fa5-]{1,64}$/;
        var regex =  /^[A-Z]{1,64}-\d{1,2}-\d{1,}$/;
        return regex.test(string);
    }
    function inputCheckCodeNum(string) {
        var regex = /^[0-9]{1,16}$/
        return regex.test(string);
    }
    function inputCheckItemNo(string){
        //var regex =  /^[a-zA-Z0-9_\u4e00-\u9fa5-]{1,64}$/;
        var regex =  /^[A-Z]{3}-\d{2,}-\d{1,}$/;
        return regex.test(string);
    }
    function inputCheckName(string){
        var regex =  /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,120}$/;
        return regex.test(string);

    }
    //检查数据项名称（数字、字母、下划线）不能有中文
    function inputCheckItemName(string){
        var regex =  /^[a-zA-Z0-9_]{1,120}$/;
        return regex.test(string);

    }

    /*输入数字、字母、中文*/
    function inputCheckNameLax1(string){
        var regex =  /^[\w\u4e00-\u9fa5]{1,120}$/;
        return regex.test(string);

    }


    //数据项编号校验1
    function checkInputNum1(){
        var string = $("#inputNum1").val();
        var ret = inputCheckCodeNum(string);
        if(string ==null || string ==""){
            $("#inputNum1").addClass("border-red");
            $(".error1").html("*请输入数据项编号，格式为数字，长度为3位");
            $(".error1").css("display", "block");
            preventDefaultFlag = true;
            return false;
        }else if(!ret){
            $("#inputNum1").addClass("border-red");
            $(".error1").html("*数据项编号应该为数字，长度为3位");
            $(".error1").css("display", "block");
            preventDefaultFlag = true;
            return false;
        }else if(string.length!=3){
            $("#inputNum1").addClass("border-red");
            $(".error1").html("*数据项编号长度为3位");
            $(".error1").css("display", "block");
            preventDefaultFlag = true;
            return false;
        }
        return true;
    };
    $("#inputNum1").blur(function(){
        checkInputNum1();
    });
    $("#inputNum1").focus(function () {
        var string = $("#inputNum1").val();
        var ret = inputCheckCodeNum(string);
        if(!ret)
        {
            $("#inputNum1").removeClass("border-red");
            $(".error1").hide();
        }
    });
//数据项名称校验
function checkInputName1(){
    var string = $("#inputName1").val();
    var ret = inputCheckItemName(string);
    if(string == ""){
        $("#inputName1").addClass("border-red");
        $(".error2").html("*请输入数据项名称，1-120个字符");
        $(".error2").css("display", "block");
        preventDefaultFlag = true;
    }
    // else if(!ret){
    //     $("#inputName1").addClass("border-red");
    //     $(".error2").html("*数据项名称格式有误，支持数字、字母、下划线, 1-120个字符");
    //     $(".error2").css("display", "block");
    //     preventDefaultFlag = true;
    // }
};
$("#inputName1").blur(function(){
    checkInputName1();
});
$("#inputName1").focus(function () {
    var string = $("#inputName1").val();
    var ret = inputCheckName(string);
    $("#inputName1").removeClass("border-red");
    $(".error2").hide();

});
//数据项中文名称
    function checkInputChineseName1(){
        var string = $("#inputChineseName1").val();
        var ret = inputCheckName(string);
        if(string==""){
            $("#inputChineseName1").addClass("border-red");
            $(".error5").html("*请输入数据项中文名称，1-120个字符");
            $(".error5").css("display", "block");
            preventDefaultFlag = true;
        }
        // else if(!ret){
        //     $("#inputChineseName1").addClass("border-red");
        //     $(".error5").html("*数据项中文名称格式有误，支持中文、数字、字母、下划线, 1-120个字符");
        //     $(".error5").css("display", "block");
        //     preventDefaultFlag = true;
        // }
    };
    $("#inputChineseName1").blur(function(){
        checkInputChineseName1();
    });
    $("#inputChineseName1").focus(function () {
        var string = $("#inputChineseName1").val();
        var ret = inputCheckName(string);
        $("#inputChineseName1").removeClass("border-red");
        $(".error5").hide();

    });
//数据元内容标识符???
    function checkInputDataContent1(){
        var string = $("#inputDataContent1").val();
        var ret = inputCheckName(string);
        if(!ret)
        {
            $("#inputDataContent1").addClass("border-red");
            $(".error6").html("*请输数据元内容标识符");
            $(".error6").css("display", "block");
            preventDefaultFlag = true;
        }
    };
    $("#inputDataContent1").blur(function(){
        checkInputDataContent1();
    });
    // 数据元标识符
    $("#pleaseChoose").click(function () {
        $("#inputDataContent").removeClass("border-red");
        $(".error6").hide();
        $("#appSystemCode").val("");
    });

    $("#pleaseChoose1").click(function () {
        // console.log("数据元内容")
        $("#inputDataContent1").removeClass("border-red");
        $(".error6").hide();
        $("#appSystemCode").val("");

    })
$("#itemDataBtn").click(function () {
    if(checkMetaNameValue()){
        return false;
    }
})
// $("#appSystemCode").blur(function () {
//     checkMetaNameValue();
// })
$("#appSystemCode").focus(function () {

    $("#appSystemCode").removeClass("errorC");
    $(".erroMetaCode").hide();
})
//数据元输入框检测
function checkMetaNameValue(dataContent1) {
    var string = $("#appSystemCode").val();
    if(dataContent1 !="" && dataContent1 != undefined){
        string = dataContent1;
    }

    var nodeTmp = getNodeInMetaTree(string);
    if ($("#appSystemCode").val() == "") {
        $("#appSystemCode").addClass("errorC");
        $(".erroMetaCode").html("*请选择数据元");
        $(".erroMetaCode").css("display", "block");
        preventDefaultFlag = true;
        return true;
    }else if (null != nodeTmp) {
        selectNode = nodeTmp;
        $("#appSystemCode").removeClass("errorC");
        $(".erroMetaCode").hide();
    } else {
        $("#appSystemCode").addClass("errorC");
        $(".erroMetaCode").html("*请选择正确的数据元");
        $(".erroMetaCode").css("display", "block");
        preventDefaultFlag = true;
        return true;
    }

};

//检查输入项是否在树中存在
function getNodeInMetaTree(textName) {
    var pattern = textName;
    var options = {
        exactMatch: true,
        revealResults: true
    };

    var results = $metaTree.treeview('search', [pattern, options]);

    if (results.length != 0) {
        return results[0];
    } else {
        return null;
    }
}


//数据项长度
    function checkInputDatalength1(){
        var string = $("#inputDatalength1").val();
        var num = inputCheckNum1(string);
        var che = inputCheckCodeNum(string);
        // if(string =="" || string==null){
        //     $("#inputDatalength1").addClass("border-red");
        //     $(".error7").html("*请输数据项长度");
        //     $(".error7").css("display", "block");
        //     // preventDefaultFlag = true;
        //     $("btn-submit").disabled;
        //     return false;
        // }else
        if(string !="" && !num){
            $("#inputDatalength1").addClass("border-red");
            $(".error7").html("*数据项长度格式应为数字");
            $(".error7").css("display", "block");
            $("btn-submit").disabled;
            return false;
        }
        // else if(!che){
        //     $("#inputDatalength1").addClass("border-red");
        //     $(".error7").html("*数据项最大长度为4位");
        //     $(".error7").css("display", "block");
        //     $("btn-submit").disabled;
        //     return false;
        // }
    };
    $("#inputDatalength1").blur(function(){
        checkInputDatalength1();
    });
    $("#inputDatalength1").focus(function () {
        $("#inputDatalength1").removeClass("border-red");
        $(".error7").hide();
    });
//数据目录校验
    function inputCheckItemNo(string){
        //var regex =  /^[a-zA-Z0-9_\u4e00-\u9fa5-]{1,64}$/;
        var regex =  /^[A-Z]{1,64}-\d{1,2}-\d{1,}$/;
        return regex.test(string);
    }
    function inputCheckCodeNum(string) {
        var regex = /^[0-9]{1,16}$/
        return regex.test(string);
    }
    function inputCheckItemNo(string){
        //var regex =  /^[a-zA-Z0-9_\u4e00-\u9fa5-]{1,64}$/;
        var regex =  /^[A-Z]{3}-\d{2,}-\d{1,}$/;
        return regex.test(string);
    }





//数据目录编号改变事件
//     var $itemNo = $('#itemNo');
//     var str = $itemNo.val();
//     var dataNum = str.split('-');
// //            //更改所属目录编号
// //            $('#directoryName').val(arr[2] + '-' + arr[3] + '-' + arr[4]);
//     //更改行业类别
//     $('#industryCode').val(dataNum[0]);
//     //更改公安业务分类
//     $('#businessCode').val(dataNum[1]);
//     //更改数据资源要素一级分类
//     $('#data1stCode').val(parseInt(dataNum[2][0]));
//     //更改数据资源要素二级分类
//     $('#data2ndCode').val(parseInt(dataNum[2][1]));
//     //更改数据资源要素细目分类
//     $('#dataDetailCode').val(parseInt(dataNum[2][2]));
//     //更改数据资源属性分类
//     $('#dataPropertyCode').val(parseInt(dataNum[2][3]));
//     // for(var i=0;i < $("#listTable tbody tr").length; i++){
//     //     var stringArr = $("#listTable tbody tr").eq(i).find("td").eq(0).text();
//     //     // stringArr = $(this).val() + "-" + stringArr.split("-")[2];
//     //     $("#listTable tbody tr").eq(i).find("td").eq(0).text(stringArr);
//     // }
//     //$itemNo.val('ZNB-03-113200001');
//     //失去焦点
//         $itemNo.blur(function () {
// //            checkResourceIdValue();
//         var str = $itemNo.val();
//         var dataNum = str.split('-');
// //            //更改所属目录编号
// //            $('#directoryName').val(arr[2] + '-' + arr[3] + '-' + arr[4]);
//         //更改行业类别
//         $('#industryCode').val(dataNum[0]);
//         //更改公安业务分类
//         $('#businessCode').val(dataNum[1]);
//         //更改数据资源要素一级分类
//         $('#data1stCode').val(parseInt(dataNum[2][0]));
//         //更改数据资源要素二级分类
//         $('#data2ndCode').val(parseInt(dataNum[2][1]));
//         //更改数据资源要素细目分类
//         $('#dataDetailCode').val(parseInt(dataNum[2][2]));
//         //更改数据资源属性分类
//         $('#dataPropertyCode').val(parseInt(dataNum[2][3]));
//         for(var i=0;i < $("#listTable tbody tr").length; i++){
//             var string = $("#listTable tbody tr").eq(i).find("td").eq(0).text()+" ";
//             string = $(this).val() + "-" + string.substring(string.lastIndexOf("-")+1);
//             $("#listTable tbody tr").eq(i).find("td").eq(0).text(string);
//         }
//     });
//     $("#data1stCode").change(function () {
//         var value = $("#data1stCode").val();
//         changeSelect2(value, 0);
//     });
//     $("#data2ndCode").change(function () {
//         var value = $("#data2ndCode").val();
//         changeSelect2(value, 1);
//     });
//     $("#dataDetailCode").change(function () {
//         var value = $("#dataDetailCode").val();
//         changeSelect2(value, 2);
//     });
//     $("#dataPropertyCode").change(function () {
//         var value = $("#dataPropertyCode").val();
//         changeSelect2(value, 3);
//     });
//
//     //数据资源要素一、二级分类，数据资源要素细目分类，属性分类选择后更改
//     function changeSelect2(value, n) {
//         var str = $("#itemNo").val();
//         var arr = str.split('-');
//         var arr4 = arr[2].split('');
//         arr4[n]=value;
//         arr[2]=arr4.join('');
//         str=arr.join('-');
//         arr = str.split('-');
//         //更改数据资源编号
//         //$("#itemNo").val(str);
//         //更改所属目录编号
//         $("#itemNo").val(arr[0] + '-' + arr[1] + '-' + arr[2]);
//     }
//
//     var $industryCode = $("#industryCode");
//     $industryCode.change(function () {
//         var str1 = $("#itemNo").val();
//         var dataNum1 = str1.split('-');
//         $("#itemNo").val($("#industryCode").val() + "-" + dataNum1[1] + "-" + dataNum1[2]);
//         dataNum1[0] = $("#industryCode").val()
//     });
//     var $businessCode = $("#businessCode");
//     $businessCode.change(function () {
//         var str1 = $("#itemNo").val();
//         var dataNum1 = str1.split('-');
//         $("#itemNo").val(dataNum1[0] + "-" + $("#businessCode").val() + "-" +dataNum1[2]);
//         dataNum1[1] = $("#businessCode").val();
//     });


    var arr = [];
    var deleteArr = [];//删除的数据
    var input;
    var checkArr = [];
    var checkitemNo;
//点击修改按钮模态框出现同时模态框里input的值显示出来
   $("#listTable tbody").on("click","tr td.td-modify a",function (e) {
        e.preventDefault();
        var trRow = $(this).parent().parent().find("td");
        $('#modifyModal').modal({backdrop: 'static', keyboard: false});
        $('#modifyModal').data("$selector",$(this));

        $("#cloneItemNo1").text($("#itemNo").val()+"-");

        $("#inputNum1").removeClass("border-red");
        $(".error1").hide();
        var itemnum = trRow[0].innerText.trim();
        var str=[]
        str = itemnum.split("-");
        input = itemnum;
        $("#inputNum1").val(str[str.length-1]);
        checkitemNo = str[str.length-1];


        $("#inputName1").removeClass("border-red");
        $(".error2").hide();
        $("#inputName1").val(trRow[1].innerText);


        $("#inputChineseName1").removeClass("border-red");
        $(".error5").hide();
        $("#inputChineseName1").val(trRow[2].innerText);

        $("#inputDataType1").removeClass("border-red");
        $(".error11").hide();

        var len = $("#inputDataType1 option").length;
        for(var i=0;i<len;i++){
            var $dataType = $("#inputDataType1 option")[i].text.split(" ")[0];
            if($dataType==trRow[3].innerHTML){
                // console.log($("#inputDataType1 option").eq(i).val());
                $("#inputDataType1").val($("#inputDataType1 option").eq(i).val());
            }
        }

        $("#inputDataContent1").removeClass("border-red");
        $(".error6").hide();
        $("#inputDataContent1").val($(this).parent().parent().find("td").eq(4).children("a").text());


        $("#inputDatalength1").removeClass("border-red");
        $(".error7").hide();
        $("#inputDatalength1").val(trRow[5].innerHTML);


        $("#inputDescription1").removeClass("border-red");
        $(".errorItemDesc1").hide();
        $("#inputDescription1").val(trRow[6].innerText);
        $("#itemId1").val(trRow[7].innerHTML);




    });
function array_diff(a, b) {
    for(var i=0;i<b.length;i++)
    {
        for(var j=0;j<a.length;j++)
        {
            if(a[j]==b[i]){
                a.splice(j,1);
                j=j-1;
            }
        }
    }
    return a;
}
//数据资源描述校验

function checkDirectoryDesc(){
    var string = $("#dataDesc").val();
    // var ret =checkDatadirectoryDesc(string);
    if(string==""){
        $("#dataDesc").addClass("border-red");
        $(".errorDesc").html("*请输数据资源描述，1-4000个字符");
        $(".errorDesc").css("display", "block");
        preventDefaultFlag = true;
    }
};
$("#dataDesc").blur(function(){
    checkDirectoryDesc();
});
$("#dataDesc").focus(function () {
    var string = $("#dataDesc").val();
    var ret = inputCheckName(string);
    $("#dataDesc").removeClass("border-red");
    $(".errorDesc").hide();

});

//数据项描述校验新增

function checkItemDesc(){
    var string = $("#inputDescription").val();
    // var ret =checkItemDescs(string);
    if(string==""){
        $("#inputDescription").addClass("border-red");
        $(".errorItemDesc").html("*请输数据项描述，1-2000个字符");
        $(".errorItemDesc").css("display", "block");
        preventDefaultFlag = true;
    }
};
$("#inputDescription").blur(function(){
    checkItemDesc();
});
$("#inputDescription").focus(function () {
    var string = $("#inputDescription").val();
    var ret = inputCheckName(string);
    $("#inputDescription").removeClass("border-red");
    $(".errorItemDesc").hide();

});

//数据项描述校验更新

function checkItemDesc1(){
    var string = $("#inputDescription1").val();
    // var ret =checkItemDescs(string);
    if(string==""){
        $("#inputDescription1").addClass("border-red");
        $(".errorItemDesc1").html("*请输数据项描述，1-2000个字符");
        $(".errorItemDesc1").css("display", "block");
        preventDefaultFlag = true;
    }
};
$("#inputDescription1").blur(function(){
    checkItemDesc1();
});
$("#inputDescription1").focus(function () {
    var string = $("#inputDescription1").val();
    // var ret = inputCheckName(string);
    $("#inputDescription1").removeClass("border-red");
    $(".errorItemDesc1").hide();

});


$("#btn-submit1").click(function () {
    var strArr=[];
    var pageArr = $("#listTable tbody tr");
    for(var i = 0;i < pageArr.length;i++){
        var InputNo = pageArr.eq(i).find("td").eq(0).text();
        strArr.push(InputNo.trim());
    }
    for(var i = 0;i < strArr.length;i++){
        if(strArr[i] == input){
            strArr.splice(i,1);
        }
    }
    for(var i = 0;i < strArr.length;i++){
        array_diff(strArr,deleteArr);

        //console.log(strArr[i]==$("#itemNo").val()+"-"+$("#inputNum1").val());
        if(strArr[i] == $("#itemNo").val()+"-"+$("#inputNum1").val()){
            $(".error1").show();
            $("#inputNum1").addClass("border-red");
            $(".error1").html("*数据项编号已存在");
            return false;
        }
    }



    var $selector = $('#modifyModal').data("$selector");
    var string = $("#inputNum1").val()
    //console.log($("#itemNo").val()+"-"+$("#inputNum1").val());
    if(string ==null || string ==""){
        $("#inputNum1").addClass("border-red");
        $(".error1").html("*请输入数据项编号，格式为数字，长度为3位");
        $(".error1").css("display", "block");
        return false;
    }else if(!inputCheckCodeNum(string)){
        $("#inputNum1").addClass("border-red");
        $(".error1").html("*数据项编号应该为数字，长度为3位");
        $(".error1").css("display", "block");
        return false;
    }else if(string.length!=3){
        $("#inputNum1").addClass("border-red");
        $(".error1").html("*数据项编号长度为3位");
        $(".error1").css("display", "block");
        return false;
    }
    //console.log($("#itemNo").val()+"-"+$("#inputNum1").val());


    var string = $("#inputName1").val();
    var ret = inputCheckItemName(string);
    if(string == ""){
        $("#inputName1").addClass("border-red");
        $(".error2").html("*请输入数据项名称，1-120个字符");
        $(".error2").css("display", "block");
        return false;
    }
    // else if(!ret){
    //     $("#inputName1").addClass("border-red");
    //     $(".error2").html("*数据项名称格式有误，应该为数字、字母、下划线, 1-120个字符");
    //     $(".error2").css("display", "block");
    //     return false;
    // }


    if($("#inputChineseName1").val()==null || $("#inputChineseName1").val()==""){
        $("#inputChineseName1").addClass("border-red");
        $(".error9").show();
        $(".error9").html("*请输入数据项中文名称，1-120个字符")
        $("#inputChineseName1").focus(function () {
            $(".error9").text("");
        })
        return false;
    }


    var dataType=$("#inputDataType1 option:selected").text().split(" ")[0];
    dataType == "请选择"?"":dataType;
    // if(dataType==null || dataType=="" || dataType=="请选择"){
    //     $("#inputDataType1").addClass("border-red");
    //     $(".error11").show();
    //     $(".error11").html("*数据格式类型不能为空")
    //     return false;
    // }



    if($("#inputDataContent1").val()==null || $("#inputDataContent1").val()==""){
        $("#inputDataContent1").addClass("border-red");
        $(".error6").show();
        $(".error6").html("*数据元内容标识符不能为空")
        return false;
    }

    var inputDatalength = $("#inputDatalength1").val();
        if(inputDatalength!="" && !inputCheckCodeNum($("#inputDatalength1").val())){
            $("#inputDatalength1").addClass("border-red");
            $(".error7").show();
            $(".error7").html("*数据项长度格式应为数字")
            return false;
        }

    var itemDesc = $("#inputDescription1").val();
    var ret =checkItemDesc(itemDesc);
    if(itemDesc=="" || itemDesc == undefined){
        $("#inputDescription1").addClass("border-red");
        $(".errorItemDesc1").html("*请输数据项描述，1-2000个字符");
        $(".errorItemDesc1").css("display", "block");
        return false;
    }
    var newItemDesc = htmlEncode(itemDesc);
    var newName = htmlEncode($("#inputName1").val());
    var newChineseName = htmlEncode($("#inputChineseName1").val());
    // $selector.parent().parent().children("td").eq(0).text($("#itemNo").val()+"-"+$("#inputNum1").val());
    // $selector.parent().parent().children("td").eq(1).text($("#inputName1").val());
    // $selector.parent().parent().children("td").eq(2).text($("#inputChineseName1").val());
    // $selector.parent().parent().children("td").eq(3).text($("#inputDataType1 option:selected").text().split(" ")[0]);
    // $selector.parent().parent().children("td").eq(4).children("a").text($("#inputDataContent1").val().split(" ")[0]);
    // $selector.parent().parent().children("td").eq(5).text($("#inputDatalength1").val());
    // $selector.parent().parent().children("td").eq(6).text(itemDesc);

    // $selector.parent().parent().children("td").eq(7).text($("#itemId1").val());

    //得到该元素在数组arr中的下标位置，将此位置的元素的内容换成修改框里面的值注入
    var modifyNameIndex = parseInt(($("#pageTag li.active a").text()-1)*10);

    var modifyName = parseInt($selector.parent().parent().index()+modifyNameIndex);
    var modifyDataObj = {
            id:arr[modifyName].id,
            itemNo:$("#itemNo").val()+"-"+$("#inputNum1").val(),
            itemName:$("#inputName1").val(),
            itemChineseName:$("#inputChineseName1").val(),
            dataItemFormatCode:$("#inputDataType1 option:selected").text().split(" ")[0]=="请选择"?"":$("#inputDataType1 option:selected").text().split(" ")[0],
            metadataCode:$("#inputDataContent1").val().split(" ")[0],
            itemLength:$("#inputDatalength1").val(),
            itemDesc:itemDesc,
            active_flag:true
        };
        //console.log(modifyDataObj);

        arr.splice(modifyName,1,modifyDataObj);
        turnToPage( parseInt($("#pageTag li.active a").text()));
    // var modifyDataObj1 = {
    //     id:$("#itemId1").val(),
    //     itemNo:$("#itemNo").val()+"-"+$("#inputNum1").val(),
    //     itemName:$("#inputName1").val(),
    //     itemChineseName:$("#inputChineseName1").val(),
    //     dataItemFormatCode:$("#inputDataType1 option:selected").text().split(" ")[0],
    //     metadataCode:$("#inputDataContent1").val().split(" ")[0],
    //     itemLength:$("#inputDatalength1").val(),
    //     itemDesc:itemDesc,
    //     active_flag:true
    // };
    // arr.splice(modifyName,1,modifyDataObj1);
    console.log(arr);
    });



// 当前页面里面的tr数据添加到数组arr中
    var pageArr = $("#listTable tbody tr");
    // console.log(pageArr);
    // console.log(pageArr.eq(0).find("td").eq(0).text());
    for(var i = 0;i < pageArr.length;i++){
        var pageArrInputNum = pageArr.eq(i).find("td").eq(0).text();
        // console.log(pageArrInputNum+"-----");
        var pageArrInputName = pageArr.eq(i).find("td").eq(1).text();
        var pageArrInputChineseName = pageArr.eq(i).find("td").eq(2).text();
        var pageArrInputDataType = pageArr.eq(i).find("td").eq(3).text();
        var pageArrInputDataContent = pageArr.eq(i).find("td").eq(4).text();
        var pageArrInputDatalength = pageArr.eq(i).find("td").eq(5).text();
        var pageArrInputDescription = pageArr.eq(i).find("td").eq(6).text();
        var pageArrInputId = pageArr.eq(i).find("td").eq(7).text();
        //console.log(pageArrInputId);
        // if(pageArrInputChineseName == "" || pageArrInputChineseName == null){pageArrInputChineseName = "--";}
        // if(pageArrInputDescription == "" || pageArrInputDescription == null){pageArrInputDescription = "--";}
        var pageArrObj = {
            itemNo:pageArrInputNum,
            itemName:pageArrInputName,
            itemChineseName:pageArrInputChineseName,
            dataItemFormatCode:(pageArrInputDataType == "请选择"?"":pageArrInputDataType),
            metadataCode:pageArrInputDataContent,
            itemLength:pageArrInputDatalength,
            itemDesc:pageArrInputDescription,
            active_flag:true,
            id:pageArrInputId

        };
        arr.push(pageArrObj);
    }
    var pageArrActive = parseInt($("#pageTag li.active a").text());
    initPage(1);
    turnToPage(1);

    $("#listTable tbody").on("click","tr td:last-child a",function (e) {
        e.preventDefault();
        var targetNameIndex = parseInt(($("#pageTag li.active a").text()-1)*10);
        var ca = $(this).parent().parent().index();
        if(ca%10==0){
            ca = 0;
        }
        var targetName = parseInt(ca+targetNameIndex);
        var target = $(this).parent().parent();
        var deleteArrInputNum = target.find("td").eq(0).text();
        var deleteArrInputName = target.find("td").eq(1).text();
        var deleteArrInputChineseName = target.find("td").eq(2).text();
        var deleteArrInputDataType = target.find("td").eq(3).text();
        var deleteArrInputDataContent = target.find("td").eq(4).text();
        var deleteArrInputDatalength = target.find("td").eq(5).text();
        var deleteArrInputDescription = target.find("td").eq(6).text();
        var deleteArrInputId=arr[targetName].id
        var deleteArrObj = {
            id:deleteArrInputId,
            itemNo:deleteArrInputNum,
            itemName:deleteArrInputName,
            itemChineseName:deleteArrInputChineseName,
            dataItemFormatCode:deleteArrInputDataType,
            metadataCode:deleteArrInputDataContent,
            itemLength:deleteArrInputDatalength,
            itemDesc:deleteArrInputDescription
        };
        deleteArrObj.active_flag = false;
        if(deleteArrObj.id != null && deleteArrObj.id !="" && deleteArrObj.id != undefined) {
            deleteArr.push(deleteArrObj);
        }
        target.remove();
        arr.splice(targetName,1);
        var newLen = arr.length/10;
        if(arr.length%10==0 && arr.length >= 1){
            var page = parseInt($("#pageTag li.active a").text())
            if(newLen < page){
                page = page-1;
                if(page<=1){
                    page = 1;
                }
                turnToPage(page);
            }else{
                turnToPage(parseInt($("#pageTag li.active a").text()));
            }
        }else{
        turnToPage(parseInt($("#pageTag li.active a").text()));
        initPage(parseInt($("#pageTag li.active a").text()));
        }


    });


    //全部提交的时候将删除数组和剩下的数组合提交过去
    $("#allSubmit").click(function () {

        var id = $("#id").val();
        var string = $("#itemName").val();
        var ret = inputCheckName(string);
        if(string==""){
            $("#itemName").addClass("border-red");
            $(".error4").html("*请输入数据目录名称，1-100个字符");
            $(".error4").css("display", "block");
            return false;
        }
        // else if(!ret){
        //     $("#itemName").addClass("border-red");
        //     $(".error4").html("*输入的数据目录名称有误，由中文、数字、字母、下划线组成，1-100个字符");
        //     $(".error4").css("display", "block");
        //     return false;
        // }
        var string = $("#dataDesc").val();
        if(string==""){
            $("#dataDesc").addClass("border-red");
            $(".errorDesc").html("*请输数据资源描述，1-4000个字符");
            $(".errorDesc").css("display", "block");
            return false;
        }

        $.get(rootPath + "/dept/content/checkDirectory", {
                id:id
            },
            function (data) {
                if (data.result == "true") {
                    $('#updateModal').modal({backdrop: 'static', keyboard: false});
                }else{
                    var itemEntity = arr.concat(deleteArr);
                    var $id=$("#id").val();
                    var $itemNo = $("#itemNo").val();
                    // console.log($itemNo);
                    if($itemNo==null || $itemNo==""){
                        $(".error3").show();
                        $("#itemNo").addClass("border-red");
                        $(".error9").css("display", "block");
                        $(".error3").html("*数据目录编号不能为空");
                        directoryFlag = false;
                        return false;
                    }
                    var $itemName = $("#itemName").val();
                    if($itemName==null || $itemName==""){
                        $(".error4").show();
                        $("#itemName").addClass("border-red");
                        $(".error4").css("display", "block");
                        $(".error4").html("*数据目录名称不能为空");
                        return false;
                    }
                    var $version = $("#version").val().trim();
                    var $industryCode = $("#industryCode").val().replace(/\s+/g, " ").split(" ")[0];
                    var $businessCode = $("#businessCode").val().replace(/\s+/g, " ").split(" ")[0];
                    var $data1stCode = $("#data1stCode").val().replace(/\s+/g, " ").split(" ")[0];
                    var $data2ndCode = $("#data2ndCode").val().replace(/\s+/g, " ").split(" ")[0];
                    var $dataDetailCode = $("#dataDetailCode").val().replace(/\s+/g, " ").split(" ")[0];
                    var $dataPropertyCode= $("#dataPropertyCode").val().replace(/\s+/g, " ").split(" ")[0];
                    var $dataDesc = $("#dataDesc").val();
                    var entity={};
                    entity.id=$id;
                    entity.directoryNo=$itemNo;
                    entity.directoryName=$itemName;
                    entity.version=$version;
                    entity.industryCode=$industryCode;
                    entity.businessCode=$businessCode;
                    entity.data1stCode=$data1stCode;
                    entity.data2ndCode=$data2ndCode;
                    entity.dataDetailCode=$dataDetailCode;
                    entity.dataPropertyCode=$dataPropertyCode;
                    entity.dataDesc=$dataDesc;
                    $.ajax({
                        type: "POST",
                        url: "../datadirectory/update",
                        dataType: 'json',
                        data: {"entity":JSON.stringify(entity),"itemEntity":JSON.stringify(itemEntity)},

                        success: function(data){
                            if(data.result=="success"){
                                location.href =  "http://" + window.location.host + "/dmall/" +"plat_admin/datadirectorys";
                            }else{
                                dmallError(data.result);
                                return false;
                            }
                        },
                        error: function () {
                            $(".notifications ").empty();
                            dmallAjaxError();
                        }
                    });
                }
            },
            "json"
        );

    })
$("#btn_commitUpdateInfo").click(function () {
    var itemEntity = arr.concat(deleteArr);
    var $id=$("#id").val();
    var $itemNo = $("#itemNo").val();
    // console.log($itemNo);
    if($itemNo==null || $itemNo==""){
        $(".error3").show();
        $("#itemNo").addClass("border-red");
        $(".error9").css("display", "block");
        $(".error3").html("*数据目录编号不能为空");
        directoryFlag = false;
        return false;
    }
    var $itemName = $("#itemName").val();
    if($itemName==null || $itemName==""){
        $(".error4").show();
        $("#itemName").addClass("border-red");
        $(".error4").css("display", "block");
        $(".error4").html("*数据目录名称不能为空");
        return false;
    }
    var $version = $("#version").val().trim();
    var $industryCode = $("#industryCode").val().replace(/\s+/g, " ").split(" ")[0];
    var $businessCode = $("#businessCode").val().replace(/\s+/g, " ").split(" ")[0];
    var $data1stCode = $("#data1stCode").val().replace(/\s+/g, " ").split(" ")[0];
    var $data2ndCode = $("#data2ndCode").val().replace(/\s+/g, " ").split(" ")[0];
    var $dataDetailCode = $("#dataDetailCode").val().replace(/\s+/g, " ").split(" ")[0];
    var $dataPropertyCode= $("#dataPropertyCode").val().replace(/\s+/g, " ").split(" ")[0];
    var $dataDesc = $("#dataDesc").val();
    var entity={};
    entity.id=$id;
    entity.directoryNo=$itemNo;
    entity.directoryName=$itemName;
    entity.version=$version;
    entity.industryCode=$industryCode;
    entity.businessCode=$businessCode;
    entity.data1stCode=$data1stCode;
    entity.data2ndCode=$data2ndCode;
    entity.dataDetailCode=$dataDetailCode;
    entity.dataPropertyCode=$dataPropertyCode;
    entity.dataDesc=$dataDesc;

    $.ajax({
        type: "POST",
        url: "../datadirectory/update",
        dataType: 'json',
        data: {"entity":JSON.stringify(entity),"itemEntity":JSON.stringify(itemEntity)},

        success: function(data){
            if(data.result=="success"){
                location.href =  "http://" + window.location.host + "/dmall/" +"plat_admin/datadirectorys";
            }else{
                dmallError(data.result);
                return false;
            }
        },
        error: function () {
            $(".notifications ").empty();
            dmallAjaxError();
        }
    });
})


    $("#btn_create").click(function () {
        //模态框显示，同时清空input里面的val；
        $("#cloneItemNo").text($("#itemNo").val()+"-");
        $('#createModal').modal({backdrop: 'static', keyboard: false});
        $("#inputNum").val("");
        $("#inputNum").removeClass("border-red");
        $(".error1").hide("");

        $("#inputName").val("");
        $("#inputName").removeClass("border-red");
        $(".error2").hide("");

        $("#inputChineseName").val("");
        $("#inputChineseName").removeClass("border-red");
        $(".error5").hide("");

        $("#inputDataType option:selected").text().split(" ")[0];

        $("#inputDataContent").val("");
        $("#inputDataContent").removeClass("border-red");
        $(".error6").hide("");

        $("#inputDatalength").val("");
        $("#inputDatalength").removeClass("border-red");
        $(".error7").hide("");
        $("#inputDescription").val("");
        $("#inputDescription").removeClass("border-red");
        $(".errorItemDesc").hide("");

    });
    $("#btn_create").click(function () {

        $("#datadirectoryItemNum").html($('#itemNo').val()+"-");
        $('#createModal').modal({backdrop: 'static', keyboard: false});
    });


//创建添加到DOM树

    $("#btn-submit").click(function () {

        var inputNum = $("#inputNum").val();
        if(!checkInputNum()){
            return false;
        }
        // checkArr = arr;
        // checkArr = array_diff(checkArr,deleteArr);
        // for(var i = 0;i < checkArr.length;i++){
        //     if($("#cloneItemNo1").text()+checkitemNo == $("#cloneItemNo").text()+$("#inputNum").val()){
        //
        //     }else if($("#cloneItemNo1").text()+$("#inputNum1").val() == checkArr[i].itemNo){
        //         $(".error1").show();
        //         $("#inputNum1").addClass("border-red");
        //         $(".error1").html("数据项编号已存在");
        //         return false;
        //     }
        // }
        // console.log(arr);
        // console.log($("#cloneItemNo").text()+"-"+inputNum);
        for(var i = 0;i < arr.length;i++){
            if(arr[i].itemNo == $("#cloneItemNo").text()+inputNum){
                $(".error1").show();
                $("#inputNum").addClass("border-red");
                $(".error1").html("*数据项编号已存在");

                return false;
            }
        }


        var inputName = $("#inputName").val();
        var ret = inputCheckItemName(inputName);
        if(inputName==""){
            $("#inputName").addClass("border-red");
            $(".error2").show();
            $(".error2").html("*请输入数据项名称，1-120个字符")
            $("#inputName").focus(function () {
                $(".error2").text("");
            })
            return false;
        }
        // else if(!ret){
        //     $("#inputName").addClass("border-red");
        //     $(".error2").html("*数据项名称格式不正确，应该为数字、字母、下划线, 1-120个字符");
        //     $(".error2").css("display", "block");
        //     return false;
        // }

        var inputChineseName = $("#inputChineseName").val();
        var ret = inputCheckName(inputChineseName);
        if(inputChineseName==""){
            $("#inputChineseName").addClass("border-red");
            $(".error5").show();
            $(".error5").html("*请输入数据项中文名称，1-120个字符")
            return false;
        }
        // else if(!ret){
        //     $("#inputChineseName").addClass("border-red");
        //     $(".error5").html("*数据项中文名称格式有误，应该为中文、数字、字母、下划线, 1-120个字符");
        //     $(".error5").css("display", "block");
        //     return false;
        // }else if(!ret){
        //     $("#inputChineseName").addClass("border-red");
        //     $(".error5").html("*数据项中文名称格式有误，应该为中文、数字、字母、下划线, 1-120个字符");
        //     $(".error5").css("display", "block");
        //     return false;
        // }
        var inputDataType = $("#inputDataType option:selected").text().split(" ")[0];
        inputDataType == "请选择" ? "" : inputDataType;
        if(inputDataType == "请选择"){
            inputDataType = "";
            console.log(inputDataType);
        }
        console.log(inputDataType);
        // if(inputDataType=="请选择" || inputDataType==null){
        //     $("#inputDataType").addClass("border-red");
        //     $(".error10").show();
        //     $(".error10").html("*数据格式类型不能为空")
        //     $("#inputDataType").focus(function () {
        //         $(".error10").text("");
        //     })
        //     return false;
        // }
        var inputDataContent = $("#inputDataContent").val();
        if(inputDataContent=="" || inputDataContent == undefined){
            $("#inputDataContent").addClass("border-red");
            $(".error6").show();
            $(".error6").html("*数据元内容标识符不能为空")
            return false;
        }else{
            if(!checkMetaNameValue()) {
                var inputDataContent = $("#inputDataContent").val();
            }
        }
        var inputDatalength = $("#inputDatalength").val();
            if(inputDatalength!="" && !inputCheckCodeNum($("#inputDatalength").val())){
                $("#inputDatalength").addClass("border-red");
                $(".error7").show();
                $(".error7").html("*数据项长度格式应为数字")
                return false;
            }

        // if(inputCheckCodeNum($itemNo)){
        //     $(".error3").show();
        //     $(".error3").html("")
        //     $("#itemNo").addClass("border-red");
        //     $(".error9").css("display", "block");
        //     $(".error3").html("数据目录编号应该为数字");
        //     directoryFlag = false;
        //     return false;
        // }
        var inputDescription = $("#inputDescription").val();
        if(inputDescription==""){
            $("#inputDescription").addClass("border-red");
            $(".errorItemDesc").html("*请输数据项描述，1-2000个字符");
            $(".errorItemDesc").css("display", "block");
            return false;
        }
        var totalPages;


        if(arr.length%10 == 0){
            totalPages = arr.length/10;
        }else{
            totalPages = parseInt(arr.length/10)+1;
        }
        if(arr.length % 10 == 0){
            initPage(totalPages + 1,"create");

            $("#listTable tbody tr").hide();
        } else{
            turnToPage(totalPages);
        }
        var id=null;
        if(inputChineseName === ''){inputChineseName = '--';}
        var newName = htmlEncode(inputName);
        var newChineseName = htmlEncode(inputChineseName);
        var newStr = htmlEncode(inputDescription);
        $("#listTable tbody").append('<tr>'+
            '<td class="checkno">'+$('#itemNo').val()+"-"+inputNum+'</td>'+
            '<td class="breakText longText" title="'+newName+'">'+newName+'</td>'+
            '<td class="breakText longText" title="'+newChineseName+'">'+newChineseName+'</td>'+
            '<td class="breakText">'+inputDataType+'</td>'+
            "<td class='breakText'><a href='javascript:void(0)' onclick='viewMeta(this)'>"+inputDataContent+"</a></td>" +
            '<td class="breakText">'+inputDatalength+'</td>'+
            '<td class="breakText longText" title="'+newStr+'">'+newStr+'</td>'+
            '<td hidden>'+id+'</td>'+
            '<td class="td-modify"><a id="btn-modify"><em class="fa fa-edit"></em></a></td>'+
            '<td><a id="btn-delete"><em class="fa fa-times-circle"></em></a></td>'+
            '</tr>');

        var obj = {
            itemNo:$("#cloneItemNo").text()+inputNum,
            itemName:inputName,
            itemChineseName:inputChineseName,
            dataItemFormatCode:inputDataType,
            metadataCode:inputDataContent,
            itemLength:inputDatalength,
            itemDesc:inputDescription,
            active_flag:true
            //创建不需要加id
        };
        arr.push(obj);
        if(arr.length % 10 == 1){
            initPage(totalPages+1);
        }
    });
    // 点击下面的页码改变的页面数据
    $("#pageTag").on("click",".pageTag",function(){
        if(!$(this).hasClass("disabled")){
            var pageNumber = $(this).children("a").text();
            var active = parseInt($("#pageTag li.active a").text());
            if((pageNumber != "<" && pageNumber != ">" && pageNumber!="...")){
                pageNumber = parseInt(pageNumber);
                turnToPage(pageNumber);
            }else if(pageNumber == "<"){
                turnToPage(parseInt(active-1));
            }else if (pageNumber == ">"){
                turnToPage(parseInt(active+1));
            }
        }
    });
    function initPage(pageNumber,type) {
        $("#pageTag").empty();
        var pageSize = 10;
        var item = arr;
        var totalPages;
        if(item.length == 0){
            totalPages = 1;
        }else if(item.length%10 == 0){
            totalPages = item.length/10;
        }else{
            totalPages = parseInt(item.length/10)+1;
        }

        if(pageNumber == 1){
            $("#pageTag").append('<li class="disabled pageTag"><a>&lt;</a></li>');
        }else{
            $("#pageTag").append('<li class="pageTag"><a>&lt;</a></li>');
            if(pageNumber >= 3 && totalPages >= 5){
                $("#pageTag").append('<li class="pageTag"><a>1</a></li>');
            }
        }
        if(pageNumber > 3 && totalPages > 5){
            $("#pageTag").append('<li class="pageTag"><a>...</a></li>');
        }
        if((totalPages - pageNumber) < 2 && pageNumber > 2){
            if((totalPages == pageNumber) && pageNumber > 3){
                $("#pageTag").append('<li class="pageTag"><a>'+(parseInt(pageNumber) - 3)+'</a></li>');
            }
            $("#pageTag").append('<li class="pageTag"><a>'+(parseInt(pageNumber) - 2)+'</a></li>');
        }

        if(pageNumber > 1){
            $("#pageTag").append('<li class="pageTag"><a>'+(parseInt(pageNumber)-1)+'</a></li>');
        }
        $("#pageTag").append('<li class="active pageTag"><a>'+parseInt(pageNumber)+'</a></li>');
        if((totalPages - pageNumber) >= 1){
            $("#pageTag").append('<li class="pageTag"><a>'+(parseInt(pageNumber)+1)+'</a></li>');
        }
        if(pageNumber <3){
            if((pageNumber + 2) < totalPages){
                $("#pageTag").append('<li class="pageTag"><a>'+(parseInt(pageNumber)+2)+'</a></li>');
            }
            if((pageNumber < 2)&& ((pageNumber + 3) < totalPages) ){
                $("#pageTag").append('<li class="pageTag"><a>'+(parseInt(pageNumber)+3)+'</a></li>');
            }
        }
        if((totalPages - pageNumber) >= 3 && totalPages > 5){
            $("#pageTag").append('<li class="pageTag"><a >...</a></li>');
        }

        if(pageNumber == totalPages || type == "create"){
            $("#pageTag").append('<li class="disabled pageTag"><a>&gt;</a></li>');
        }else{
            if((totalPages - pageNumber) >= 2){
                $("#pageTag").append('<li class="pageTag"><a>'+totalPages+'</a></li>');
            }
            $("#pageTag").append('<li class="pageTag"><a>&gt;</a></li>');
        }
    }
    initPage(1);
    function turnToPage(pageNumber){
        var arr1 = arr.slice((pageNumber-1)*10,pageNumber*10);
        //刷新表格数据
        $("#listTable tbody").empty();
        for(var j=0;j<arr1.length;j++){
            if(arr1[j].itemChineseName === ''){arr1[j].itemChineseName = "--";}
            var newItemName = htmlEncode(arr1[j].itemName);
            var newChineseName = htmlEncode(arr1[j].itemChineseName);
            var newDesc = htmlEncode(arr1[j].itemDesc);
            $("#listTable tbody").append('<tr style="display:table-row">'+
                '<td>'+arr1[j].itemNo+'</td>'+
                '<td class="breakText longText" title="'+newItemName+'">'+newItemName+'</td>'+
                '<td class="breakText longText" title="'+newChineseName+'">'+newChineseName+'</td>'+
                '<td class="breakText">'+arr1[j].dataItemFormatCode+'</td>'+
                "<td class='breakText'><a href='javascript:void(0)' onclick='viewMeta(this)'>"+arr1[j].metadataCode+"</a></td>" +
                '<td class="breakText">'+arr1[j].itemLength+'</td>'+
                '<td class="breakText longText" title="'+newDesc+'">'+newDesc+'</td>'+
                '<td hidden>'+arr1[j].id+'</td>'+
                '<td class="td-modify"><a id="btn-modify"><em class="fa fa-edit"></em></a></td>'+
                '<td><a id="btn-delete"><em class="fa fa-times-circle"></em></a></td>'+
                '</tr>');

        }
        initPage(pageNumber);
    }


var $appSystemCode = $('#appSystemCode');
var appSystemCode = $appSystemCode.val();
var $appSystemList = $('#appSystemList');
var appSystemId = '';
$('.chooseDataTableItem').click(function () {
    //打开模态框
    $('#addDataTableItem').modal({backdrop: 'static', keyboard: false});
    getAppSystemNo();
});
$('.chooseDataTableItem1').click(function () {
    $('#addDataTableItem').modal({backdrop: 'static', keyboard: false});
    //清空
    $appSystemCode.val(" ");
    // $("#inputDataContent1").val(" ");
    getAppSystemNo();
});

$('#metaName').click(function () {
    $("#metaName").removeClass("errorC");
    $(".errorMetaName").hide();
    if ($("#list-meta").is(":hidden")) {
        $("#list-meta").show();
    }
    metaTag = 1;
});
//获取数据元内容标识
function getAppSystemNo(key) {
    $.get(rootPath + "/metadata/tree", {},
        function (data, status) {
            if ((status == "success") && (data.result == "success")) {
                drawMetaTreeData = data.metadataCategory;
                drawMetaTree(data.metadataCategory);
                $("#appSystemCode").removeClass("errorC");
                $("#appSystemCode").siblings("small").hide();
                $('#addDataTableItem').modal({backdrop: 'static', keyboard: false});
            } else {
                dmallError(data.result);
            }
        },
        "json"
    );
}


// // 查询
// $appSystemCode.keyup(function () {
//     getAppSystemNo($(this).val());
// });
//点击
$appSystemList.on('click', 'li', function () {

    if ($(this).html() != '空'){
        $(this).addClass('provideDept-click').siblings().removeClass('provideDept-click');
        appSystemId = $(this).attr('data-appSystemId');
        appSystemCode = $(this).html();
        // getDataTableCode(appSystemId);
        //$dataItemList.html('');
    }
});

//将值填入到数据元内容标识文本框
    $("#itemDataBtn").click(function () {
        if(!checkMetaNameValue()){
            $("#inputDataContent1").val($("#appSystemCode").val().split(" ")[0]);
            $("#inputDataContent").val($("#appSystemCode").val().split(" ")[0]);

        }
    });
    $("#channelPage").click(function () {
        window.history.go(-1);
    })




//数据元标识符部分
var pathname = window.location.pathname;
var prjName;
var arrOther = pathname.split("/");
prjName = arrOther[1];
function viewMeta(obj){
    $(obj).removeAttr('onclick');
    var metacode = $(obj).text();
  
    // var catecode = $.trim( $(obj).parent().next().text() );
    $("#viewMetaModal").data("metacode",metacode);
    // $("#viewMetaModal").data("catecode",catecode);
    $.get("/" + prjName + "/metadata/detail",
        {
            metaCode:metacode
            // cateCode:catecode
        },function(data,status){
            $(obj).attr('onclick', 'viewMeta(this);');
            if(data.result != "success"){
                $('#viewMetaModal').modal('hide');
                // $("#metaDetail").append("<div style='color:#AD5755'>获取数据元详情错误</div>");
                dmallError(data.result);
            }else{
                var meta_data = eval("(" + data.metadata + ")");
                if(meta_data.message != "success"){
                    dmallError(meta_data.message);
                }else{
                    $("#viewMetaModal").modal({backdrop:'static', keyboard: false});
                    $("#metaDetail div").remove();
                    var metadata = meta_data.data.result.attrDetailMap;
                    for(var i in metadata) {
                        var htmlStr = '';
                        htmlStr += '<div style="width:100%"><h5 style="color: #00B4DF"><strong>' + i + '</strong></h5><table style="border-bottom:0" class="table" width="100%">' +
                            '<thead><tr><td style="width:12%"></td><td style="width:20%"></td><td style="width:2%"></td><td style="width:12%"></td>' +
                            '<td style="width:20%"></td><td style="width:2%"></td><td style="width:12%"></td><td style="width:20%"></td></tr></thead>';
                        if(i == '所属类目'){
                            i = 'categories';
                        }
                        var num = 0;
                        var detail = metadata[i];
                        for (var j in detail) {
                            var qName = '';
                            // console.log(j);
                            if(i == 'categories'){
                                $("#viewMetaModal").data("catecode",j);
                                qName = data.qname+":";
                            }else{
                                qName = j;
                            }
                            if (num % 3 == 0) {
                                htmlStr += '<tr>';
                            }
                            htmlStr += '<th class="text-left">' + qName + '</th><td class="text-left"><span>' + detail[j] + '</span></td>';
                            if (num % 3 != 2) {
                                htmlStr += '<td style="border:0"></td>';
                            }
                            if (num % 3 == 2) {
                                htmlStr += '</tr>';
                            }
                            num++;
                        }
                        if (i == "表示类") {
                            if (num % 3 == 0) {
                                htmlStr += '<tr>';
                            }
                            htmlStr += '<th class="text-left">值域:</th><td class="text-left">' +
                                '<a href="javascript:void(0)" onclick="viewValueRange()" class="fa fa-file-text-o text-primary oper-icon-2"></a></td><td style="border:0"></td>';
                            if (num % 3 == 2) {
                                htmlStr += '</tr>';
                            }
                            num++;
                        }
                        if (num % 3 != 0) {
                            htmlStr += '</tr>';
                        }
                        htmlStr += '</table></div>';
                        $("#metaDetail").append(htmlStr);
                    }
                    // var htmlStr1 = '<div style="width:100%"><h5 style="color: #00B4DF"><strong>所属类目</strong></h5><table style="border-bottom:0" class="table">'+
                    //     '<thead><tr><td style="width: 100%"></td></tr></thead>'
                    // var metacate = data.name;
                    // console.log(data);
                    // console.log(metacate);
                    // var cate = metacate.split(".").join(" > ").replace(">","：");
                    // htmlStr1 += '<tr><td class="text-left">' + cate + '</td></tr></table></div>';
                    // $("#metaDetail").append(htmlStr1);
                }
            }
        },"json");
}

function viewValueRange(){
    $('#viewMetaModal').modal('hide');
    $('#viewValueRangeModal').modal('hide');
    $('#viewValueRangeModal').modal({backdrop: 'static', keyboard: false});
    $("#valueRangeTable tr:not(:first)").remove();
    var metacode = $("#viewMetaModal").data("metacode");
    var catecode = $("#viewMetaModal").data("catecode");
    $.get("/" + prjName + "/metadata/value_range",
        {
            metaCode:metacode,
            cateCode:catecode
        },
        function(data,status){
            if(data.result != "success"){
                dmallError(data.result);
            }else{
                var vrList=data.valueRange.list;
                if(vrList.length != 0) {
                    var trHTML = '<tbody id="valueRange">';
                    for (var j = 0; j < vrList.length; j++) {
                        if(vrList[j].rule != undefined){
                            trHTML += '<tr><td>' + parseInt(j+1) + '</td><td>' + vrList[j].name + '</td><td>' + vrList[j].code + '</td><td>' + vrList[j].rule + '</td></tr>';
                        }else{
                            trHTML += '<tr><td>' + parseInt(j+1) + '</td><td>' + vrList[j].name + '</td><td>' + vrList[j].code + '</td><td></td></tr>';
                        }
                    }
                    trHTML += '</tbody>';
                }else{
                    var trHTML = '<tfoot><tr><td>该数据元没有值域</td></tr></tfoot>';
                }
                $("#valueRangeTable").append(trHTML);
            }
        },"json");
}

function modal_close(){
    $('#viewValueRangeModal').hide();
    $('#viewValueRangeModal').modal('hide');
    $('#viewMetaModal').modal({backdrop: 'static', keyboard: false});
}
function first_modal_close() {
    $('#viewMetaModal').modal('hide');
}




$("#pleaseChoose1").click(function () {
    $("#appSystemCode").val("");

})

$("#inputNum").blur(function () {
    for(var i = 0;i < arr.length;i++){
        if(arr[i].itemNo == $("#cloneItemNo").text()+$("#inputNum").val()){
            $(".error1").show();
            $("#inputNum").addClass("border-red");
            $(".error1").html("*数据项编号已存在");
            return false;
        }
    }
})
var thisId;
// $("#btn-modify").click(function () {
//     thisId=$("#inputNum1").val();
//     console.log($("#inputNum1").val());
//     console.log(123);
// })
$("#inputNum1").blur(function () {
    checkArr = arr;
    checkArr = array_diff(checkArr,deleteArr);

    for(var i = 0;i < checkArr.length;i++){
        if($("#cloneItemNo1").text()+checkitemNo == $("#cloneItemNo1").text()+$("#inputNum1").val()){

        }else if($("#cloneItemNo1").text()+$("#inputNum1").val() == checkArr[i].itemNo){
            $(".error1").show();
            $("#inputNum1").addClass("border-red");
            $(".error1").html("*数据项编号已存在");
            return false;
        }
    }
})
$("#inputNum1").focus(function () {
    checkArr = arr;
    checkArr = array_diff(checkArr,deleteArr);

    for(var i = 0;i < checkArr.length;i++){
        if($("#cloneItemNo1").text()+checkitemNo == $("#cloneItemNo1").text()+$("#inputNum1").val()){
            $(".error1").hide();
            $("#inputNum1").removeClass("border-red");
        }else if($("#cloneItemNo1").text()+$("#inputNum1").val() != checkArr[i].itemNo){
            $(".error1").hide();
            $("#inputNum1").removeClass("border-red");
        }
    }
});



