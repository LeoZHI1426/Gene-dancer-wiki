/**
 * 技术页建模相关代码（完整版，与 痤疮相关代码.pdf 一致）
 */

/** 1. 痤疮-淬灭酶促反应动力学模型 - Python（完整） */
export const codeQuenchPython = `痤疮-淬灭酶促反应动力学模型 Python
import numpy as np
import matplotlib.pyplot as plt
# 模型参数
Km = 5.0  # μM (米氏常数)
kcat = 100.0  # s^-1 (酶的转换数)
enzyme_density = 1e6  # CFU/cm^2 (工程菌密度)
enzyme_secretion_rate = 1e-12  # U/cell (酶分泌效率)
Vmax = kcat * enzyme_density * enzyme_secretion_rate  # U/cm^2
# 不同病情的初始 CAMP 因子浓度
condition_levels = {
    "mild": 1.0,  # μM (轻度痤疮)
    "moderate": 10.0,  # μM (中度痤疮)
    "severe": 100.0  # μM (重度痤疮)
}
# 时间范围（0-72 小时，以小时为单位）
time_hours = np.linspace(0, 72, 1000)
time_seconds = time_hours * 3600  # 转换为秒
# 计算不同病情下 CAMP 因子浓度随时间变化
cAMP_concentration = {}
for condition, S0 in condition_levels.items():
    # CAMP 浓度随时间变化: [S](t) = [S]_0 * exp(-Vmax/Km * t)
    cAMP_concentration[condition] = S0 * np.exp(-Vmax / Km * time_seconds)
# 计算达到治疗阈值的时间（CAMP 浓度降至初始值的 10% 以下）
threshold = 0.1  # 治疗阈值（10% 的初始浓度）
treatment_time = {}
for condition, S0 in condition_levels.items():
    # 解方程: S0 * exp(-Vmax/Km * t) = S0 * threshold
    # => exp(-Vmax/Km * t) = threshold
    # => -Vmax/Km * t = ln(threshold)
    # => t = -Km / Vmax * ln(threshold)
    t = -Km / Vmax * np.log(threshold)
    treatment_time[condition] = t / 3600  # 转换为小时
# 可视化结果
plt.figure(figsize=(10, 6))
for condition in condition_levels:
    plt.plot(time_hours, cAMP_concentration[condition], label=f'{condition} acne')
plt.axhline(y=0, color='k', linestyle='-', alpha=0.3)
plt.axhline(y=0.1 * condition_levels["mild"], color='r', linestyle='--', alpha=0.5, label='Treatment threshold (10% of initial concentration)')
plt.xlabel('Time (hours)')
plt.ylabel('CAMP concentration (μM)')
plt.title('Engineered bacterial patch for CAMP degradation in different acne severities')
plt.legend()
plt.grid(True, linestyle='--', alpha=0.7)
plt.tight_layout()
plt.savefig('cAMP_degradation_curve.png', dpi=300)
plt.show()
# 显示治疗时间
print("Time to reach treatment threshold (CAMP concentration < 10% of initial):")
for condition, t in treatment_time.items():
    print(f"{condition} acne: {t:.2f} hours")
`;

