import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Pause,
  Play,
  Zap,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ceremonyPhoto from './assets/ceremony-photo.jpg';

// --- Types & Data ---

// 历年改善数据 - 按日期排序
const IMPROVEMENTS_HISTORY = [
  { date: '2017-03-01', title: '功率模块组装流水线', award: '一等奖' },
  { date: '2018-05-01', title: '功率模块智能精益工位', award: '二等奖' },
  { date: '2019-06-01', title: '功率模块试验区搬运助力臂', award: '二等奖' },
  { date: '2022-05-01', title: 'IGBT自动涂敷检测拧紧产线', award: '一等奖' },
  { date: '2023-06-01', title: '水冷基板组成搬运助力臂', award: '三等奖' },
  { date: '2023-07-01', title: '风冷功率模块脉动式组装流水线', award: '二等奖' },
  { date: '2023-07-01', title: '水冷功率模块综合产能提升', award: '二等奖' },
  { date: '2023-11-01', title: '功率模块辅助自动测试程序', award: '二等奖' },
  { date: '2024-01-31', title: '3D打印线束内外弯曲半径量规', award: '三等奖' },
  { date: '2024-07-01', title: '导热硅脂搅拌方式升级', award: '三等奖' },
  { date: '2024-07-01', title: '功率模块门控线接线视觉防错', award: '一等奖' },
  { date: '2024-09-01', title: '功率模块负载测试区门禁升级', award: '三等奖' },
  { date: '2024-09-30', title: 'IGBT拧紧顺序视觉控制系统', award: '一等奖' },
  { date: '2024-10-07', title: '功率模块试验台温度传感器固定机构', award: '二等奖' }
];

const RECENT_IMPROVEMENTS = [
  { date: '2025-05-01', title: '功率模块把手螺纹改善' },
  { date: '2025-07-01', title: '功率模块低压电源线接线方式改善' },
  { date: '2025-07-01', title: '功率模块绝缘耐压区无纸化改善' },
  { date: '2025-09-01', title: 'CR450牵引模块测试测试线束' },
  { date: '2025-09-01', title: '功率模块相间隔离材质改善' },
  { date: '2025-09-01', title: '功率模块产线物料车改造' },
  { date: '2025-10-01', title: '地铁功率模块例行试验台' },
  { date: '2025-11-01', title: '功率模块IGBT门控线端子紧固状态检查' },
  { date: '2025-11-01', title: '叉式连接器螺钉拧紧控制优化' },
  { date: '2025-12-01', title: '可堆叠3D打印标准件托盘' },
  { date: '2026-01-01', title: '功率模块IGBT手动涂敷信息自动记录与报告生成' }
];

// 2026年计划数据
const PLAN_2026 = [
  { date: '2026-04-01', title: '风冷功率模块自动测试试验台' },
  { date: '2026-04-01', title: '适配板端子螺钉烧死视觉检查' },
  { date: '2026-07-01', title: 'IGBT自动涂敷检测拧紧产线升级改造' },
  { date: '2026-07-01', title: '组装流水线托盘及母排、水冷基板料车工装升级' },
  { date: '2026-08-01', title: '功率模块各产线工位与手动涂敷、拧紧数据联通' },
  { date: '2026-09-01', title: '通用功率器件自动涂敷机' },
  { date: '2026-09-30', title: '功率模块NCR区域综合升级' },
  { date: '2026-11-01', title: '水冷功率模块自动测试试验台' }
];

// --- Components ---

