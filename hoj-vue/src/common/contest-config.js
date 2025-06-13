// 重要比赛日期配置
export const CONTEST_DATES = {
  CSP_JS_2025_ROUND1: {
    name: 'CSP-J/S 2025 第一轮',
    date: new Date('2025-09-21'),
    description: 'CSP-J/S 2025 第一轮认证',
    color: '#409EFF',
    icon: 'el-icon-edit-outline',
    shortName: 'CSP-J/S 一轮',
    order: 1
  },
  CSP_JS_2025_ROUND2: {
    name: 'CSP-J/S 2025 第二轮',
    date: new Date('2025-10-26'),
    description: 'CSP-J/S 2025 第二轮认证',
    color: '#67C23A',
    icon: 'el-icon-document',
    shortName: 'CSP-J/S 二轮',
    order: 2
  },
  NOIP_2025: {
    name: 'NOIP 2025',
    date: new Date('2025-11-16'),
    description: '全国青少年信息学奥林匹克联赛',
    color: '#E6A23C',
    icon: 'el-icon-medal',
    shortName: 'NOIP 2025',
    order: 3
  },
  NOI_2025: {
    name: 'NOI 2025',
    date: new Date('2025-07-20'),
    description: '全国青少年信息学奥林匹克竞赛',
    color: '#F56C6C',
    icon: 'el-icon-trophy',
    shortName: 'NOI 2025',
    order: 4
  }
}

// 获取活跃的比赛（未结束的比赛）- 按指定顺序排列
export function getActiveContests() {
  const now = new Date()
  return Object.values(CONTEST_DATES)
    .filter(contest => contest.date > now)
    .sort((a, b) => a.order - b.order)
}

// 获取所有比赛（包括已结束的）
export function getAllContests() {
  return Object.values(CONTEST_DATES)
    .sort((a, b) => a.order - b.order)
}

// 获取所有比赛（包括已结束的）- 按指定顺序显示
export function getAllContestsWithStatus() {
  const now = new Date()
  return Object.values(CONTEST_DATES)
    .map(contest => ({
      ...contest,
      isActive: contest.date > now
    }))
    .sort((a, b) => a.order - b.order)
}

// 计算距离指定比赛的天数
export function getDaysUntilContest(contestKey) {
  const contest = CONTEST_DATES[contestKey]
  if (!contest) return null
  
  const now = new Date()
  const diff = contest.date - now
  
  if (diff > 0) {
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  } else {
    return -1 // 已结束
  }
}