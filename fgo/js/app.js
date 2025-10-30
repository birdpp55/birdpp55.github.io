class GachaApp {
    constructor() {
        this.gachaSystem = new GachaSystem();
        this.uiManager = new UIManager();
        
        // 游戏状态 - 圣晶石初始300个
        this.gameState = {
            coins: 300,
            totalPulls: 0,
            legendaryCount: 0,
            epicCount: 0,
            pullHistory: [],
            cardCollection: {},
            hasShownCompletion: false // 新增：记录是否已显示全收集提示
        };
        
        this.init();
    }

    // 初始化应用
    init() {
        this.bindEvents();
        this.uiManager.updateUI(this.gameState);
    }

    // 绑定事件
    bindEvents() {
        document.getElementById('singlePull').addEventListener('click', () => {
            this.singlePull();
        });
        
        document.getElementById('multiPull').addEventListener('click', () => {
            this.multiPull();
        });
    }

    // 单抽
    async singlePull() {
        if (this.gameState.coins < 3) {
            this.uiManager.showMessage('圣晶石不足！', 'error');
            return;
        }
        
        this.gameState.coins -= 3;
        this.gameState.totalPulls++;
        
        const card = this.gachaSystem.getRandomCard();
        
        // 先记录卡片
        this.addCardToCollection(card);
        
        // 显示动画
        await this.uiManager.showPullAnimation(card);
        
        // 更新UI
        this.uiManager.updateUI(this.gameState);
        
        // 检查是否收集了全部角色
        this.checkCollectionCompletion();
    }

    // 十连抽
    async multiPull() {
        if (this.gameState.coins < 30) {
            this.uiManager.showMessage('圣晶石不足！', 'error');
            return;
        }
        
        this.gameState.coins -= 30;
        this.gameState.totalPulls += 10;
        
        // 获取10张卡片
        const cards = this.gachaSystem.multiPull(10);
        
        // 将所有卡片添加到收集
        cards.forEach(card => {
            this.addCardToCollection(card);
        });
        
        // 显示十连抽结果页面（显示实际的10张卡）
        this.uiManager.showMultiPullResults(cards);
        
        // 更新UI
        this.uiManager.updateUI(this.gameState);
        
        // 检查是否收集了全部角色
        this.checkCollectionCompletion();
    }

    // 添加卡片到收集
    addCardToCollection(card) {
        // 更新游戏状态
        if (card.rare === 5) this.gameState.legendaryCount++;
        if (card.rare === 4) this.gameState.epicCount++;
        
        // 更新卡片收集情况
        if (!this.gameState.cardCollection[card.id]) {
            this.gameState.cardCollection[card.id] = {
                card: card,
                count: 1
            };
        } else {
            this.gameState.cardCollection[card.id].count++;
        }
        
        // 添加到历史记录
        this.uiManager.addToHistory(card);
        
        // 更新卡片展示（折叠重复卡）
        this.uiManager.renderCardCollection(this.gameState.cardCollection);
    }
    
    // 检查是否收集了全部角色
    checkCollectionCompletion() {
        // 如果已经显示过完成提示，不再检查
        if (this.gameState.hasShownCompletion) return;
        
        // 获取所有卡片的ID
        const allCardIds = this.gachaSystem.cardData.map(card => card.id);
        
        // 获取已收集卡片的ID
        const collectedCardIds = Object.keys(this.gameState.cardCollection);
        
        // 检查是否所有卡片都已收集
        const isComplete = allCardIds.every(id => collectedCardIds.includes(id.toString()));
        
        if (isComplete) {
            this.gameState.hasShownCompletion = true;
            this.uiManager.showCompletionCelebration();
        }
    }
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new GachaApp();
});