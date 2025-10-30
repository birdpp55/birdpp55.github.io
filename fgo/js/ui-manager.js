// ui-manager.js - 万圣节抽卡模拟器界面管理

class UIManager {
    constructor() {
        this.cardDisplayEl = document.getElementById('cardDisplay');
        this.historyListEl = document.getElementById('historyList');
        this.pullAnimationEl = document.getElementById('pullAnimation');
        this.animatedCardEl = document.getElementById('animatedCard');
        
        // 统计元素
        this.coinCountEl = document.getElementById('coinCount');
        this.totalPullsEl = document.getElementById('totalPulls');
        this.legendaryCountEl = document.getElementById('legendaryCount');
        this.epicCountEl = document.getElementById('epicCount');

        // 创建卡片详情模态框和十连抽结果页面
        this.createCardDetailModal();
        this.createMultiPullResults();
        this.createCompletionCelebration(); // 新增：创建全收集庆祝效果
        
        // 存储当前卡片数据
        this.currentMultiPullCards = [];
    }

    // 创建全角色收集庆祝效果
    createCompletionCelebration() {
        this.completionCelebration = document.createElement('div');
        this.completionCelebration.className = 'completion-celebration';
        this.completionCelebration.style.display = 'none';
        this.completionCelebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-image"></div>
                <h2 class="celebration-title">恭喜！</h2>
                <p class="celebration-message">您已收集所有角色！</p>
                <button class="celebration-close">确定</button>
            </div>
        `;
        document.body.appendChild(this.completionCelebration);

        // 绑定关闭事件
        this.completionCelebration.querySelector('.celebration-close').addEventListener('click', () => {
            this.hideCompletionCelebration();
        });
    }

    // 显示全角色收集庆祝效果
    showCompletionCelebration() {
        this.completionCelebration.style.display = 'flex';
        
        // 添加庆祝动画
        setTimeout(() => {
            this.completionCelebration.classList.add('active');
        }, 100);
    }

    // 隐藏全角色收集庆祝效果
    hideCompletionCelebration() {
        this.completionCelebration.classList.remove('active');
        setTimeout(() => {
            this.completionCelebration.style.display = 'none';
        }, 500);
    }

    // 创建卡片详情模态框
    createCardDetailModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'card-modal';
        this.modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="card-detail">
                    <div class="detail-image"></div>
                    <div class="detail-info">
                        <h3 class="detail-name"></h3>
                        <div class="detail-rarity"></div>
                        <div class="detail-class"></div>
                        <div class="detail-skills"></div>
                        <div class="detail-count"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);

        // 绑定关闭事件
        this.modal.querySelector('.close-modal').addEventListener('click', () => {
            this.hideCardDetail();
        });

        // 点击模态框背景关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideCardDetail();
            }
        });
    }

    // 创建十连抽结果页面
    createMultiPullResults() {
        this.multiPullResults = document.createElement('div');
        this.multiPullResults.className = 'multi-pull-results';
        this.multiPullResults.style.display = 'none';
        this.multiPullResults.innerHTML = `
            <div class="multi-pull-header">
                <h2>十连抽结果</h2>
                <p>点击卡片查看详情</p>
            </div>
            <div class="multi-pull-cards" id="multiPullCards"></div>
            <button class="close-multi-pull">关闭</button>
        `;
        document.body.appendChild(this.multiPullResults);

        // 绑定关闭事件
        this.multiPullResults.querySelector('.close-multi-pull').addEventListener('click', () => {
            this.hideMultiPullResults();
        });
    }

    // 显示十连抽结果 - 显示实际的10张卡（包括重复）
    showMultiPullResults(cards) {
        // 存储当前卡片数据
        this.currentMultiPullCards = cards;
        
        const cardsContainer = this.multiPullResults.querySelector('#multiPullCards');
        cardsContainer.innerHTML = '';
        
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = `card rare-${card.rare}`;
            cardElement.style.backgroundImage = `url(${card.class_image})`;
            cardElement.innerHTML = `
                <div class="card-info">
                    <div class="card-name">${card.name}</div>
                    <div class="card-class">${card.class}</div>
                    <div class="card-rarity">${this.getRarityStars(card.rare)}</div>
                </div>
            `;
            
            // 添加点击事件
            cardElement.addEventListener('click', () => {
                this.showCardDetail(card);
            });
            
            cardsContainer.appendChild(cardElement);
        });
        
        this.multiPullResults.style.display = 'flex';
    }

    // 隐藏十连抽结果
    hideMultiPullResults() {
        this.multiPullResults.style.display = 'none';
        
        // 清空当前卡片数据
        this.currentMultiPullCards = [];
    }

    // 显示卡片详情 - 使用image而不是class_image
    showCardDetail(card, count = 1) {
        const modal = this.modal;
        const detailImage = modal.querySelector('.detail-image');
        
        // 使用角色图片(image)而不是职阶图片(class_image)
        detailImage.style.backgroundImage = `url(${card.image})`;
        detailImage.onerror = function() {
            // 如果图片加载失败，显示默认图片
            this.style.backgroundImage = 'url(images/pic/default.jpg)';
            this.style.backgroundColor = '#333';
        };
        
        modal.querySelector('.detail-name').textContent = card.name;
        modal.querySelector('.detail-rarity').innerHTML = `稀有度: ${this.getRarityStars(card.rare)}`;
        modal.querySelector('.detail-class').textContent = `职阶: ${card.class}`;
        modal.querySelector('.detail-skills').innerHTML = `技能: ${card.skill.join(', ')}`;
        
        // 显示卡片数量
        if (count > 1) {
            modal.querySelector('.detail-count').textContent = `已拥有: ${count}张`;
            modal.querySelector('.detail-count').style.display = 'block';
        } else {
            modal.querySelector('.detail-count').style.display = 'none';
        }
        
        modal.style.display = 'block';
    }

    // 隐藏卡片详情
    hideCardDetail() {
        this.modal.style.display = 'none';
    }

    // 显示单张卡片动画 - 调整尺寸以匹配图片
    async showPullAnimation(card) {
        this.animatedCardEl.className = `animated-card rare-${card.rare}`;
        // 使用职阶图片作为背景，与十连抽保持一致
        this.animatedCardEl.style.backgroundImage = `url(${card.class_image})`;
        this.animatedCardEl.innerHTML = `
            <div class="card-info">
                <div class="card-name">${card.name}</div>
                <div class="card-class">${card.class}</div>
                <div class="card-rarity">${this.getRarityStars(card.rare)}</div>
            </div>
        `;
        
        // 调整单抽卡片尺寸以匹配图片
        this.animatedCardEl.style.width = '300px';
        this.animatedCardEl.style.height = '450px';
        
        this.pullAnimationEl.classList.add('active');
        
        return new Promise(resolve => {
            setTimeout(() => {
                this.pullAnimationEl.classList.remove('active');
                resolve();
            }, 2000);
        });
    }

    // 渲染卡片收集情况（重复卡折叠显示）- 用于主展示区域
    renderCardCollection(cardCollection) {
        this.cardDisplayEl.innerHTML = '';
        
        Object.values(cardCollection).forEach(item => {
            const card = item.card;
            const count = item.count;
            
            const cardElement = document.createElement('div');
            cardElement.className = `card rare-${card.rare} collected-card`;
            cardElement.style.backgroundImage = `url(${card.class_image})`;
            cardElement.innerHTML = `
                <div class="card-info">
                    <div class="card-name">${card.name}</div>
                    <div class="card-class">${card.class}</div>
                    <div class="card-rarity">${this.getRarityStars(card.rare)}</div>
                </div>
                ${count > 1 ? `<div class="card-count">×${count}</div>` : ''}
            `;
            
            // 添加鼠标悬停提示
            if (count > 1) {
                cardElement.title = `已拥有 ${count} 张`;
            }
            
            // 添加点击事件
            cardElement.addEventListener('click', () => {
                this.showCardDetail(card, count);
            });
            
            this.cardDisplayEl.appendChild(cardElement);
        });
    }

    // 添加记录到历史
    addToHistory(card) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        historyItem.innerHTML = `
            <span>${card.name}</span>
            <span class="rarity-badge rare-${card.rare}">${this.getRarityStars(card.rare)}</span>
        `;
        
        this.historyListEl.prepend(historyItem);
        
        // 限制历史记录数量
        if (this.historyListEl.children.length > 10) {
            this.historyListEl.removeChild(this.historyListEl.lastChild);
        }
    }

    // 获取稀有度星星显示
    getRarityStars(rare) {
        return '★'.repeat(rare);
    }

    // 更新UI显示
    updateUI(gameState) {
        this.coinCountEl.textContent = gameState.coins;
        this.totalPullsEl.textContent = gameState.totalPulls;
        this.legendaryCountEl.textContent = gameState.legendaryCount;
        this.epicCountEl.textContent = gameState.epicCount;
    }

    // 显示消息
    showMessage(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        
        messageEl.style.position = 'fixed';
        messageEl.style.top = '20px';
        messageEl.style.right = '20px';
        messageEl.style.padding = '15px 25px';
        messageEl.style.borderRadius = '10px';
        messageEl.style.color = 'white';
        messageEl.style.zIndex = '1001';
        messageEl.style.fontSize = '1rem';
        messageEl.style.fontWeight = 'bold';
        
        if (type === 'error') {
            messageEl.style.backgroundColor = 'var(--halloween-red)';
            messageEl.style.boxShadow = '0 5px 15px rgba(255, 0, 60, 0.4)';
        } else {
            messageEl.style.backgroundColor = 'var(--halloween-green)';
            messageEl.style.boxShadow = '0 5px 15px rgba(55, 255, 0, 0.4)';
        }
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            if (document.body.contains(messageEl)) {
                document.body.removeChild(messageEl);
            }
        }, 3000);
    }
}