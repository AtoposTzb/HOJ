<template>
  <div class="daily-quote-container">
    <!-- 每日一言 -->
    <el-card class="daily-quote-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span class="panel-title home-title">
          <i class="el-icon-chat-dot-round"></i>
          每日一言
        </span>
        <el-button 
          style="float: right; padding: 3px 0" 
          type="text" 
          @click="refreshQuote"
          :loading="quoteLoading"
        >
          <i class="el-icon-refresh"></i>
          刷新
        </el-button>
      </div>
      <div class="quote-content">
        <p class="quote-text">{{ quote.hitokoto || '加载中...' }}</p>
        <p class="quote-from" v-if="quote.from">
          —— {{ quote.from }}
          <span v-if="quote.from_who">「{{ quote.from_who }}」</span>
        </p>
      </div>
    </el-card>

    <!-- 倒计时 -->
    <el-card class="countdown-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span class="panel-title home-title">
          <i class="el-icon-time"></i>
          赛事倒计时
        </span>
      </div>
      <div class="countdown-content">
        <div 
          class="countdown-item" 
          v-for="contest in contestList" 
          :key="contest.name"
          :style="{ borderLeftColor: contest.color }"
        >
          <div class="countdown-label">
            <i :class="contest.icon" :style="{ color: contest.color }"></i>
            距离 {{ contest.name }}
          </div>
          <div 
            class="countdown-value" 
            :style="{ 
              color: contest.color, 
              borderColor: contest.color 
            }"
          >
            {{ getContestCountdown(contest) }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DailyQuote',
  data() {
    return {
      quote: {
        hitokoto: '',
        from: '',
        from_who: ''
      },
      quoteLoading: false,
      countdownTimer: null,
      // 直接在组件内定义比赛数据
      contestList: [
        {
          name: 'CSP-J/S 2025 第一轮',
          date: new Date('2025-09-19'),
          color: '#409EFF',
          icon: 'el-icon-edit-outline'
        },
        {
          name: 'CSP-J/S 2025 第二轮',
          date: new Date('2025-10-24'),
          color: '#67C23A',
          icon: 'el-icon-document'
        },
        {
          name: 'NOI 2025',
          date: new Date('2025-07-12'),
          color: '#F56C6C',
          icon: 'el-icon-trophy'
        },        
        {
          name: 'NOIP 2025',
          date: new Date('2025-11-29'),
          color: '#E6A23C',
          icon: 'el-icon-medal'
        }
      ]
    }
  },
  mounted() {
    this.getQuote()
    this.updateCountdown()
    // 每分钟更新一次倒计时
    this.countdownTimer = setInterval(() => {
      this.updateCountdown()
    }, 60000)
  },
  beforeDestroy() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer)
    }
  },
  methods: {
    async getQuote() {
      this.quoteLoading = true
      try {
        const response = await fetch('https://v1.hitokoto.cn/?c=i&c=k&c=d')
        const data = await response.json()
        this.quote = {
          hitokoto: data.hitokoto,
          from: data.from,
          from_who: data.from_who
        }
      } catch (error) {
        console.error('获取每日一言失败:', error)
        const defaultQuotes = [
          { text: '今天也要加油刷题哦！', from: 'Yolo_T', author: '唐' },
          { text: '每一道AC的题目都是进步的阶梯。', from: 'Yolo_T', author: '唐' },
          { text: '算法之美，在于逻辑与创造的完美结合。', from: 'Yolo_T', author: '唐' },
          { text: '九十九次的理论不如一次的行动来得实际。', from: 'Yolo_T', author: '唐' },
          { text: '做决定之前仔细考虑，一旦作了决定就要勇往直前、坚持到底。', from: 'Yolo_T', author: '唐' },
          { text: '预测未来的最好方法，就是创造未来。', from: 'Yolo_T', author: '' },
          { text: '细节决定成功，点滴铸就辉煌。', from: 'Yolo_T', author: '唐' },
        ]
        const randomQuote = defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)]
        this.quote = {
          hitokoto: randomQuote.text,
          from: randomQuote.from,
          from_who: randomQuote.author
        }
      } finally {
        this.quoteLoading = false
      }
    },
    refreshQuote() {
      this.getQuote()
    },
    updateCountdown() {
      this.$forceUpdate()
    },
    getContestCountdown(contest) {
      const now = new Date()
      const diff = contest.date - now
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        return `还有 ${days} 天`
      } else {
        return '已结束'
      }
    }
  }
}
</script>

<style scoped>
.daily-quote-container {
  margin-bottom: 20px;
}

.daily-quote-card,
.countdown-card {
  margin-bottom: 15px;
}

.quote-content {
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
}

.quote-text {
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 10px 0;
  color: #333;
  font-style: italic;
  text-align: center;
}

.quote-from {
  font-size: 12px;
  color: #666;
  text-align: right;
  margin: 0;
}

.countdown-content {
  padding: 5px 0;
}

.countdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px 15px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 6px;
  border-left: 4px solid #409EFF;
  transition: all 0.3s ease;
}

.countdown-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.countdown-item:last-child {
  margin-bottom: 0;
}

.countdown-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
  display: flex;
  align-items: center;
  flex: 1;
}

.countdown-label i {
  margin-right: 6px;
  font-size: 14px;
}

.countdown-value {
  font-size: 14px;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid;
  white-space: nowrap;
}

@media screen and (max-width: 768px) {
  .countdown-item {
    padding: 10px 12px;
    flex-direction: column;
    text-align: center;
  }
  
  .countdown-label {
    margin-bottom: 6px;
    justify-content: center;
    font-size: 12px;
  }
  
  .countdown-value {
    font-size: 13px;
    padding: 3px 8px;
  }
}
</style>