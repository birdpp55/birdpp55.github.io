class GachaSystem {
    constructor() {
        this.cardData = cardData; // 使用外部cards.js中的数据
        this.preloadedImages = new Set(); // 存储已预加载的图片
        this.preloadImages(); // 初始化时预加载图片
    }

    // 预加载所有卡片图片
    preloadImages() {
        // 预加载所有卡片的class_image和image
        this.cardData.forEach(card => {
            this.preloadImage(card.class_image);
            this.preloadImage(card.image);
        });
        
        // 预加载庆祝图片
        this.preloadImage('../images/pic/cele.jpg');
    }

    // 预加载单个图片
    preloadImage(src) {
        if (this.preloadedImages.has(src)) return;
        
        const img = new Image();
        img.src = src;
        this.preloadedImages.add(src);
    }

    getRandomCard() {
        const rand = Math.random() * 100;
        let targetRarity;
        
        // 调整概率：5星10%，4星20%，3星70%
        if (rand < 10) { // 5星: 10%
            targetRarity = 5;
        } else if (rand < 30) { // 4星: 20%
            targetRarity = 4;
        } else { // 3星: 70%
            targetRarity = 3;
        }
        
        // 从对应稀有度的卡片中随机选择
        const cardsOfRarity = this.cardData.filter(card => card.rare === targetRarity);
        if (cardsOfRarity.length === 0) {
            // 如果没有该稀有度的卡片，使用3星
            return this.getRandomCard();
        }
        
        const randomIndex = Math.floor(Math.random() * cardsOfRarity.length);
        return cardsOfRarity[randomIndex];
    }

    multiPull(count) {
        const results = [];
        for (let i = 0; i < count; i++) {
            results.push(this.getRandomCard());
        }
        return results;
    }

    // 根据ID获取卡片详情
    getCardById(id) {
        return this.cardData.find(card => card.id === id);
    }
}