/** 2. 痤疮-碳足迹模型 - Python（完整） */
export const codeCarbonPython = `痤疮-碳足迹模型 Python
import matplotlib.pyplot as plt
from matplotlib.patches import ConnectionPatch
# ================ 1. 设置中文字体以支持中文显示 ================
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号
# ================ 2. 文献支持的参数定义 ================
API_PRODUCTION_PERCENT = 0.85  # API 生产占比 (75-90% 的平均值)
# 文献中抗生素碳足迹数据
antibiotic_data = {
    "amoxicillin": 1.8,  # kg CO2e/kg API
    "flucloxacillin": 2.2,
    "penicillin V": 1.5,
    "average": 1.83
}
CO2_FACTOR = 0.581  # 中国电网碳排放因子 (kg CO2e/kWh)
# ================ 3. 优化后的模型参数 ================
# 传统抗生素疗法（克林霉素凝胶）
antibiotic = {
    "name": "传统抗生素疗法",
    "production": {
        "API 生产": antibiotic_data["average"],  # kg CO2e/kg API
        "制剂生产": 0.2,  # kg CO2e/kg
        "包装": 0.05,  # kg CO2e/盒
        "运输": 0.02  # kg CO2e/盒
    },
    "usage": {
        "疗程天数": 28,  # 4 周
        "每日用量": 10,  # g/天
        "浓度": 0.01,  # 1% 浓度
        "API 用量": 0.01 * 10 * 28  # 总 API 用量 (g)
    }
}
# 工程菌贴片疗法
engineered_bacteria = {
    "name": "工程菌贴片疗法",
    "production": {
        "菌株培养": 0.01,  # kg CO2e/片
        "水凝胶材料": 0.01,  # kg CO2e/片
        "贴片制造": 0.02,  # kg CO2e/片
        "包装": 0.005,  # kg CO2e/片
        "运输": 0.005  # kg CO2e/片
    },
    "usage": {
        "疗程天数": 7,  # 1 周
        "单次用量": 1  # 片/次
    }
}
# ================ 4. 碳足迹计算函数 ================
def calculate_carbon_footprint(therapy):
    """计算疗法的总碳足迹"""
    if therapy["name"] == "传统抗生素疗法":
        # API 碳足迹 (API 生产占比 85%)
        api_emission = therapy["usage"]["API 用量"] * 0.001 * therapy["production"]["API 生产"]
        # 制剂、包装、运输碳足迹
        formulation_emission = therapy["usage"]["每日用量"] * 0.001 * therapy["production"]["制剂生产"]
        packaging_emission = therapy["production"]["包装"]
        transport_emission = therapy["production"]["运输"]
        return api_emission + formulation_emission + packaging_emission + transport_emission
    else:
        # 工程菌贴片：单片碳足迹 × 疗程天数 × 每日使用片数
        per_patch_emission = sum(therapy["production"].values())
        return per_patch_emission * therapy["usage"]["疗程天数"] * therapy["usage"]["单次用量"]
# ================ 5. MCF 评级系统 ================
def get_mcf_rating(carbon_footprint):
    """基于 MCF 分类器文献的评级系统 (gCO2e/dose)"""
    if carbon_footprint < 10:
        return "LOW"
    elif carbon_footprint < 100:
        return "MEDIUM"
    elif carbon_footprint < 1000:
        return "HIGH"
    else:
        return "VERY HIGH"
# ================ 6. 计算碳足迹 ================
antibiotic_footprint = calculate_carbon_footprint(antibiotic)
engineered_footprint = calculate_carbon_footprint(engineered_bacteria)
# 计算每剂量碳足迹 (gCO2e/dose)
antibiotic_per_dose = antibiotic_footprint / antibiotic["usage"]["疗程天数"] * 1000  # 转换为 gCO2e/dose
engineered_per_dose = engineered_footprint / engineered_bacteria["usage"]["疗程天数"] * 1000
# 获取 MCF 评级
antibiotic_mcf = get_mcf_rating(antibiotic_per_dose)
engineered_mcf = get_mcf_rating(engineered_per_dose)
# 计算碳减排比例
reduction_ratio = (antibiotic_footprint - engineered_footprint) / antibiotic_footprint * 100
# ================ 7. 创建专业级可视化 ================
plt.figure(figsize=(14, 10), dpi=300)
ax = plt.gca()
# 设置背景色
ax.set_facecolor('#f8f9fa')
# ================ 8. 绘制主柱状图 ================
labels = ['传统抗生素疗法', '工程菌贴片疗法']
footprints = [antibiotic_footprint, engineered_footprint]
colors = ['#CECCE5', '#F3DAC0']  # 专业学术配色
bars = ax.bar(labels, footprints, color=colors, edgecolor='black', alpha=0.9, width=0.6)
# 添加数据标签
for i, bar in enumerate(bars):
    height = bar.get_height()
    ax.annotate(f'{height:.2f} kg CO2', xy=(bar.get_x() + bar.get_width() / 2, height), xytext=(0, 5), textcoords="offset points", ha='center', va='bottom', fontsize=12, fontweight='bold', color='black')
# 添加 MCF 评级文字
for i, mcf in enumerate([antibiotic_mcf, engineered_mcf]):
    ax.annotate(f'MCF: {mcf}', xy=(i, 0.05), xytext=(0, -25), textcoords="offset points", ha='center', va='top', fontsize=14, color='black', fontweight='bold')
# ================ 9. 添加碳减排比例箭头 ================
arrow = ConnectionPatch(
    xyA=('传统抗生素疗法', antibiotic_footprint),
    xyB=('工程菌贴片疗法', engineered_footprint),
    coordsA="data", coordsB="data", axesA=ax, axesB=ax,
    arrowstyle="-|>", mutation_scale=20, color="red", linewidth=2
)
ax.add_artist(arrow)
# 添加减排比例标签
ax.text(0.5, antibiotic_footprint * 1.15, f'碳减排比例: {reduction_ratio:.1f}%\\n(工程菌疗法减少 {antibiotic_footprint - engineered_footprint:.2f} kg CO2)', ha='center', va='center', fontsize=14, color='red', fontweight='bold', bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="red", alpha=0.8))
# ================ 10. 添加碳足迹对比图 ================
ax2 = plt.axes([0.6, 0.6, 0.3, 0.3])
carbon_comparison = [antibiotic_per_dose, engineered_per_dose]
mcf_labels = [f'MCF: {antibiotic_mcf}', f'MCF: {engineered_mcf}']
colors = ['#B0DA95', '#A6DAEF']
wedges, texts, autotexts = ax2.pie(carbon_comparison, colors=colors, autopct='%1.1f%%', startangle=90, textprops={'fontsize': 10, 'color': 'black'}, wedgeprops={'edgecolor': 'black', 'linewidth': 1})
ax2.set_title('每剂量碳足迹对比', fontsize=14, pad=10)
ax2.axis('equal')
ax2.legend(wedges, mcf_labels, title="MCF 评级", loc="center left", bbox_to_anchor=(1, 0, 0.5, 1))
# ================ 11. 添加数据来源和专业注释 ================
plt.figtext(0.5, 0.005, '* 数据基于 MCF 分类器文献 (Taylor et al., 2024) 和 ABPI Blister Pack Carbon Footprint Tool | 中国电网碳排放因子: 0.581 kg CO2e/kWh (2023)', ha="center", fontsize=10, style='italic', color='darkgray')
plt.figtext(0.5, 0.015, 'MCF 评级标准: LOW (<10 gCO2e/dose), MEDIUM (10-100), HIGH (100-1000), VERY HIGH (>1000)', ha="center", fontsize=9, style='italic', color='darkgray')
plt.figtext(0.95, 0.95, 'iGEM 2026 - 痤疮工程菌贴片项目', ha="right", fontsize=10, color='#1f77b4', fontweight='bold')
# ================ 12. 优化布局 ================
plt.suptitle('传统抗生素疗法 vs 工程菌贴片疗法的碳足迹对比分析', fontsize=16, fontweight='bold', y=0.98)
plt.tight_layout(rect=[0, 0, 1, 0.95])
# ================ 13. 保存高质量图表 ================
plt.savefig('carbon_footprint_comparison.png', dpi=300, bbox_inches='tight')
# ================ 14. 详细结果输出 ================
print("=" * 70)
print("碳足迹对比分析报告 - 专业级可视化")
print("=" * 70)
print(f"疗法名称: {antibiotic['name']}")
print(f"总碳足迹: {antibiotic_footprint:.2f} kg CO2/疗程")
print(f"每剂量碳足迹: {antibiotic_per_dose:.2f} gCO2e/dose")
print(f"MCF 评级: {antibiotic_mcf}")
print(f"疗程天数: {antibiotic['usage']['疗程天数']}天")
print(f"每日用量: {antibiotic['usage']['每日用量']}g")
print("\\n")
print(f"疗法名称: {engineered_bacteria['name']}")
print(f"总碳足迹: {engineered_footprint:.2f} kg CO2/疗程")
print(f"每剂量碳足迹: {engineered_per_dose:.2f} gCO2e/dose")
print(f"MCF 评级: {engineered_mcf}")
print(f"疗程天数: {engineered_bacteria['usage']['疗程天数']}天")
print(f"每日用量: {engineered_bacteria['usage']['单次用量']}片")
print("\\n")
print(f"碳减排比例: {reduction_ratio:.1f}%")
print(f"工程菌疗法比传统抗生素碳足迹低: {antibiotic_footprint - engineered_footprint:.2f} kg CO2/疗程")
print("\\n")
print("关键数据来源:")
print("- 传统抗生素 API 碳足迹: 基于 MCF 分类器文献 (Taylor et al., 2024)和 ABPI Blister Pack Carbon Footprint Tool")
print("- 工程菌贴片碳足迹: 本地化生产 LCA 估算 (基于文献[4][5]的碳排放参数)")
print("- 中国电网碳排放因子: 国家发改委 (2023)")
print("- MCF 评级系统: 基于 MCF 分类器文献 (Taylor et al., 2024)")
print("=" * 70)
# 显示图表
plt.show()
`;

