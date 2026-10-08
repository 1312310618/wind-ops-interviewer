(() => {
  'use strict';
  const LEVELS = {
    junior: { label: '初级运维', short: '初级', cue: '基础操作与规范执行', questions: [
      { topic: '从业经历', dim: 'practical', prompt: '请先做一个简短的自我介绍，并说说你接触风电运维的经历：做过哪些巡检、保养或检修工作？你在其中具体负责什么？', follow: '能选一个你亲自参与的现场任务，按“任务目标—你做的步骤—结果”具体讲讲吗？' },
      { topic: '故障排查', dim: 'fault', prompt: '巡检时发现一台机组报“齿轮箱油温高”，同时主控有告警。作为现场运维人员，你会先做什么，再如何配合排查？', follow: '如果油温继续上升而机组尚未停机，你会怎么判断是否需要停机？请说出你会核实的现场信息和汇报对象。', keywords: ['告警', '停机', '油位', '油温', '冷却', '滤芯', '记录', '手册', '主控', '报告', '温度'] },
      { topic: '登塔检修', dim: 'practical', prompt: '说说一次规范的登塔前准备和塔内检修流程。你会检查哪些个人防护装备、工具和现场条件？', follow: '如果上塔途中发现安全带挂点异常，或者天气突然转差，你会如何处置？', keywords: ['工作票', '许可', '安全带', '双钩', '防坠', '天气', '风速', '工具', '监护', '救援'] },
      { topic: '安全规范', dim: 'safety', prompt: '检修电气设备前，怎样确认设备已安全隔离？请结合停电、验电、接地和防止误送电说明你的做法。', follow: '如果验电器没有通过自检、或者工作中有人提出临时送电，你会怎么处理？', keywords: ['工作票', '停电', '验电', '接地', '挂牌', '闭锁', '隔离', '监护', '许可', '送电'] },
      { topic: '机组巡检', dim: 'fault', prompt: '日常巡检发现塔筒内有异响，机组外观暂时没有明显异常。你会如何记录、判断风险并决定下一步？', follow: '你会如何区分需要立即升级处置的信号和可以按计划跟踪的现象？请说明依据。', keywords: ['异响', '振动', '温度', '泄漏', '记录', '趋势', '停机', '告警', '汇报', '检查'] },
      { topic: '复役验收', dim: 'practical', prompt: '检修完成后准备恢复机组运行，你会做哪些收尾、清点和复役确认？', follow: '若复位后告警再次出现，或者现场人员和远程值班的判断不一致，你会怎么做？', keywords: ['工具', '清点', '遗留', '人员', '撤离', '工作票', '验收', '复位', '试运行', '记录', '汇报'] }
    ]},
    mid: { label: '中级运维', short: '中级', cue: '独立诊断与协同处置', questions: [
      { topic: '从业经历', dim: 'practical', prompt: '请概述你的风电运维经历，重点讲一项你独立负责或深度参与的检修任务：设备症状、你的判断、处置过程和最终结果是什么？', follow: '这项工作里最关键的判断依据是什么？如果再做一次，你会在哪个环节做得更好？' },
      { topic: '故障排查', dim: 'fault', prompt: '某机组出现变流器直流母线过压，伴随并网侧告警，复位后短时恢复又重现。你会怎样制定排查顺序并控制风险？', follow: '请具体说说如何区分电网侧扰动、变流器内部故障和测量链路异常；哪些情况你会停止复位并升级处理？', keywords: ['告警', '故障码', '趋势', '复位', '电网', '变流器', '传感器', '测量', '停机', '隔离', '手册', '升级'] },
      { topic: '登塔检修', dim: 'practical', prompt: '你负责组织一次高处更换偏航系统部件的检修。请说明作业方案、人员分工、工器具及现场风险控制。', follow: '若发现吊装条件与方案不符，或关键人员/通讯/救援资源缺位，现场负责人应如何决策？', keywords: ['工作票', '方案', '吊装', '隔离', '防坠', '监护', '风速', '天气', '通讯', '救援', '分工', '验收'] },
      { topic: '安全规范', dim: 'safety', prompt: '检修涉及变桨系统、储能元件和液压蓄能器时，你如何规划能量隔离、验电与残余能量释放？', follow: '隔离后如何验证零能量状态？如果设备状态指示与实际测量不一致，你会采取什么措施？', keywords: ['隔离', '闭锁', '挂牌', '验电', '放电', '残余', '液压', '泄压', '验证', '接地', '监护', '工作票'] },
      { topic: '状态检修', dim: 'fault', prompt: '同一机组齿轮箱振动趋势逐月上升，但还未触发停机阈值。你会如何综合振动、油液、温度和运行工况制定行动？', follow: '如何确认趋势变化真实有效，并设定复测、限制运行、停机检查或升级厂家的决策条件？', keywords: ['趋势', '振动', '油液', '铁谱', '温度', '工况', '阈值', '复测', '停机', '厂家', '对比', '记录'] },
      { topic: '复役验收', dim: 'practical', prompt: '主轴承润滑系统检修后，你如何组织质量验收、试运行和缺陷闭环？', follow: '运行参数短时正常但出现异常声音时，怎样安排持续观察并决定是否验收关闭？', keywords: ['验收', '试运行', '参数', '泄漏', '温度', '振动', '异响', '记录', '缺陷', '闭环', '签字', '观察'] }
    ]},
    senior: { label: '高级运维', short: '高级', cue: '系统判断与现场决策', questions: [
      { topic: '从业经历', dim: 'practical', prompt: '请介绍你负责过的风电运维工作范围，并选一个具有代表性的复杂故障或技改项目，讲清你的决策、团队协同、风险控制和可量化结果。', follow: '当时有哪些备选方案？你如何评估风险和收益，事后又怎样把经验沉淀到团队流程中？' },
      { topic: '复杂故障', dim: 'fault', prompt: '一个风场多台机组在大风天气后陆续出现偏航对风偏差、功率受限和方向传感器告警。你作为现场技术负责人如何判断共因并组织排查？', follow: '怎样用机组间对比、气象数据、事件时序和现场检查验证根因？如何制定分级运行策略并验证纠正措施？', keywords: ['共因', '时序', '对比', '风向', '气象', '传感器', '偏航', '趋势', '根因', '运行策略', '验证', '停机', '数据'] },
      { topic: '重大检修', dim: 'practical', prompt: '请设计一项主轴承更换或大型部件吊装的现场组织思路，覆盖技术方案审查、人员能力、天气窗口、吊装资源、停机范围和应急预案。', follow: '如果窗口期内天气或吊装设备条件越过许可边界，你如何中止作业、保护设备并重新评估恢复条件？', keywords: ['方案', '吊装', '天气', '风速', '许可', '停机', '分工', '资质', '监护', '应急', '撤离', '边界', '评估'] },
      { topic: '安全规范', dim: 'safety', prompt: '检修工作同时涉及电气、液压储能、高处作业和外包队伍。你会如何建立作业许可、能量隔离、接口协调和现场监督机制？', follow: '如果进度压力下有人提出绕过隔离验证或并行交叉作业，你如何当场处置并推动管理层支持？', keywords: ['许可', '工作票', '隔离', '挂牌', '验电', '放电', '液压', '交叉作业', '监护', '外包', '资质', '制止', '管理'] },
      { topic: '根因分析', dim: 'fault', prompt: '某型号机组半年内重复发生变桨电机过温，临时更换电机可恢复但缺陷复发。你如何组织根因分析、确定纠正和预防措施，并判断效果？', follow: '如何区分单机偶发、批次性缺陷和运维策略问题？请说明数据采集、验证周期与变更控制。', keywords: ['根因', '复发', '数据', '趋势', '电流', '温度', '批次', '对比', '措施', '验证', '周期', '变更', '厂家'] },
      { topic: '复役与带教', dim: 'practical', prompt: '重大检修后，你如何设定分阶段复役、验收和运行观察标准？又怎样把现场经验转化为团队能力？', follow: '若复役指标达标但风险仍不确定，你如何设置升级门槛、责任人和退出条件？', keywords: ['复役', '验收', '指标', '观察', '阈值', '退出', '升级', '责任人', '记录', '复盘', '培训', '经验', '闭环'] }
    ]}
  };
  const DIMS = { practical: { name: '实操能力', weight: .36 }, safety: { name: '安全意识', weight: .36 }, fault: { name: '故障判断', weight: .28 } };
  const state = { level: 'junior', questions: [], index: 0, followUps: 0, answers: [], covered: new Set(), awaiting: null, report: null };
  const $ = (id) => document.getElementById(id);
  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const setStep = (n) => { document.querySelectorAll('#steps li').forEach((x,i) => { x.className = i < n ? 'done' : i === n ? 'active' : ''; }); };
  const show = (id) => { document.querySelectorAll('.screen').forEach(x => { x.hidden = x.id !== id; x.classList.toggle('active', x.id === id); }); };
  document.querySelectorAll('.level-option').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.level-option').forEach(x => x.classList.remove('selected')); btn.classList.add('selected'); state.level = btn.dataset.level; }));
  function addMessage(role, text, tag = '') {
    const row = document.createElement('div'); row.className = `message ${role}`;
    row.innerHTML = `<div class="message-avatar">${role === 'user' ? '我' : '风'}</div><div class="bubble-wrap"><div class="message-meta">${role === 'user' ? '候选人 · 刚刚' : `面试官 · ${tag ? '深入追问' : '提问'}`}</div>${tag ? `<div class="followup-tag">${escapeHTML(tag)}</div>` : ''}<div class="bubble">${escapeHTML(text)}</div></div>`;
    $('chatLog').appendChild(row); $('chatLog').scrollTop = $('chatLog').scrollHeight;
  }
  function updateProgress() { const total = state.questions.length; const current = Math.min(state.index + 1, total); $('progressLabel').textContent = `问题 ${current} / ${total}`; $('progressBar').style.width = `${Math.min(100, state.index / total * 100)}%`; $('railDone').textContent = state.answers.length; }
  function askCurrent(prompt, tag = '') { state.awaiting = { prompt, tag }; addMessage('interviewer', prompt, tag); $('answerInput').focus(); updateProgress(); }
  $('startBtn').addEventListener('click', () => {
    state.questions = LEVELS[state.level].questions; state.index = 0; state.followUps = 0; state.answers = []; state.covered = new Set(); state.awaiting = null; state.report = null;
    $('chatLog').innerHTML = ''; $('interviewLevel').textContent = LEVELS[state.level].label; $('railLevel').textContent = LEVELS[state.level].short; show('interviewScreen'); setStep(1);
    addMessage('interviewer', `你好，欢迎参加风电运维岗位模拟面试。本次按${LEVELS[state.level].label}标准进行，预计 6 个主题问题。我会根据你的回答追问具体处置步骤。请尽量讲清现场依据和安全措施。`);
    setTimeout(() => askCurrent(state.questions[0].prompt), 250);
  });
  $('answerForm').addEventListener('submit', (e) => {
    e.preventDefault(); const text = $('answerInput').value.trim(); if (!text || !state.awaiting) return;
    const current = state.awaiting; addMessage('user', text); $('answerInput').value = ''; state.answers.push({ topic: current.tag ? state.questions[state.index].topic : state.questions[state.index].topic, text, followUp: !!current.tag }); $('railDone').textContent = state.answers.length;
    if (current.tag) { state.followUps = 0; state.index++; nextOrFinish(); return; }
    const q = state.questions[state.index]; state.covered.add(q.topic);
    const shouldFollow = shouldAskFollowUp(q, text);
    if (shouldFollow) { state.followUps = 1; setTimeout(() => askCurrent(q.follow, '现场细节追问'), 250); }
    else { state.followUps = 0; setTimeout(() => { state.index++; nextOrFinish(); }, 250); }
  });
  function shouldAskFollowUp(q, text) {
    const s = text.toLowerCase();
    // Trigger an adaptive probe when answers are very brief, omit concrete action language,
    // or contain a high-risk shortcut. The interviewer always asks at least one safety probe.
    const action = /(先|然后|接着|检查|确认|隔离|停机|汇报|记录|验证|测量|分析|处置|制定|评估|组织|判断|方案|步骤|依据)/.test(s);
    const risky = /(直接复位|带电检修|不用停机|不需要隔离|先送电|先上去看看)/.test(s);
    const safetyProbe = q.dim === 'safety' && !/(验电|挂牌|隔离|工作票|监护|接地|闭锁|停电|许可)/.test(s);
    const hasPromptSignal = q.keywords ? q.keywords.some(k => s.includes(k.toLowerCase())) : text.length > 70;
    return risky || safetyProbe || text.length < 45 || !action || !hasPromptSignal;
  }
  function nextOrFinish() {
    if (state.index >= state.questions.length) { finish(); return; }
    setTimeout(() => askCurrent(state.questions[state.index].prompt), 250);
  }
  $('endEarlyBtn').addEventListener('click', () => { if (state.answers.length) finish(); else { addMessage('interviewer','回答至少一个问题后即可生成练习报告。'); } });
  function evaluateAnswer(q, text) {
    const s = text.toLowerCase(); const words = q.keywords || [];
    const matched = words.filter(k => s.includes(k.toLowerCase()));
    let score = Math.min(100, 24 + Math.min(matched.length, 6) * 9 + Math.min(Math.floor(text.length / 55), 4) * 5);
    const safetyTerms = ['工作票','隔离','验电','挂牌','接地','监护','停机','许可','闭锁','防坠','救援'];
    const safetyHits = safetyTerms.filter(k => s.includes(k)).length;
    if (q.dim === 'safety') score = Math.min(100, score + safetyHits * 5);
    if (/(直接复位|带电检修|不用停机|不需要隔离|先送电|跳过.*隔离)/.test(s)) score = Math.max(10, score - 28);
    return { dim: q.dim, score, matched, text, topic: q.topic };
  }
  function finish() {
    state.awaiting = null; const entries = [];
    for (const a of state.answers) { const q = state.questions.find(x => x.topic === a.topic); if (q) entries.push(evaluateAnswer(q, a.text)); }
    const scores = {}; for (const k of Object.keys(DIMS)) { const xs = entries.filter(x => x.dim === k); scores[k] = xs.length ? Math.round(xs.reduce((n,x)=>n+x.score,0)/xs.length) : 0; }
    const coveredCount = state.covered.size; const coverageFactor = coveredCount / state.questions.length;
    const total = Math.round(Object.keys(DIMS).reduce((n,k)=>n+scores[k]*DIMS[k].weight,0) * (.72 + .28 * coverageFactor));
    state.report = { level: LEVELS[state.level].label, total, scores, answers: state.answers, covered: [...state.covered], entries, date: new Date().toLocaleString('zh-CN') };
    renderReport(state.report); show('reportScreen'); setStep(3);
  }
  function renderReport(r) {
    $('reportLevel').textContent = r.level; $('totalScore').textContent = r.total; $('scoreRing').style.borderTopColor = r.total >= 75 ? '#93b342' : r.total >= 55 ? '#c3af53' : '#c97c62';
    $('reportIntro').textContent = `完成 ${r.answers.length} 次回答，覆盖 ${r.covered.length} / ${state.questions.length} 个主题。分数来自本地规则对回答具体程度、安全术语和岗位要点的参考性估算。`;
    $('scoreCaption').textContent = r.total >= 80 ? '现场表达准备度较好，继续积累复杂案例' : r.total >= 60 ? '基础思路已建立，补充处置细节会更有说服力' : '建议结合真实检修案例，练习完整的处置表达';
    $('dimensionBars').innerHTML = Object.keys(DIMS).map(k=>`<div class="dimension-row"><span>${DIMS[k].name}</span><div class="bar-track"><div class="bar-fill" style="width:${r.scores[k]}%"></div></div><b>${r.scores[k]}</b></div>`).join('');
    const recommendations = Object.entries(r.scores).sort((a,b)=>a[1]-b[1]).map(([k,v])=>({k,v}));
    const notes = { practical: ['实操能力','多按“准备—操作—复核—记录”描述本人负责的步骤，补充工具、验收和复役细节。'], safety: ['安全意识','明确作业许可、能量隔离、验电/验证、监护与应急条件；现场规程和厂家要求优先。'], fault: ['故障判断','把告警、历史趋势、现场测量和运行工况串起来，说明何时停机、升级和验证根因。'] };
    $('feedbackContent').innerHTML = recommendations.map(({k,v})=>`<div class="feedback-item"><div class="feedback-icon">${v>=70?'✓':'↗'}</div><div><b>${notes[k][0]} · ${v>=70?'表现稳定':'提升建议'}</b><p>${notes[k][1]}</p></div></div>`).join('');
    $('topicList').innerHTML = state.questions.map(q=>`<span class="topic-chip ${r.covered.includes(q.topic)?'covered':''}">${r.covered.includes(q.topic)?'✓ ':''}${q.topic}</span>`).join('');
  }
  $('restartBtn').addEventListener('click', () => { show('welcomeScreen'); setStep(0); });
  $('printBtn').addEventListener('click', () => window.print());
  $('downloadBtn').addEventListener('click', () => {
    if (!state.report) return; const r = state.report;
    const lines = [`驭风 · 风电运维模拟面试报告`,`生成时间：${r.date}`,`应聘等级：${r.level}`,`综合准备度：${r.total}/100`,`实操能力：${r.scores.practical}/100`,`安全意识：${r.scores.safety}/100`,`故障判断：${r.scores.fault}/100`,`覆盖主题：${r.covered.join('、') || '无'}`,``,`参考说明：本报告由浏览器本地规则生成，用于练习复盘，不代表正式招聘结论或现场作业授权。`,``,`回答记录：`,...r.answers.map((a,i)=>`${i+1}. ${a.topic}${a.followUp?'（追问）':''}\n${a.text}`)];
    const blob = new Blob(['\ufeff'+lines.join('\n')], {type:'text/plain;charset=utf-8'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `驭风面试报告-${new Date().toISOString().slice(0,10)}.txt`; a.click(); URL.revokeObjectURL(a.href);
  });
})();
