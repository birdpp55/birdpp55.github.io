class GachaSystem {
    constructor() {
        this.cardData = cardData; // 使用外部cards.js中的数据
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