const SlideWrapper: React.FC<{ children: React.ReactNode; title: string; icon: React.ElementType }> = ({ children, title, icon: Icon }) => (
  <div className="h-full w-full flex flex-col p-8 bg-[#0A0A0B] text-[#E0E0E0] border border-[#1A1A1C] shadow-2xl relative overflow-hidden">
    {/* Background Decorative Elements */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent opacity-50" />
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#00F5FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

    <header className="flex justify-between items-end mb-8 relative z-10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-[#1A1A1C] border border-[#333] rounded-lg">
          <Icon className="w-8 h-8 text-[#00F5FF]" />
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-[#00F5FF]">{title}</h2>
          <p className="text-xs tracking-[0.3em] text-[#666] uppercase mt-1">Industrial Intelligence / Real-time Data</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-mono font-bold text-[#FF6B00]">
          {new Date().toLocaleTimeString('zh-CN', { hour12: false })}
        </div>
        <div className="text-[10px] tracking-widest text-[#444] uppercase">
          {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })} {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][new Date().getDay()]}
        </div>
      </div>
    </header>

    <main className="flex-1 relative z-10">
      {children}
    </main>

    <footer className="mt-8 flex justify-between items-center text-[10px] tracking-widest text-[#333] uppercase border-t border-[#1A1A1C] pt-4">
      <div>DeepMind Industrial Solution v4.5</div>
      <div>Status: Connected / High Priority Sync</div>
    </footer>
  </div>
);

