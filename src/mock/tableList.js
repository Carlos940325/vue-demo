export const mockList = () => {
  let firstName = [
    "赵",
    "钱",
    "孙",
    "李",
    "周",
    "吴",
    "郑",
    "王",
    "刘",
    "张",
    "郭",
    "姚",
  ];
  let lastName = ["湿", "凤", "啊", "树", "飞", "鹏", "亮", "传", "噢", "胜"];
  let job = [
    "前端开发工程师",
    "git代码管理工程师",
    "后端开发工程师",
    "JavaScript开发",
    "Java开发",
    "小程序开发",
    "Node.JS",
  ];
  let type = ["纸质签署", "电子签署", "手写"];
  let detail = [
    "窗前明月光",
    "疑是地上霜",
    "粒粒皆辛苦",
    "疑是银河落九天",
    "一人我饮酒醉",
    "老毕鞥",
  ];
  let list = [];
  for (let i = 0; i < 1000; i++) {
    let randomNum = (Math.random() * 10).toFixed(0);
    list.push({
      id: i + 1,
      name: firstName[randomNum] + lastName[randomNum],
      times: Math.ceil(Math.random() * 9),
      jobs: job[randomNum],
      types: type[(Math.random() * 3).toFixed(0)],
      salary: (Math.random() * 50000).toFixed(0),
      detailEvent: detail[randomNum],
    });
  }
  return list;
};

export const allJobs = [
  { label: "前端开发工程师", value: "1" },
  { label: "git代码管理工程师", value: "2" },
  { label: "后端开发工程师", value: "3" },
  { label: "JavaScript开发", value: "4" },
  { label: "Java开发", value: "5" },
  { label: "小程序开发", value: "6" },

  { label: "Node.JS", value: "7" },
];

export const allTypes = [
  { label: "纸质签署", value: 1 },
  { label: "电子签署", value: 2 },
  { label: "手写", value: 3 },
];
