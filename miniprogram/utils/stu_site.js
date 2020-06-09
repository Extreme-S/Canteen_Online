var schools = [{
  "name": "上海理工大学",
  "id": "010000000"
}]

var dorms = {
  "010000000": [
    {
      //三公一
      "school": "上海理工大学",
      "name": "三公寓一号楼",
      "id": "010010000"
    },
    {
      //三公二
      "school": "上海理工大学",
      "name": "三公寓二号楼",
      "id": "010020000"
    },
    {
      //三公三
      "school": "上海理工大学",
      "name": "三公寓三号楼",
      "id": "010030000"
    },
  ]
}

var floors = {
  "010010000": [
    {
      //三公一，一楼
      "dorms": "三公寓一号楼",
      "name": "一楼",
      "id": "010010100"
    },
    {
      //三公一，二楼
      "dorms": "三公寓一号楼",
      "name": "二楼",
      "id": "010010200"
    },
  ],
  "010020000": [
    {
      //三公二，一楼
      "dorms": "三公寓二号楼",
      "name": "一楼",
      "id": "010020100"
    },
    {
      //三公二，二楼
      "dorms": "三公寓二号楼",
      "name": "二楼",
      "id": "010020200"
    },
  ],
  "010030000": [
    {
      //三公三，一楼
      "dorms": "三公寓三号楼",
      "name": "一楼",
      "id": "010030100"
    },
    {
      //三公三，二楼
      "dorms": "三公寓三号楼",
      "name": "二楼",
      "id": "010030200"
    },
  ],
}

var rooms = {
  "010010100": [
    {
      //三公一，一楼，101
      "floors": "一楼",
      "name": "01寝室",
      "id": "010010101"
    },
    {
      //三公一，一楼，102
      "floors": "一楼",
      "name": "02寝室",
      "id": "010010102"
    },
    {
      //三公一，一楼，103
      "floors": "一楼",
      "name": "03寝室",
      "id": "010010103"
    },
  ],
}

module.exports = {
  schools, //学校
  dorms, //宿舍楼
  floors, //楼层
  rooms //寝室房间号
}