// 第一页：质量现状（上下布局）
const QualityStatus = () => (
  <SlideWrapper title="质量现状" icon={ShieldCheck}>
    <div className="flex flex-col h-full">
      {/* 上部区域：文字内容（占1/3） */}
      <div className="flex-[1] flex items-center justify-center">
        <div className="flex items-center gap-12 w-full max-w-4xl">
          {/* 〇安监突出显示 */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-[#00F5FF] opacity-10 blur-3xl" />
            <div className="relative bg-gradient-to-br from-[#1A1A1C] to-[#111] border-2 border-[#00F5FF] p-6 rounded-lg">
              <div className="text-center">
                <div className="text-[6rem] font-black text-[#00F5FF] leading-none tracking-tighter">〇</div>
                <div className="text-3xl font-bold text-white mt-2 tracking-widest">安 监</div>
              </div>
            </div>
          </div>

          {/* 坚持技防 */}
          <div className="flex-1">
            <div className="text-[4rem] font-black text-white tracking-widest leading-tight">
              坚持技防
            </div>
          </div>

          {/* 班组介绍 */}
          <div className="flex-[2] bg-[#111] border-l-4 border-[#FF6B00] p-5">
            <p className="text-2xl text-[#CCC] leading-relaxed">
              模块班组自<span className="text-[#00F5FF] font-bold">2015年</span>成立以来，已累计生产各类型模块近<span className="text-[#FF6B00] font-bold">20000台</span>，从未发生过因生产制造环节产生的安全和重大质量问题。
            </p>
          </div>
        </div>
      </div>

      {/* 下部区域：照片（占2/3） */}
      <div className="flex-[2] flex justify-center items-center">
        <div className="relative group h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-[#00F5FF] opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
          <img 
            src={ceremonyPhoto} 
            alt="下线10000台仪式合影" 
            className="relative max-w-full max-h-full object-contain rounded-lg border-2 border-[#333] group-hover:border-[#00F5FF] transition-colors"
          />
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const ImprovementBoard: React.FC<{
  title: string;
  items: Array<{ date: string; title: string; award?: string }>;
  accentLabel: string;
}> = ({ title, items, accentLabel }) => {
  const allImprovements = useMemo(() => {
    return [...items]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((item, index) => ({
        ...item,
        id: index,
        year: new Date(item.date).getFullYear(),
      }));
  }, [items]);

  const columns = useMemo(() => {
    const result = [[], [], []] as typeof allImprovements[];
    allImprovements.forEach((item, index) => {
      result[index % 3].push(item);
    });
    return result;
  }, [allImprovements]);

  const getAwardColor = (award?: string) => {
    switch (award) {
      case '一等奖': return '#FF6B00';
      case '二等奖': return '#00F5FF';
      case '三等奖': return '#A3A3A3';
      default: return '#7CFF7C';
    }
  };

  return (
    <SlideWrapper title={title} icon={Award}>
      <div className="h-full flex flex-col">
        <div className="flex-1 flex gap-4 overflow-hidden">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-1">
              {col.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#111] border border-[#222] p-3 hover:border-[#00F5FF] transition-colors group flex-shrink-0"
                >
                  {/* 年份和日期 */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#00F5FF]">{item.year}年</span>
                    <span className="text-xs text-[#666]">{item.date}</span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-[#00F5FF] transition-colors leading-tight mb-2">
                    {item.title}
                  </h4>

                  <div className="flex justify-end">
                    <span 
                      className="px-3 py-1 text-xs font-bold rounded"
                      style={{ 
                        backgroundColor: `${getAwardColor(item.award)}20`,
                        color: getAwardColor(item.award)
                      }}
                    >
                      {item.award}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-8 mt-4 pt-4 border-t border-[#1A1A1C]">
          <div className="text-center">
            <div className="text-2xl font-black text-[#00F5FF]">{allImprovements.length}</div>
            <div className="text-xs text-[#666]">{accentLabel}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-[#FF6B00]">{columns.length}</div>
            <div className="text-xs text-[#666]">展示列数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-[#7CFF7C]">
              {new Set(allImprovements.map((i) => i.year)).size}
            </div>
            <div className="text-xs text-[#666]">覆盖年份</div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

const ImprovementTimeline = () => (
  <ImprovementBoard
    title="历年改善成果及获奖情况"
    items={IMPROVEMENTS_HISTORY}
    accentLabel="改善成果"
  />
);

const ImprovementTimelineRecent = () => (
  <ImprovementBoard
    title="2025年-2026年初已实施改善"
    items={RECENT_IMPROVEMENTS}
    accentLabel="新增项目"
  />
);

// 第三页：2026年计划时间轴
const Plan2026Timeline = () => {
  // 按月份分组
  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: typeof PLAN_2026 } = {};
    PLAN_2026.forEach(item => {
      const month = item.date.substring(5, 7);
      if (!groups[month]) groups[month] = [];
      groups[month].push(item);
    });
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  const monthNames: { [key: string]: string } = {
    '04': '四月', '05': '五月', '06': '六月', '07': '七月',
    '08': '八月', '09': '九月', '10': '十月', '11': '十一月', '12': '十二月'
  };

  return (
    <SlideWrapper title="2026年改善计划" icon={Zap}>
      <div className="h-full">
        {/* 标题区域 */}
        <div className="flex items-center justify-center mb-8">
          <div className="text-[6rem] font-black text-[#00F5FF] leading-none">2026</div>
          <div className="ml-4 text-2xl text-[#666] uppercase tracking-widest">年度计划</div>
        </div>

        {/* 计划时间轴 */}
        <div className="flex gap-6 overflow-x-auto h-[calc(100%-150px)] pb-4 custom-scrollbar">
          {groupedByMonth.map(([month, items]) => (
            <div key={month} className="flex-shrink-0 w-64 bg-[#111] border border-[#222] rounded-lg overflow-hidden group hover:border-[#00F5FF] transition-colors">
              {/* 月份头部 */}
              <div className="bg-gradient-to-r from-[#00F5FF]/20 to-transparent p-4 border-b border-[#222]">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#00F5FF]" />
                  <span className="text-2xl font-bold text-[#00F5FF]">{monthNames[month] || month}</span>
                </div>
              </div>
              
              {/* 该月的计划项 */}
              <div className="p-4 space-y-4">
                {items.map((item, idx) => (
                  <div key={`${month}-${idx}`} className="bg-[#1A1A1C] border-l-2 border-[#FF6B00] p-3 hover:bg-[#222] transition-colors">
                    <div className="text-xs text-[#666] mb-1">{item.date}</div>
                    <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 底部统计 */}
        <div className="absolute bottom-20 right-8 flex gap-8">
          <div className="text-center">
            <div className="text-4xl font-black text-[#00F5FF]">{PLAN_2026.length}</div>
            <div className="text-xs text-[#666] uppercase tracking-wider">项计划</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-[#FF6B00]">{groupedByMonth.length}</div>
            <div className="text-xs text-[#666] uppercase tracking-wider">个时间节点</div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};

// --- Main App ---

export default function EKanbanApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [intervalTime, setIntervalTime] = useState(10); // seconds
  const [isLocked, setIsLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);

  const slides = useMemo(() => [
    <QualityStatus />,
    <ImprovementTimeline />,
    <ImprovementTimelineRecent />,
    <Plan2026Timeline />
  ], []);

  const nextSlide = useCallback(() => {
    if (!isLocked) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  }, [isLocked, slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && !isLocked) {
      timer = setInterval(nextSlide, intervalTime * 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [isPlaying, intervalTime, nextSlide, isLocked]);

  useEffect(() => {
    if (!window.electronAPI) return;

    let mounted = true;
    window.electronAPI.getFullscreenState().then((value) => {
      if (mounted) setIsFullscreen(value);
    });

    const unsubscribe = window.electronAPI.onFullscreenChanged((value) => {
      setIsFullscreen(value);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!window.electronAPI) return;
    const nextValue = await window.electronAPI.setFullscreenState(!isFullscreen);
    setIsFullscreen(nextValue);
  }, [isFullscreen]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col font-sans select-none cursor-crosshair">
      {/* Top Progress Bar */}
      <div className="h-1 bg-[#1A1A1C] w-full flex">
        {slides.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full relative"
          >
            <motion.div
              className={`h-full ${i === currentSlide ? 'bg-[#00F5FF]' : 'bg-transparent'}`}
              initial={false}
              animate={{
                width: i === currentSlide && isPlaying && !isLocked ? '100%' : '100%',
                opacity: i === currentSlide ? 1 : 0
              }}
              transition={{ duration: intervalTime, ease: "linear" }}
            />
          </div>
        ))}
      </div>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute inset-0"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Overlay - Hidden by default, visible on hover at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center gap-6 bg-black/80 backdrop-blur-md border border-[#333] px-8 py-4 rounded-2xl z-50">
        <button onClick={prevSlide} className="text-[#666] hover:text-[#00F5FF]"><ChevronLeft size={24} /></button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 rounded-full bg-[#1A1A1C] flex items-center justify-center text-white hover:bg-[#333]"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={nextSlide} className="text-[#666] hover:text-[#00F5FF]"><ChevronRight size={24} /></button>

        <div className="w-px h-8 bg-[#333]" />

        <div className="flex items-center gap-4">
          <label className="text-[10px] text-[#555] uppercase tracking-widest">Interval</label>
          <select
            value={intervalTime}
            onChange={(e) => setIntervalTime(Number(e.target.value))}
            className="bg-[#111] border border-[#333] text-xs px-2 py-1 outline-none"
          >
            <option value={5}>5s</option>
            <option value={10}>10s</option>
            <option value={20}>20s</option>
            <option value={60}>60s</option>
          </select>
        </div>

        <button
          onClick={() => setIsLocked(!isLocked)}
          className={`flex items-center gap-2 px-4 py-2 border rounded transition-colors ${isLocked ? 'border-[#FF6B00] text-[#FF6B00]' : 'border-[#333] text-[#666]'}`}
        >
          <Settings size={16} />
          <span className="text-[10px] uppercase font-bold tracking-widest">{isLocked ? 'PINNED' : 'AUTO'}</span>
        </button>

        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-2 px-4 py-2 border border-[#333] rounded text-[#666] transition-colors hover:border-[#00F5FF] hover:text-[#00F5FF]"
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          <span className="text-[10px] uppercase font-bold tracking-widest">
            {isFullscreen ? 'EXIT FULLSCREEN' : 'ENTER FULLSCREEN'}
          </span>
        </button>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-1 transition-all duration-500 ${i === currentSlide ? 'h-12 bg-[#00F5FF]' : 'h-4 bg-[#333] hover:bg-[#666]'}`}
          />
        ))}
      </div>
    </div>
  );
}