/** 3. 周期长度确定_周期扫描 - Matlab（完整） */
export const codeCycleScanMatlab = `周期长度确定_周期扫描 Matlab
%% 多周期给药稳态控制 - 参数扫描寻找最优周期长度
clear; clc; close all;
%% ======================== 模型参数 ========================
p.mu_max = 0.2;  % 细菌最大比生长速率 (h⁻¹)
p.K = 1e8;  % 环境容纳量 (cells/mL)
p.k_prod = 5e-9;  % CAMP 产生速率 (μM/h per cell/mL)
p.k_deg = 0.2;  % 淬灭酶降解 CAMP 的速率常数 (mL/μM·h)
p.d_C = 0.02;  % CAMP 自然衰减速率 (h⁻¹)
p.u_base = 0.05;  % 基础淬灭酶分泌速率 (μM/h)
p.d_E = 0.05;  % 淬灭酶降解速率 (h⁻¹)
% 初始条件
p.X0 = 1e6;  % 初始细菌浓度 (cells/mL)
p.C0 = 0.5;  % 初始 CAMP 浓度 (μM)
p.E0 = 0.0;  % 初始淬灭酶浓度 (μM)
% PID 控制器参数
p.KP = 5.0;  % 比例增益
p.KI = 1.0;  % 积分增益
p.KD = 0.2;  % 微分增益
p.C_SET = 0.0;  % 目标 CAMP 浓度
% 固定周期数（用于扫描）
p.NUM_CYCLES = 30;  % 模拟 30 个周期，观察稳态
p.DT = 0.2;  % 时间步长
% 控制阈值
control_threshold = 0.5;  % μM
%% ======================== 单周期模拟函数（可给定初始状态）================
function results_one_cycle = simulate_one_cycle(use_control, p, init_state, cycle_idx)
    steps = p.STEPS_PER_CYCLE;
    time_local = (0:steps-1)' * p.DT;
    X = zeros(steps, 1);
    C = zeros(steps, 1);
    E = zeros(steps, 1);
    u = zeros(steps, 1);
    error = zeros(steps, 1);
    x = init_state(1);
    c = init_state(2);
    e = init_state(3);
    integral = 0;
    prev_error = 0;
    u_max = 1.0;
    u_min = 0.0;
    for i = 1:steps
        if use_control
            err = c - p.C_SET;
            integral = integral + err * p.DT;
            derivative = (err - prev_error) / p.DT;
            output = p.KP * err + p.KI * integral + p.KD * derivative;
            u_t = p.u_base + output;
            if u_t < u_min
                u_t = u_min;
            elseif u_t > u_max
                u_t = u_max;
            end
            prev_error = err;
        else
            u_t = p.u_base;
        end
        dx = p.mu_max * x * (1 - x / p.K);
        dc = p.k_prod * x - p.k_deg * e * c - p.d_C * c;
        de = u_t - p.d_E * e;
        x = max(x + dx * p.DT, 0);
        c = max(c + dc * p.DT, 0);
        e = max(e + de * p.DT, 0);
        X(i) = x;
        C(i) = c;
        E(i) = e;
        u(i) = u_t;
        error(i) = p.C_SET - c;
    end
    results_one_cycle.time = time_local;
    results_one_cycle.X = X;
    results_one_cycle.C = C;
    results_one_cycle.E = E;
    results_one_cycle.u = u;
    results_one_cycle.error = error;
    results_one_cycle.final_state = [x, c, e];
end
%% ======================== 多周期模拟函数 ========================
function results_multi = simulate_multicycle(use_control, p)
    total_steps = p.NUM_CYCLES * p.STEPS_PER_CYCLE;
    results_multi.time = zeros(total_steps, 1);
    results_multi.X = zeros(total_steps, 1);
    results_multi.C = zeros(total_steps, 1);
    results_multi.E = zeros(total_steps, 1);
    results_multi.u = zeros(total_steps, 1);
    results_multi.error = zeros(total_steps, 1);
    current_state = [p.X0, p.C0, p.E0];
    for cycle = 1:p.NUM_CYCLES
        cycle_res = simulate_one_cycle(use_control, p, current_state, cycle);
        start_idx = (cycle-1) * p.STEPS_PER_CYCLE + 1;
        end_idx = cycle * p.STEPS_PER_CYCLE;
        results_multi.time(start_idx:end_idx) = cycle_res.time + (cycle-1)*p.CYCLE_HOURS;
        results_multi.X(start_idx:end_idx) = cycle_res.X;
        results_multi.C(start_idx:end_idx) = cycle_res.C;
        results_multi.E(start_idx:end_idx) = cycle_res.E;
        results_multi.u(start_idx:end_idx) = cycle_res.u;
        results_multi.error(start_idx:end_idx) = cycle_res.error;
        current_state = cycle_res.final_state;
    end
end
%% ======================== 参数扫描 ========================
cycle_candidates = 1:1:12;  % 候选周期长度（小时），从 1 到 12 小时，步长 1 小时
num_candidates = length(cycle_candidates);
final_C_avg = zeros(num_candidates, 1);
final_C_max = zeros(num_candidates, 1);
below_threshold_ratio = zeros(num_candidates, 1);
fprintf('正在进行参数扫描，请稍候...\\n');
for idx = 1:num_candidates
    p_scan = p;
    p_scan.CYCLE_HOURS = cycle_candidates(idx);
    p_scan.STEPS_PER_CYCLE = round(p_scan.CYCLE_HOURS / p_scan.DT);
    p_scan.TOTAL_STEPS = p_scan.NUM_CYCLES * p_scan.STEPS_PER_CYCLE;
    results = simulate_multicycle(true, p_scan);
    last_cycle_start = (p_scan.NUM_CYCLES-1) * p_scan.STEPS_PER_CYCLE + 1;
    last_cycle_end = p_scan.NUM_CYCLES * p_scan.STEPS_PER_CYCLE;
    C_last = results.C(last_cycle_start:last_cycle_end);
    final_C_avg(idx) = mean(C_last);
    final_C_max(idx) = max(C_last);
    below_threshold_ratio(idx) = sum(C_last <= control_threshold) / length(C_last) * 100;
    fprintf('周期长度 %d 小时: 平均 CAMP = %.3f μM, 低于阈值比例 = %.1f%%\\n', cycle_candidates(idx), final_C_avg(idx), below_threshold_ratio(idx));
end
%% ======================== 绘制扫描结果 ========================
figure('Position', [100, 100, 1200, 400]);
subplot(1,3,1);
plot(cycle_candidates, final_C_avg, 'b-o', 'LineWidth', 1.5);
xlabel('周期长度 (小时)');
ylabel('最后一个周期平均 CAMP (μM)');
title('平均 CAMP vs 周期长度');
grid on;
yline(control_threshold, 'r--', '控制阈值');
ylim([0, max(final_C_avg)*1.1]);
subplot(1,3,2);
plot(cycle_candidates, final_C_max, 'b-o', 'LineWidth', 1.5);
xlabel('周期长度 (小时)');
ylabel('最后一个周期最大 CAMP (μM)');
title('最大 CAMP vs 周期长度');
grid on;
yline(control_threshold, 'r--', '控制阈值');
ylim([0, max(final_C_max)*1.1]);
subplot(1,3,3);
plot(cycle_candidates, below_threshold_ratio, 'b-o', 'LineWidth', 1.5);
xlabel('周期长度 (小时)');
ylabel('低于阈值比例 (%)');
title('控制效果 vs 周期长度');
grid on;
yline(90, 'r--', '目标 90%');
sgtitle('周期长度对 CAMP 控制效果的影响');
feasible_idx = find(final_C_avg < control_threshold);
if ~isempty(feasible_idx)
    best_cycle = cycle_candidates(feasible_idx(end));
    fprintf('\\n✅ 满足平均 CAMP < %.1f μM 的最大周期长度为 %d 小时\\n', control_threshold, best_cycle);
else
    fprintf('\\n❌ 没有周期长度能使平均 CAMP 低于 %.1f μM，请考虑调整 PID 参数或生物学参数\\n', control_threshold);
end
saveas(gcf, 'cycle_length_scan.png');
fprintf('扫描结果图已保存为 cycle_length_scan.png\\n');
`;

