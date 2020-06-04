var schools = [{
  "name": "上海理工大学",
  "id": "010000000"
}]

var departments = {
  "010000000": [
    {
      "school": "上海理工大学",
      "name": "第一食堂",
      "id": "011010000"
    },
    {
      "school": "上海理工大学",
      "name": "第二食堂",
      "id": "011020000"
    },
    {
      "school": "上海理工大学",
      "name": "三公寓一号楼",
      "id": "010010000"
    },
    {
      "school": "上海理工大学",
      "name": "三公寓二号楼",
      "id": "010020000"
    },
    {
      "school": "上海理工大学",
      "name": "三公寓三号楼",
      "id": "010030000"
    }
  ],
}

var floors = [{
  "011010000": [
    {
      "departments": "第一食堂",
      "name": "一楼",
      "id": "011010100"
    },
    {
      "departments": "第一食堂",
      "name": "二楼",
      "id": "011010200"
    },
    {
      "departments": "第一食堂",
      "name": "三楼",
      "id": "011010300"
    },
  ], 
  "011020000": [
    {
      "departments": "第二食堂",
      "name": "一楼",
      "id": "011020100"
    },
    {
      "departments": "第二食堂",
      "name": "二楼",
      "id": "011020200"
    },
    {
      "departments": "第二食堂",
      "name": "三楼",
      "id": "011020300"
    },
  ],
  "010010000": [
    {
      "departments": "三公寓一号楼",
      "name": "一楼",
      "id": "010010100"
    },
    {
      "departments": "三公寓一号楼",
      "name": "二楼",
      "id": "010010200"
    },
    {
      "departments": "三公寓一号楼",
      "name": "三楼",
      "id": "010010300"
    },
  ],
  "010020000": [
    {
      "departments": "三公寓二号楼",
      "name": "一楼",
      "id": "010020100"
    },
    {
      "departments": "三公寓二号楼",
      "name": "二楼",
      "id": "010020200"
    },
    {
      "departments": "三公寓二号楼",
      "name": "三楼",
      "id": "010020300"
    },
  ],
  "010030000": [
    {
      "departments": "三公寓三号楼",
      "name": "一楼",
      "id": "010030100"
    },
    {
      "departments": "三公寓三号楼",
      "name": "二楼",
      "id": "010030200"
    },
    {
      "departments": "三公寓三号楼",
      "name": "三楼",
      "id": "010030300"
    },
  ],
}]

var numbers = [{
  "011010100": [
    {
      "departments": "一楼",
      "name": "一号窗口",
      "id": "011010101"
    },
    {
      "departments": "一楼",
      "name": "二号窗口",
      "id": "011010102"
    },
    {
      "departments": "一楼",
      "name": "三号窗口",
      "id": "011010103"
    },
  ],
  "011010200": [
    {
      "departments": "二楼",
      "name": "一号窗口",
      "id": "011010201"
    },
    {
      "departments": "一楼",
      "name": "二号窗口",
      "id": "011010202"
    },
    {
      "departments": "一楼",
      "name": "三号窗口",
      "id": "011010203"
    },
  ], 
  "011010300": [
    {
      "departments": "三楼",
      "name": "一号窗口",
      "id": "011010301"
    },
    {
      "departments": "一楼",
      "name": "二号窗口",
      "id": "011010302"
    },
    {
      "departments": "一楼",
      "name": "三号窗口",
      "id": "011010303"
    },
  ], 

  "011020100": [
    {
      "departments": "一楼",
      "name": "一号窗口",
      "id": "011020101"
    },
    {
      "departments": "一楼",
      "name": "二号窗口",
      "id": "011020102"
    },
    {
      "departments": "一楼",
      "name": "三号窗口",
      "id": "011020103"
    },
  ],
  "011020200": [
    {
      "departments": "二楼",
      "name": "一号窗口",
      "id": "011020201"
    },
    {
      "departments": "二楼",
      "name": "二号窗口",
      "id": "011020202"
    },
    {
      "departments": "二楼",
      "name": "三号窗口",
      "id": "011020203"
    },
  ], 
  "011020300": [
    {
      "departments": "一楼",
      "name": "一号窗口",
      "id": "011020301"
    },
    {
      "departments": "一楼",
      "name": "二号窗口",
      "id": "011020302"
    },
    {
      "departments": "一楼",
      "name": "三号窗口",
      "id": "011020303"
    },
  ],

  "010010100": [
    {
      "departments": "一楼",
      "name": "01寝室",
      "id": "010010101"
    },
    {
      "departments": "一楼",
      "name": "02寝室",
      "id": "010010102"
    },
    {
      "departments": "一楼",
      "name": "03寝室",
      "id": "010010103"
    },
  ],
  "010010200": [
    {
      "departments": "二楼",
      "name": "01寝室",
      "id": "010010201"
    },
    {
      "departments": "二楼",
      "name": "02寝室",
      "id": "010010202"
    },
    {
      "departments": "二楼",
      "name": "03寝室",
      "id": "010010203"
    },
  ],
  "010010300": [
    {
      "departments": "三楼",
      "name": "01寝室",
      "id": "010010301"
    },
    {
      "departments": "三楼",
      "name": "02寝室",
      "id": "010010302"
    },
    {
      "departments": "三楼",
      "name": "03寝室",
      "id": "010010303"
    },
  ],

  "010020100": [
    {
      "departments": "一楼",
      "name": "01寝室",
      "id": "010020101"
    },
    {
      "departments": "一楼",
      "name": "02寝室",
      "id": "010020102"
    },
    {
      "departments": "一楼",
      "name": "03寝室",
      "id": "010020103"
    },
  ],
  "010020200": [
    {
      "departments": "二楼",
      "name": "01寝室",
      "id": "010020201"
    },
    {
      "departments": "二楼",
      "name": "02寝室",
      "id": "010020202"
    },
    {
      "departments": "二楼",
      "name": "03寝室",
      "id": "010020203"
    },
  ],
  "010020300": [
    {
      "departments": "三楼",
      "name": "01寝室",
      "id": "010020301"
    },
    {
      "departments": "三楼",
      "name": "02寝室",
      "id": "010020302"
    },
    {
      "departments": "三楼",
      "name": "03寝室",
      "id": "010020303"
    },
  ],

  "010030100": [
    {
      "departments": "一楼",
      "name": "01寝室",
      "id": "010030101"
    },
    {
      "departments": "一楼",
      "name": "02寝室",
      "id": "010030102"
    },
    {
      "departments": "一楼",
      "name": "03寝室",
      "id": "010030103"
    },
  ],
  "010030200": [
    {
      "departments": "二楼",
      "name": "01寝室",
      "id": "010030201"
    },
    {
      "departments": "二楼",
      "name": "02寝室",
      "id": "010030202"
    },
    {
      "departments": "二楼",
      "name": "03寝室",
      "id": "010030203"
    },
  ], 
  "010030300": [
    {
      "departments": "三楼",
      "name": "01寝室",
      "id": "010030301"
    },
    {
      "departments": "三楼",
      "name": "02寝室",
      "id": "010030302"
    },
    {
      "departments": "三楼",
      "name": "03寝室",
      "id": "010030303"
    },
  ],
}]

module.exports = {

  schools, //学校

  departments,//部门 （对学生而言，部门是寝室楼，如三公寓；对管理员来说，部门是食堂，如一食堂）

  floors,     //楼层

  numbers     //号码 （对学生而言，是房间号；对管理者而言是窗口号码）

}