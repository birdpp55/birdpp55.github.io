// 卡片数据
const cardData = [
    {
        id: 0,
        name: "僵尸limboLily",
        class: "avenger",
        skill: ["【早处死 C】赋予敌方全体魅惑状态，防御力降低（30%，3回合），赋予己方全体30%魅惑特攻状态（3回合），弱化耐性下降（3回合）"],
        rare: 3,
        image: "images/pic/0.jpg",
        class_image: "images/class/avenger3.png"
    },
    {
        id: 1,
        name: "猫",
        class: "berserker", 
        skill: ["【变化（猫）A】HP上限提升（5000HP，3回合），解除自身异常状态，自身的防御力提升（30%,3回合）"],
        rare: 3,
        image: "images/pic/1.jpg",
        class_image: "images/class/berserker3.png"
    },
    {
        id: 2,
        name: "科学怪人douman",
        class: "berserker",
        skill: ["【过载 A】赋予自身宝具威力提升（50%，1回合），赋予自身即死无效效果"],
        rare: 3,
        image: "images/pic/2.jpg",
        class_image: "images/class/berserker3.png"
    },
    {
        id: 3,
        name: "濡女(summer)",
        class: "assassin",
        skill: ["【蛇吻 B】赋予敌方全体防御力降低（50%，3回合），全体攻击力降低（50%，3回合），全体三色魔放降低（20%，3回合），全体诅咒状态（5000hp，3回合）"],
        rare: 4,
        image: "images/pic/3.jpg",
        class_image: "images/class/assassin4.png"
    },
    {
        id: 4,
        name: "藤丸立香（black goat）",
        class: "foreigner",
        skill: ["【森之黑山羊 A】150%概率赋予敌方眩晕状态，混乱状态，恐怖状态，赋予己方全体20%攻击力提升+诅咒状态（500hp,3回合）",
          "【拔枪射击 EX】自身充能50%，quick指令卡性能提升30%。"],
        rare: 5,
        image: "images/pic/4.jpg",
        class_image: "images/class/ex25.png"
    },
    {
        id: 5,
        name: "witch maid",
        class: "alterego",
        skill: ["【双重人格 A】自身增伤翻倍，充能翻倍。","【万圣节魔术 E】吸收己方全体正面状态。"],
        rare: 4,
        image: "images/pic/5.jpg",
        class_image: "images/class/alterego4.png"
    },
    {
        id: 6,
        name: "black witch moth",
        class: "caster",
        skill: ["【蜜毒 A】赋予敌方全体中毒效果（500hp,3回合), 赋予己方全体中毒效果（500hp,3回合），对己方中毒效果每个增加20np,20攻击力"],
        rare: 4,
        image: "images/pic/6.jpg",
        class_image: "images/class/caster4.png"
    },
    {
        id: 7,
        name: "阿尔卑斯雪怪",
        class: "pretender",
        skill: ["【黑曜石行尸 A】赋予自身毅力状态（1500hp，3次，5回合），攻击力提升（20%，3回合）暴击威力提升（50%，3回合）"],
        rare: 4,
        image: "images/pic/7.jpg",
        class_image: "images/class/pretender4.png"
    },
    {
        id: 8,
        name: "牧师limbo",
        class: "saber",
        skill: ["【投掷黑键 EX】宝具攻击附加自身攻击力100%+N*10%的伤害，消耗自身“黑键个数”，根据黑键个数提升幅度。暴击获得1个黑键，赋予自身当前回合结束时获得10个“黑键”的状态（3回合）"],
        rare: 5,
        image: "images/pic/8.jpg",
        class_image: "images/class/saber5.png"
    }
];