/** 4. 多周期给药稳态控制 - Matlab（完整） */
export const codeMulticycleMatlab = `多周期给药稳态控制 Matlab
%% 多周期给药稳态控制：工程菌分泌淬灭酶降解 CAMP 毒素
% 模拟多个治疗周期（每个周期更换贴片，工程菌重置）
% 闭环 vs 开环控制
clear; clc; close all;
%% ======================== 模型参数 ========================
p.mu_max = 0.2;  % 痤疮丙酸杆菌最大比生长速率 (h⁻¹)
p.K = 1e8;  % 环境容纳量 (cells/mL)
p.k_prod = 5e-9;  % CAMP 产生速率 (μM/h per cell/mL)
p.k_deg = 0.2;  % 淬灭酶降解 CAMP 的速率常数 (mL/μM·h)
p.d_C = 0.02;  % CAMP 自然衰减速率 (h⁻¹)
p.u_base = 0.05;  % 基础淬灭酶分泌速率 (μM/h)
p.d_E = 0.05;  % 淬灭酶降解速率 (h⁻¹)
% 初始条件（第 0 周期开始前）
p.X0 = 1e6;  % 初始细菌浓度 (cells/mL)
p.C0 = 0.5;  % 初始 CAMP 浓度 (μM)
p.E0 = 0.0;  % 初始淬灭酶浓度 (μM)
% PID 控制器参数 - 目标 CAMP = 0
p.KP = 5.0;  % 比例增益
p.KI = 1.0;  % 积分增益
p.KD = 0.2;  % 微分增益
p.C_SET = 0.0;  % 目标 CAMP 浓度
% 周期参数
p.CYCLE_HOURS = 3;  % 每个周期时长 (小时) - 每天更换一次贴片
p.NUM_CYCLES = 10;  % 模拟周期数
p.DT = 0.2;  % 时间步长 (小时)
p.STEPS_PER_CYCLE = round(p.CYCLE_HOURS / p.DT);
p.TOTAL_STEPS = p.NUM_CYCLES * p.STEPS_PER_CYCLE;
fprintf('多周期给药模拟 (%d 个周期，每周期 %d 小时)\\n', p.NUM_CYCLES, p.CYCLE_HOURS);
fprintf('目标 CAMP 浓度: %.1f μM (理想 0)\\n', p.C_SET);
%% ======================== 单周期模拟函数（可给定初始状态）================
function results_one_cycle = simulate_one_cycle(use_control, p, init_state, cycle_idx)
    steps = p.STEPS_PER_CYCLE;
    time_local = (0:steps-1)' * p.DT;
    X = zeros(steps, 1);
    C = zeros(steps, 1);
    E = zeros(steps, 1);
    u = zeros(steps, 1);
    error = zeros(steps, 1);
    x = init_state(1);
    c = init_state(2);
    e = init_state(3);
    integral = 0;
    prev_error = 0;
    u_max = 1.0;
    u_min = 0.0;
    for i = 1:steps
        if use_control
            err = c - p.C_SET;
            integral = integral + err * p.DT;
            derivative = (err - prev_error) / p.DT;
            output = p.KP * err + p.KI * integral + p.KD * derivative;
            u_t = p.u_base + output;
            if u_t < u_min
                u_t = u_min;
            elseif u_t > u_max
                u_t = u_max;
            end
            prev_error = err;
        else
            u_t = p.u_base;
        end
        dx = p.mu_max * x * (1 - x / p.K);
        dc = p.k_prod * x - p.k_deg * e * c - p.d_C * c;
        de = u_t - p.d_E * e;
        x = max(x + dx * p.DT, 0);
        c = max(c + dc * p.DT, 0);
        e = max(e + de * p.DT, 0);
        X(i) = x;
        C(i) = c;
        E(i) = e;
        u(i) = u_t;
        error(i) = p.C_SET - c;
    end
    results_one_cycle.time = time_local;
    results_one_cycle.X = X;
    results_one_cycle.C = C;
    results_one_cycle.E = E;
    results_one_cycle.u = u;
    results_one_cycle.error = error;
    results_one_cycle.final_state = [x, c, e];
end
%% ======================== 多周期模拟函数 ========================
function results_multi = simulate_multicycle(use_control, p)
    total_steps = p.NUM_CYCLES * p.STEPS_PER_CYCLE;
    results_multi.time = zeros(total_steps, 1);
    results_multi.X = zeros(total_steps, 1);
    results_multi.C = zeros(total_steps, 1);
    results_multi.E = zeros(total_steps, 1);
    results_multi.u = zeros(total_steps, 1);
    results_multi.error = zeros(total_steps, 1);
    current_state = [p.X0, p.C0, p.E0];
    for cycle = 1:p.NUM_CYCLES
        cycle_res = simulate_one_cycle(use_control, p, current_state, cycle);
        start_idx = (cycle-1) * p.STEPS_PER_CYCLE + 1;
        end_idx = cycle * p.STEPS_PER_CYCLE;
        results_multi.time(start_idx:end_idx) = cycle_res.time + (cycle-1)*p.CYCLE_HOURS;
        results_multi.X(start_idx:end_idx) = cycle_res.X;
        results_multi.C(start_idx:end_idx) = cycle_res.C;
        results_multi.E(start_idx:end_idx) = cycle_res.E;
        results_multi.u(start_idx:end_idx) = cycle_res.u;
        results_multi.error(start_idx:end_idx) = cycle_res.error;
        current_state = cycle_res.final_state;
    end
end
%% ======================== 运行多周期模拟 ========================
fprintf('\\n 模拟闭环控制（多周期）...\\n');
closed_multi = simulate_multicycle(true, p);
fprintf('模拟开环控制（多周期）...\\n');
open_multi = simulate_multicycle(false, p);
%% ======================== 结果分析函数 ========================
function analysis = analyze_multicycle(results, p)
    c_arr = results.C;
    control_threshold = 0.5;
    controlled = c_arr <= control_threshold;
    proportion = sum(controlled) / length(c_arr) * 100;
    max_C = max(c_arr);
    avg_C = mean(c_arr);
    final_C = results.C(end);
    analysis.proportion = proportion;
    analysis.max_C = max_C;
    analysis.avg_C = avg_C;
    analysis.final_C = final_C;
end
fprintf('\\n 分析结果:\\n');
closed_ana = analyze_multicycle(closed_multi, p);
open_ana = analyze_multicycle(open_multi, p);
fprintf('--- 闭环控制 ---\\n');
fprintf(' CAMP 范围: [%.3f, %.3f] μM | 低于阈值比例: %.1f%% | 最终 CAMP: %.3f μM\\n', min(closed_multi.C), max(closed_multi.C), closed_ana.proportion, closed_ana.final_C);
fprintf('--- 开环控制 ---\\n');
fprintf(' CAMP 范围: [%.3f, %.3f] μM | 低于阈值比例: %.1f%% | 最终 CAMP: %.3f μM\\n', min(open_multi.C), max(open_multi.C), open_ana.proportion, open_ana.final_C);
%% ======================== 可视化 ========================
figure('Position', [100, 100, 1400, 900]);
subplot(2,3,1);
hold on;
plot(closed_multi.time, closed_multi.C, 'b-', 'LineWidth', 1.5, 'DisplayName', '闭环控制');
plot(open_multi.time, open_multi.C, 'r--', 'LineWidth', 1.5, 'DisplayName', '开环控制');
yline(0.5, 'k:', 'LineWidth', 1.5, 'DisplayName', '控制阈值 (0.5 μM)');
for cyc = 1:p.NUM_CYCLES
    xline(cyc * p.CYCLE_HOURS, 'k--', 'HandleVisibility', 'off');
end
xlabel('时间 (小时)');
ylabel('CAMP 毒素浓度 (μM)');
title('(a) 多周期 CAMP 浓度');
legend('Location', 'best');
grid on;
xlim([0 p.NUM_CYCLES * p.CYCLE_HOURS]);
subplot(2,3,2);
hold on;
plot(closed_multi.time, closed_multi.E, 'b-', 'LineWidth', 1.5, 'DisplayName', '闭环控制');
plot(open_multi.time, open_multi.E, 'r--', 'LineWidth', 1.5, 'DisplayName', '开环控制');
for cyc = 1:p.NUM_CYCLES
    xline(cyc * p.CYCLE_HOURS, 'k--', 'HandleVisibility', 'off');
end
xlabel('时间 (小时)');
ylabel('淬灭酶浓度 (μM)');
title('(b) 淬灭酶浓度');
legend('Location', 'best');
grid on;
xlim([0 p.NUM_CYCLES * p.CYCLE_HOURS]);
subplot(2,3,3);
hold on;
plot(closed_multi.time, closed_multi.u, 'b-', 'LineWidth', 1.5, 'DisplayName', '闭环控制');
plot(open_multi.time, open_multi.u, 'r--', 'LineWidth', 1.5, 'DisplayName', '开环控制');
yline(p.u_base, 'k:', 'LineWidth', 1.5, 'DisplayName', '基础分泌速率');
for cyc = 1:p.NUM_CYCLES
    xline(cyc * p.CYCLE_HOURS, 'k--', 'HandleVisibility', 'off');
end
xlabel('时间 (小时)');
ylabel('分泌速率 (μM/h)');
title('(c) 淬灭酶分泌速率');
legend('Location', 'best');
grid on;
xlim([0 p.NUM_CYCLES * p.CYCLE_HOURS]);
subplot(2,3,4);
hold on;
plot(closed_multi.time, closed_multi.X, 'b-', 'LineWidth', 1.5, 'DisplayName', '闭环控制');
plot(open_multi.time, open_multi.X, 'r--', 'LineWidth', 1.5, 'DisplayName', '开环控制');
for cyc = 1:p.NUM_CYCLES
    xline(cyc * p.CYCLE_HOURS, 'k--', 'HandleVisibility', 'off');
end
xlabel('时间 (小时)');
ylabel('细菌浓度 (cells/mL)');
title('(d) 痤疮丙酸杆菌浓度');
legend('Location', 'best');
grid on;
set(gca, 'YScale', 'log');
xlim([0 p.NUM_CYCLES * p.CYCLE_HOURS]);
subplot(2,3,5);
hold on;
plot(closed_multi.time, closed_multi.error, 'b-', 'LineWidth', 1.5, 'DisplayName', '闭环误差');
plot(open_multi.time, open_multi.error, 'r--', 'LineWidth', 1.5, 'DisplayName', '开环误差');
yline(0, 'k-', 'LineWidth', 1);
for cyc = 1:p.NUM_CYCLES
    xline(cyc * p.CYCLE_HOURS, 'k--', 'HandleVisibility', 'off');
end
xlabel('时间 (小时)');
ylabel('CAMP 误差 (μM)');
title('(e) 控制误差');
legend('Location', 'best');
grid on;
xlim([0 p.NUM_CYCLES * p.CYCLE_HOURS]);
subplot(2,3,6);
cum_closed = cumtrapz(closed_multi.time, abs(closed_multi.error));
cum_open = cumtrapz(open_multi.time, abs(open_multi.error));
hold on;
plot(closed_multi.time, cum_closed, 'b-', 'LineWidth', 1.5, 'DisplayName', '闭环累积误差');
plot(open_multi.time, cum_open, 'r--', 'LineWidth', 1.5, 'DisplayName', '开环累积误差');
for cyc = 1:p.NUM_CYCLES
    xline(cyc * p.CYCLE_HOURS, 'k--', 'HandleVisibility', 'off');
end
xlabel('时间 (小时)');
ylabel('累积绝对误差 (μM·h)');
title('(f) 累积绝对误差');
legend('Location', 'best');
grid on;
xlim([0 p.NUM_CYCLES * p.CYCLE_HOURS]);
sgtitle(sprintf('多周期给药稳态控制 (%d 周期，每周期 %d 小时)', p.NUM_CYCLES, p.CYCLE_HOURS), 'FontSize', 14, 'FontWeight', 'bold');
saveas(gcf, 'multicycle_control.png');
fprintf('\\n 图表已保存为 multicycle_control.png\\n');
%% ======================== 输出总结报告 ========================
fprintf('\\n============================================================\\n');
fprintf('多周期给药稳态控制 - 总结报告\\n');
fprintf('============================================================\\n');
fprintf('模拟周期数: %d, 每周期时长: %d 小时\\n', p.NUM_CYCLES, p.CYCLE_HOURS);
fprintf('目标 CAMP: 0 μM (控制阈值 0.5 μM)\\n');
fprintf('闭环控制: CAMP 低于阈值比例 %.1f%%\\n', closed_ana.proportion);
fprintf('开环控制: CAMP 低于阈值比例 %.1f%%\\n', open_ana.proportion);
fprintf('闭环控制: 最终 CAMP 浓度 %.3f μM\\n', closed_ana.final_C);
fprintf('开环控制: 最终 CAMP 浓度 %.3f μM\\n', open_ana.final_C);
fprintf('闭环控制: 最大 CAMP 浓度 %.3f μM\\n', closed_ana.max_C);
fprintf('开环控制: 最大 CAMP 浓度 %.3f μM\\n', open_ana.max_C);
fprintf('闭环控制: 平均 CAMP 浓度 %.3f μM\\n', closed_ana.avg_C);
fprintf('开环控制: 平均 CAMP 浓度 %.3f μM\\n', open_ana.avg_C);
fprintf('============================================================\\n');
`;
