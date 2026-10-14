import { useState } from "react";

const GAIT = "gait";
const ELASTIC = "elastic";

const Z = {
  bg: "#101014",
  panel: "#18181c",
  raised: "#1f1f24",
  line: "#2a2a30",
  text: "#ececef",
  soft: "#b4b4bc",
  mute: "#7c7c86",
};

/* ---------- Warm-ups ---------- */

const WARMUP_POOL = [
  { name: "Arm Swings", duration: "30 sec", notes: "Loosen the shoulders before the water." },
  { name: "Band Pull-Aparts", duration: "15 reps", notes: "Rear delts and rotator cuff." },
  { name: "High-Knee Walking March", duration: "1 min", notes: "Feet straight, knee headlights forward.", tag: GAIT },
  { name: "Short Foot Exercise", duration: "10 reps/foot", notes: "Standing poolside.", tag: GAIT },
];

const WARMUP_UPPER_AM = [
  { name: "Light Cardio (Row or Bike)", duration: "3 min", notes: "Easy. You've just got out of bed." },
  { name: "High-Knee Walking March", duration: "2 min", notes: "Feet straight ahead. Drive the knee, foot follows.", tag: GAIT },
  { name: "Short Foot Exercise", duration: "10 reps/foot", notes: "Scrunch the arch without curling toes. Hold 5 sec.", tag: GAIT },
  { name: "Seated Banded Hip IR", duration: "15 reps/side", notes: "Band at the ankle, swing the foot outward. Trains the internal rotation a toe-out gait lacks.", tag: GAIT },
  { name: "Band Pull-Aparts", duration: "15 reps", notes: "Rear delts and rotator cuff." },
  { name: "Band Dislocates", duration: "10 reps", notes: "Wide grip, over the head and behind." },
  { name: "Cat-Cow", duration: "8 reps", notes: "Spine mobility. Matters most first thing in the morning." },
];

const WARMUP_LOWER = [
  { name: "Light Cardio (Row or Bike)", duration: "3 min", notes: "Easy pace." },
  { name: "High-Knee Walking March", duration: "2 min", notes: "Slow and deliberate, feet straight ahead.", tag: GAIT },
  { name: "Short Foot Exercise", duration: "10 reps/foot", notes: "Scrunch the arch without curling toes. Hold 5 sec.", tag: GAIT },
  { name: "90/90 Hip IR Switches", duration: "8 reps/side", notes: "Hip internal rotation.", tag: GAIT },
  { name: "Banded Walks", duration: "2 × 15 steps each way", notes: "Mini band above knees, toes forward.", tag: GAIT },
  { name: "Single-Leg Glute Bridge", duration: "10 reps/side", notes: "Hips level, drive through the heel.", tag: GAIT },
  { name: "Thoracic Rotations", duration: "8 reps/side", notes: "On all fours, hand behind head." },
  { name: "Band Pull-Aparts", duration: "15 reps", notes: "Shoulders ready for the upper-body half." },
];

const ELASTIC_DRILLS = [
  { name: "A-Skips", duration: "2 × 20 m", notes: "Tall posture, knee drive, land under the hips.", tag: ELASTIC },
  { name: "Pogo Hops", duration: "2 × 15", notes: "Stiff ankles, short ground contact. Stop before it gets sloppy.", tag: ELASTIC },
  { name: "Low Box Jump", duration: "3 × 3", notes: "Knee-height box. Land soft, knees over 2nd/3rd toe. Step down.", tag: ELASTIC },
];

const RUN_PREP = [
  { name: "Leg Swings", duration: "10/side, both planes", notes: "Front to back, then side to side." },
  { name: "High-Knee Walking March", duration: "1 min", notes: "Feet straight, knee headlights forward.", tag: GAIT },
  { name: "Short Foot Exercise", duration: "10 reps/foot", notes: "Quick and done.", tag: GAIT },
];

/* ---------- Cool-downs ---------- */

const COOLDOWN_POOL = [
  { name: "Standing Chest Opener", duration: "30 sec", notes: "Interlace hands behind you, lift the arms." },
  { name: "Lat Stretch (Wall)", duration: "30 sec/side", notes: "Grip overhead, lean away." },
  { name: "Calf Stretch (Wall)", duration: "30 sec/side", notes: "Kicking tightens the calves." },
  { name: "Standing Forward Fold", duration: "45 sec", notes: "Decompresses the lower back before the commute." },
];

const COOLDOWN_AM = [
  { name: "Chest Doorway Stretch", duration: "30 sec/side", notes: "Quick but essential after pressing." },
  { name: "Lat Stretch", duration: "20 sec/side", notes: "Grip overhead, lean away." },
  { name: "Hip Flexor Stretch", duration: "30 sec/side", notes: "Even on upper day. You're about to sit all day." },
  { name: "Thoracic Extension (Foam Roller)", duration: "45 sec", notes: "Counters the desk posture ahead." },
];

const COOLDOWN_LOWER = [
  { name: "Hip Flexor Stretch (Kneeling)", duration: "45 sec/side", notes: "Critical after squats or deadlifts plus desk time." },
  { name: "Hamstring Stretch (Standing)", duration: "45 sec/side", notes: "Foot on bench, hinge, back flat." },
  { name: "Pigeon Pose", duration: "45 sec/side", notes: "Deep glute and hip." },
  { name: "Quad Stretch (Standing)", duration: "30 sec/side", notes: "Heel to glute." },
  { name: "Chest Doorway Stretch", duration: "30 sec/side", notes: "Forearm on frame, step through." },
  { name: "Child's Pose", duration: "45 sec", notes: "Knees wide, arms long." },
];

const COOLDOWN_RUN = [
  { name: "Calf Stretch (Wall)", duration: "30 sec/side", notes: "Straight knee, then bent knee." },
  { name: "Hip Flexor Stretch", duration: "30 sec/side", notes: "Squeeze the glute of the back leg." },
  { name: "Hamstring Stretch", duration: "30 sec/side", notes: "Hinge, back flat." },
  { name: "Quad Stretch (Standing)", duration: "30 sec/side", notes: "Heel to glute." },
  { name: "Pigeon Pose", duration: "45 sec/side", notes: "Running loads the glutes more than you notice." },
];

/* ---------- Pool and steam ---------- */

const SWIM_MON = [
  { phase: "Warm-up", duration: "200 m", notes: "Easy freestyle, build gradually." },
  { phase: "Drills", duration: "4 × 50 m", notes: "Catch-up and single-arm. 15 s rest." },
  { phase: "Main set", duration: "300–600 m", notes: "Moderate freestyle, 20 s rest. Grows through the block: see the Block tab." },
  { phase: "Backstroke", duration: "100 m", notes: "Opens the chest before Tuesday's pressing." },
  { phase: "Cool-down", duration: "100 m", notes: "Very easy, any stroke." },
];

const STEAM_NOTES = [
  { name: "When", duration: "After stretching", notes: "Before the shower." },
  { name: "How long", duration: "15 min", notes: "Sit on a towel. Cut to 10 if lunch runs long." },
  { name: "After", duration: "500 ml+ water", notes: "Before you're back at the desk." },
  { name: "Skip it", duration: "If off", notes: "Dizzy, dehydrated, or a bad-signal day." },
];

/* ---------- Warm-up sets ---------- */

const WS = {
  upper: [
    { set: "1", weight: "Empty bar (bench)", reps: "10", notes: "Retract scapulae." },
    { set: "2", weight: "~70% (bench)", reps: "5", notes: "Controlled descent." },
    { set: "3", weight: "Light band pulldown", reps: "10", notes: "Lat activation before pull-ups." },
  ],
  squat: [
    { set: "1", weight: "Empty bar", reps: "10", notes: "Corkscrew feet into the floor." },
    { set: "2", weight: "~50%", reps: "8", notes: "Sit back to the box, stay tight." },
    { set: "3", weight: "~75%", reps: "4", notes: "Knees toward little toe on the way up." },
  ],
  deadlift: [
    { set: "1", weight: "~40%", reps: "8", notes: "Toes forward, flat back." },
    { set: "2", weight: "~60%", reps: "5", notes: "Brace hard before every pull." },
    { set: "3", weight: "~80%", reps: "2", notes: "Knee tracking over 2nd/3rd toe." },
  ],
};

/* ---------- The week ---------- */

const DAYS = [
  {
    id: "mon", short: "Mon", day: "Monday", kind: "swim", chip: "Swim", load: 1,
    label: "Swim", sublabel: "Easy to moderate, a gentle start to the week", color: "#38BDF8", icon: "🏊",
    badge: "Office", wake: "7:00", slot: "Pool at 7:15",
    note: "You should leave the pool more awake than you arrived. Tuesday is bench and pull-ups, so don't chase the clock.",
    tip: "If the pool is more than a few minutes from home, wake at 6:45.",
    warmup: WARMUP_POOL, warmupLabel: "Poolside warm-up + gait",
    main: SWIM_MON,
    cooldown: COOLDOWN_POOL, cooldownLabel: "Poolside stretch",
    time: [["Arrive and change", "5 min"], ["Poolside warm-up", "4 min"], ["Swim, 900–1,200 m", "30–35 min"], ["Poolside stretch", "4 min"], ["Shower and change", "10 min"]],
    total: "~55 min to 1 hr",
    timeline: [["7:00", "Wake"], ["7:15–7:50", "Swim"], ["7:50–8:05", "Stretch, shower"], ["8:05–8:30", "Breakfast"], ["8:35", "Leave"], ["~9:20", "At the office"]],
  },
  {
    id: "tue", short: "Tue", day: "Tuesday", kind: "lift", chip: "Upper", load: 2,
    label: "Upper", sublabel: "Full upper body, straight sets", color: "#F59E0B", icon: "⚡",
    badge: "Office", wake: "6:30", slot: "Gym at 6:45",
    tip: "If the morning feels tight, wake at 6:15 rather than going back to supersets.",
    warmup: WARMUP_UPPER_AM, warmupLabel: "Quick warm-up + gait",
    warmupSets: WS.upper, warmupSetsLabel: "Warm-up sets",
    exercises: [
      { name: "Bench Press (Barbell)", sets: "4 × 6–8", rest: "2–3 min", notes: "RPE 7–8. Retract scapulae, slight arch." },
      { name: "Pull Up (Assisted)", sets: "4 × 6–10", rest: "2 min", notes: "Full dead hang. Reduce assist when every set hits 10." },
      { name: "Overhead Press", sets: "3 × 8–10", rest: "2 min", notes: "Brace, strict press, no leg drive." },
      { name: "Chest-Supported Row", sets: "3 × 8–10", rest: "90 s", notes: "No torso swing. Mid-back." },
      { name: "Lateral Raise", sets: "3 × 12–15", rest: "60 s", notes: "Light and strict." },
      { name: "Face Pull (Cable)", sets: "3 × 15–20", rest: "60 s", notes: "Rear delts and cuff health." },
      { name: "Pallof Press", sets: "3 × 10/side", rest: "30 s", notes: "Anti-rotation. Ribs down, hips square." },
    ],
    cooldown: COOLDOWN_AM, cooldownLabel: "Quick cool-down (desk prep)",
    time: [["Arrive and change", "5 min"], ["Warm-up + gait", "10 min"], ["Warm-up sets", "4 min"], ["Working sets + core", "~51 min"], ["Cool-down", "5 min"], ["Shower and change", "10 min"]],
    total: "~1 hr 25 min",
    timeline: [["6:30", "Wake"], ["6:45–8:10", "Session, including shower"], ["8:10–8:30", "Breakfast"], ["8:35", "Leave"], ["~9:20", "At the office"]],
  },
  {
    id: "wed", short: "Wed", day: "Wednesday", kind: "run", chip: "Easy+", load: 1,
    label: "Easy Run + Strides", sublabel: "Conversational pace, quick finish", color: "#A3E635", icon: "🏃",
    badge: "Office", wake: "6:45", slot: "From home at 7:00",
    note: "Easy all the way, then strides: six 20-second bursts of quick, relaxed running. They sharpen form and economy, and at about 2 minutes of quick running they're too little to affect Thursday's squats.",
    tip: "From October many of these runs start in the dark. Head torch and a reflective layer.",
    warmup: RUN_PREP, warmupLabel: "Run prep",
    main: [
      { phase: "Easy run", duration: "30–45 min", notes: "240–260 W. Talk-test easy. If HR keeps climbing or you can't speak in full sentences, walk for a minute." },
      { phase: "Strides", duration: "6 × 20 s", notes: "Quick and relaxed, not a sprint. Walk back fully between each. Cue: knee headlights. Skip them in deload weeks." },
    ],
    cooldown: COOLDOWN_RUN, cooldownLabel: "Post-run stretch",
    time: [["Drills at the door", "4 min"], ["Run + strides", "38–53 min"], ["Stretch", "6 min"], ["Shower and breakfast", "20 min"]],
    total: "~1 hr 10 min to 1 hr 25 min",
    timeline: [["6:45", "Wake, water"], ["7:00–7:55", "Run + strides"], ["7:55–8:30", "Stretch, shower, breakfast"], ["8:35", "Leave"], ["~9:20", "At the office"]],
  },
  {
    id: "thu", short: "Thu", day: "Thursday", kind: "lift", chip: "Lower A", load: 3,
    label: "Lower A", sublabel: "Heavy squat plus pull", color: "#3B82F6", icon: "🏋️",
    badge: "WFH", wake: "7:00", slot: "Gym at 12:00", extras: ["♨️ Steam"], steam: true,
    warmup: [...WARMUP_LOWER, ...ELASTIC_DRILLS], warmupLabel: "Warm-up + gait + elastic",
    warmupSets: WS.squat, warmupSetsLabel: "Warm-up sets (box squat)",
    exercises: [
      { name: "Box Squat (Barbell)", sets: "4 × 5–7", rest: "3 min", notes: "RPE 7–8. Corkscrew feet, knees toward little toe on the way up." },
      { name: "Dumbbell Step-Up", sets: "3 × 8/side", rest: "90 s", notes: "Knee-height box, front foot straight. Drive through the whole foot, don't push off the back leg. Lower under control. Cap at RPE 7: deadlifts tomorrow." },
      { name: "Lat Pulldown", sets: "3 × 8–10", rest: "90 s", notes: "Wide grip, full stretch at the top." },
      { name: "Stability Ball Hamstring Curl", sets: "3 × 10–12", rest: "60 s", notes: "Heels on the ball, hips up the whole set. Bodyweight. If 12 gets easy, slow the return to 3 sec rather than adding load. No hinge, so the lower back stays fresh for Friday." },
      { name: "Seated Cable Row", sets: "3 × 10–12", rest: "60 s", notes: "Close grip, squeeze the shoulder blades." },
      { name: "Dumbbell Curl", sets: "3 × 10–12", rest: "60 s", notes: "3-second lowering." },
      { name: "Copenhagen Plank", sets: "3 × 20 s/side", rest: "30 s", notes: "Knee on the bench until the long version is solid." },
      { name: "Dead Bug", sets: "3 × 8/side", rest: "30 s", notes: "Low back pinned to the floor. Slow." },
    ],
    cooldown: COOLDOWN_LOWER, cooldownLabel: "Cool-down stretching",
    time: [["Arrive and change", "5 min"], ["Warm-up + gait + elastic", "15 min"], ["Warm-up sets", "5 min"], ["Working sets + core", "~55 min"], ["Cool-down", "8 min"], ["Steam room", "15 min"], ["Shower and change", "10 min"]],
    total: "~1 hr 53 min",
    timeline: [["7:00", "Wake"], ["by 9:30", "Breakfast, so you lift fed"], ["12:00–13:53", "Session + steam"], ["~14:00", "Back at desk, protein with lunch"]],
  },
  {
    id: "fri", short: "Fri", day: "Friday", kind: "lift", chip: "Lower B", load: 3,
    label: "Lower B", sublabel: "Heavy deadlift plus push", color: "#8B5CF6", icon: "💪",
    badge: "WFH", wake: "7:00", slot: "Gym at 12:00", extras: ["♨️ Steam"], steam: true,
    warmup: WARMUP_LOWER, warmupLabel: "Warm-up + gait correctives",
    warmupSets: WS.deadlift, warmupSetsLabel: "Warm-up sets (deadlift)",
    exercises: [
      { name: "Deadlift (Barbell)", sets: "4 × 4–6", rest: "3–4 min", notes: "RPE 7–8. Reset every rep. Toes forward, push the floor away." },
      { name: "Incline Dumbbell Press", sets: "3 × 8–10", rest: "2 min", notes: "30°. Second chest session of the week." },
      { name: "Seated Hip Abduction", sets: "3 × 12–15", rest: "60 s", notes: "Lean the torso slightly forward to bias the upper glute. Resist on the way back in. A 1-second hold at the widest point beats extra weight." },
      { name: "Lateral Raise", sets: "3 × 12–15", rest: "60 s", notes: "Builds the shoulder cap." },
      { name: "Tricep Pushdown (Cable)", sets: "3 × 10–12", rest: "60 s", notes: "Lock the elbows, squeeze at the bottom." },
      { name: "Ab Wheel Rollout (from knees)", sets: "3 × 8–10", rest: "45 s", notes: "Short range to start, ribs down, lower back flat. Stop the set the moment it sags. Extend the range over the weeks rather than adding reps." },
      { name: "Side Plank + Top-Leg Raise", sets: "3 × 20 s/side", rest: "30 s", notes: "Glute med under load. Feeds straight into the gait work." },
    ],
    cooldown: COOLDOWN_LOWER, cooldownLabel: "Cool-down stretching",
    time: [["Arrive and change", "5 min"], ["Warm-up + gait", "13 min"], ["Warm-up sets", "5 min"], ["Working sets + core", "~53 min"], ["Cool-down", "8 min"], ["Steam room", "15 min"], ["Shower and change", "10 min"]],
    total: "~1 hr 50 min",
    timeline: [["7:00", "Wake"], ["by 9:30", "Breakfast, so you lift fed"], ["12:00–13:50", "Session + steam"], ["~14:00", "Back at desk, protein with lunch"]],
  },
  {
    id: "sat", short: "Sat", day: "Saturday", kind: "rest", chip: "Rest", load: 0,
    label: "Rest", sublabel: "With the baby 9–5", color: "#71717A", icon: "👶",
    badge: "Baby 9–5", wake: "8:00",
    note: "No training. You're on your feet with the baby all day, and it sits between Friday's deadlifts and Sunday's run. Sleep and food are the job today. Buggy walks are welcome and don't count as a session.",
  },
  {
    id: "sun", short: "Sun", day: "Sunday", kind: "run", chip: "Longer", load: 2,
    label: "Longer Easy Run", sublabel: "Evening, after a rested afternoon", color: "#22C55E", icon: "🌆",
    badge: "Baby 9–2", wake: "8:00", slot: "From home at 18:00",
    note: "The longest run of the week, never more than an hour, and more than 48 hours after Friday's deadlifts. Snack around 16:00 so you're fed but not full, then dinner after.",
    tip: "September runs finish in daylight. After the clocks go back on 25 October it's dark by about 16:45: head torch, reflective layer, and a lit route like the Thames Path.",
    warmup: RUN_PREP, warmupLabel: "Run prep",
    main: [
      { phase: "Easy run", duration: "40–60 min", notes: "240–260 W the whole way, walk breaks fine. Water before and after is enough at this length." },
    ],
    cooldown: COOLDOWN_RUN, cooldownLabel: "Post-run stretch",
    time: [["Drills at the door", "4 min"], ["Run", "40–60 min"], ["Stretch", "8 min"]],
    total: "~50 min to 1 hr 15 min",
    timeline: [["8:00", "Wake"], ["9:00–14:00", "With the baby"], ["~16:00", "Snack"], ["18:00", "Out the door"], ["by ~19:15", "Home, stretched, dinner"]],
  },
];

/* ---------- The block ---------- */

const BLOCKS = [
  { from: 1, name: "Block 1: settle in" },
  { from: 5, name: "Block 2: build the minutes" },
  { from: 9, name: "Block 3: reach the one-hour cap" },
  { from: 13, name: "Block 4: hold, then Christmas" },
];

const WEEKS = [
  { w: 1, date: "14 Sep", swim: 900, wed: 30, sun: 40 },
  { w: 2, date: "21 Sep", swim: 900, wed: 30, sun: 45 },
  { w: 3, date: "28 Sep", swim: 900, wed: 35, sun: 45, note: "Roughly when your late-September diet break lands." },
  { w: 4, date: "5 Oct", swim: 600, wed: 20, sun: 30, deload: true },
  { w: 5, date: "12 Oct", swim: 1000, wed: 35, sun: 50 },
  { w: 6, date: "19 Oct", swim: 1000, wed: 40, sun: 50, note: "Clocks go back on Sunday 25 Oct. Sunday runs are dark from here." },
  { w: 7, date: "26 Oct", swim: 1000, wed: 40, sun: 55 },
  { w: 8, date: "2 Nov", swim: 600, wed: 20, sun: 30, deload: true },
  { w: 9, date: "9 Nov", swim: 1100, wed: 40, sun: 55 },
  { w: 10, date: "16 Nov", swim: 1100, wed: 45, sun: 55 },
  { w: 11, date: "23 Nov", swim: 1100, wed: 45, sun: 60 },
  { w: 12, date: "30 Nov", swim: 600, wed: 25, sun: 30, deload: true },
  { w: 13, date: "7 Dec", swim: 1200, wed: 40, sun: 55 },
  { w: 14, date: "14 Dec", swim: 1200, wed: 45, sun: 60 },
  { w: 15, date: "21 Dec", swim: 600, wed: 25, sun: 35, deload: true, note: "Christmas week: keep it easy and move days freely." },
].map((w) => ({ ...w, run: w.wed + w.sun }));

const swimMain = (m) =>
  m === 600 ? "200 m easy, 4 × 50 m moderate, 200 m easy"
  : m === 1200 ? "6 × 100 m main set"
  : `${(m - 600) / 50} × 50 m main set`;

const ZONES = [
  { zone: "Easy", watts: "240–260 W", use: "Every run. Talk-test easy, walk breaks allowed." },
  { zone: "Strides", watts: "No target", use: "Quick and relaxed, Wednesdays only." },
];

/* ---------- Gait ---------- */

const GAIT_WHY = "Your gym drills build capacity, but you take thousands of automatic steps a day that never see them. A pattern that only holds while you think about it is the normal first stage of learning a movement. It's also exactly what a bony cause looks like, so rule that out first.";

const GAIT_STEPS = [
  {
    title: "1. Rule out a structural cause", color: "#F59E0B",
    lines: [
      "Book one assessment with an MSK or sports physio and ask specifically for femoral torsion (Craig's test, hip rotation range lying face down) and tibial torsion (thigh-foot angle).",
      "If your hips naturally have low internal rotation or your shins are twisted outward, toe-out is how your skeleton lines up. Forcing the feet straight then twists the knee. In that case, stop the walking retraining and keep only the strength work.",
      "If it's structural and pain-free, it may not need fixing at all.",
    ],
  },
  {
    title: "2. Move the practice into your walking", color: "#22C55E",
    lines: [
      "Six weeks, with the feedback fading so the pattern has to run on its own. Use one cue per bout and rotate cues every week or so, because a cue stops working once it goes stale. Keep the ones that click.",
    ],
    phases: [
      { weeks: "Weeks 1–2", name: "Practise", what: "Five 2-minute bouts a day, tied to fixed moments: leaving home, leaving the station, walking into the office, lunch, the walk home. On WFH and baby days, use any walk." },
      { weeks: "Weeks 3–4", name: "Check-ins", what: "Drop the bouts. At the same moments, look at your feet for three steps, correct once, then let it go." },
      { weeks: "Weeks 5–6", name: "Spot checks", what: "Three random phone reminders a day. Check before you correct, and note whether you were already straight. That hit rate is your real score." },
    ],
  },
  {
    title: "3. Measure the walk you don't think about", color: "#38BDF8",
    lines: [
      "Every two weeks, get someone to film 10 seconds of you walking from behind without warning, or prop your phone on a walk and forget it's there. Compare against a week-0 clip. The walk you do while concentrating doesn't count.",
      "Don't aim for dead straight. A slight toe-out of around 5–10° is normal, and overcorrecting into pigeon toes is its own problem.",
    ],
  },
  {
    title: "4. Gym changes", color: "#8B5CF6",
    lines: [
      "Tuesday's warm-up uses seated banded hip internal rotation instead of clamshells. Clamshells train outward rotation, the direction your feet already turn.",
      "The loaded work (step-ups, Copenhagen plank, side plank with leg raise, seated hip abduction) builds the strength underneath. On Wednesday strides, use knee headlights: runs are practice too.",
    ],
    table: true,
  },
];

const WALK_CUES = [
  { name: "Knee headlights", note: "Imagine lights on your kneecaps shining on the path ahead. It sets the angle at the hip, which is often where toe-out comes from, so the foot follows without twisting the knee.", start: true },
  { name: "Train tracks", note: "Each foot lands on its own rail, about a hand's width apart (narrower than your hips), pointing straight ahead. Change the angle, not the width. Pavement joints and floorboards make ready-made rails." },
  { name: "Aim at a target", note: "Pick a lamppost or doorway ahead, point your knees and feet at it, and pick a new one when you reach it." },
  { name: "Push the ground straight back", note: "Push the pavement back behind you through your big and second toes, not off to the side of the big toe." },
  { name: "Heel to second toe", note: "Each step rolls from the heel through the second toe." },
  { name: "Stairs", note: "Land each foot square on the step and use the step edge as a straight line. Station stairs are free practice every day." },
];

const LIFT_CUES = [
  { lift: "Squat", cue: "Corkscrew the feet, knees toward the little toe on the way up" },
  { lift: "Deadlift", cue: "Toes forward, knee tracking over 2nd/3rd toe" },
];

const GAIT_INFO = [
  { where: "Mon", what: "March and short foot, poolside" },
  { where: "Tue", what: "March, short foot, seated banded hip IR" },
  { where: "Wed, Sun", what: "March and short foot before every run" },
  { where: "Thu, Fri", what: "Full corrective set: 90/90, banded walks, single-leg bridges" },
  { where: "Fri core", what: "Side plank with top-leg raise for glute med" },
];

/* ---------- Rules ---------- */

const RULES = [
  {
    title: "Every run is easy", color: "#A3E635",
    lines: [
      "At your stage, easy running delivers most of the gains. It builds the aerobic base and is the specific fix for your HR running high relative to power. Hard sessions add fatigue and injury risk on top of heavy legs and a deficit, for little extra.",
      "Two runs a week is the minimum for progress, so Wednesday and Sunday are fixed. Strides stay: about 2 minutes of quick, relaxed running a week that sharpens form without tiring you.",
      "Revisit a harder session or a distance goal in January, once 45 minutes easy feels comfortable.",
    ],
  },
  {
    title: "Wake times", color: "#FBBF24",
    lines: [
      "Monday 7:00, Tuesday 6:30, Wednesday 6:45, Thursday and Friday 7:00, weekends 8:00.",
      "Office mornings work back from your 9:25 cut-off: leave by 8:35 for the 45-minute commute with 5 minutes spare.",
      "Lights out 22:30–23:00 on weeknights for about 8 hours in bed.",
    ],
  },
  {
    title: "Monday swim", color: "#38BDF8",
    lines: [
      "It replaces the Monday run, so your runs are never on consecutive days and the week starts gently after an 8:00 Sunday.",
      "Easy to moderate, building from 900 m to 1,200 m over the block. Tuesday is bench and pull-ups, so it shouldn't tire your shoulders.",
    ],
  },
  {
    title: "Straight sets", color: "#F472B6",
    lines: [
      "Finish every set of one exercise before moving to the next. It's easier to focus, judge how close each set is to failure, and film a lift from one spot.",
      "It costs about 11 minutes on Tuesday and 5 on Thursday and Friday. If lunch feels long, cut the steam to 10 minutes rather than pairing exercises again.",
    ],
  },
  {
    title: "Steam room: Thursday and Friday", color: "#F97316",
    lines: [
      "15 minutes after stretching, before the shower, on both WFH lunch sessions. Heat after lifting is fine; it's cold immersion that can blunt strength gains.",
      "Not on office mornings: you'd still be sweating on the commute, and it squeezes the 8:35 departure.",
    ],
  },
  {
    title: "Why 3 gym days, not 4", color: "#F59E0B",
    lines: [
      "Thursday and Friday carry upper-body work, so chest, back, shoulders and legs are each trained twice a week across 3 sessions.",
      "A second early gym morning would take the swim or one of your two runs, or take Saturday, your only full rest day, during a deficit and after a day of solo childcare.",
    ],
  },
  {
    title: "Squat Thursday, deadlift Friday", color: "#3B82F6",
    lines: [
      "Back-to-back heavy lower days are the one compromise of a Thu–Fri WFH week.",
      "Thursday has no hinge (ball hamstring curl instead of RDL) and step-ups stay at RPE 7, so your lower back arrives fresh for deadlifts. Saturday's rest then sits between deadlifts and Sunday's run.",
    ],
  },
  {
    title: "Runs never share a day with heavy legs", color: "#14B8A6",
    lines: [
      "No running on Thursday or Friday. Wednesday's run is easy and its strides are too short to affect Thursday's squats, and Sunday's run comes more than 48 hours after Friday's deadlifts.",
    ],
  },
  {
    title: "Progression", color: "#8B5CF6",
    lines: [
      "Double progression at RPE 7–8. When every set hits the top of the rep range, add 2.5 kg on upper lifts, 5 kg on squat and deadlift, or move to the next dumbbell.",
      "Start from your last Hevy numbers. In a deficit, holding a load for a few weeks is still a win: lifts are the progress signal, not the scale.",
    ],
  },
  {
    title: "Deload weeks 4, 8, 12 and 15", color: "#10B981",
    lines: [
      "Everything drops back in the same week.",
      "Lifting: one set fewer on every exercise, same loads, RPE around 6. Running: both runs roughly halve, no strides. Swim: about 600 m easy.",
      "Non-negotiable. Missed volume is never made up the following week.",
    ],
  },
  {
    title: "Bad-signal days", color: "#E11D48",
    lines: [
      "If Body Battery, HRV and resting HR are all off together, swap the session rather than trimming it.",
      "A run drops to 20 minutes or becomes a brisk walk. The swim becomes 15 minutes easy. A lift becomes top sets at RPE 6 with accessories dropped.",
    ],
  },
  {
    title: "Missed sessions", color: "#A1A1AA",
    lines: [
      "Wednesday run: drop it. Never move it to Thursday or Friday.",
      "Sunday run: do it Monday morning instead of the swim, up to 40 minutes.",
      "Monday swim: just skip it. Thursday lift: do Friday as planned, and squats come back next week.",
    ],
  },
];

const GEAR = [
  "Running shoes", "Gym shoes (flat sole)", "Swim trunks, goggles and cap (Monday)",
  "Head torch and reflective layer (dark Wednesday mornings, Sunday evenings)",
  "Light resistance band", "Medium mini band", "Water bottle (1 L)", "Two towels",
  "Flip-flops (pool and steam)", "Locker lock", "Protein shake or snack",
];

/* ---------- UI pieces ---------- */

function TagPill({ tag }) {
  const c = tag === GAIT ? "#F59E0B" : "#22D3EE";
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 6, background: c + "1f", color: c, whiteSpace: "nowrap" }}>
      {tag === GAIT ? "🦶 Gait" : "⚡ Elastic"}
    </span>
  );
}

function DrillList({ items }) {
  return (
    <>
      {items.map((ex, i) => (
        <div key={i} style={{ padding: "9px 4px", borderBottom: i < items.length - 1 ? `1px solid ${Z.line}` : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: Z.text }}>{ex.name}</span>
            <span style={{ fontSize: 11, color: Z.soft, whiteSpace: "nowrap" }}>{ex.duration}</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 3, flexWrap: "wrap" }}>
            {ex.tag && <TagPill tag={ex.tag} />}
            <span style={{ fontSize: 11.5, color: Z.mute, lineHeight: 1.4 }}>{ex.notes}</span>
          </div>
        </div>
      ))}
    </>
  );
}

function ExerciseList({ items, color }) {
  return (
    <>
      {items.map((ex, i) => (
        <div key={i} style={{ padding: "10px 4px", borderBottom: i < items.length - 1 ? `1px solid ${Z.line}` : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: Z.text }}>
              <span style={{ color: Z.mute, fontWeight: 600, marginRight: 6 }}>{i + 1}</span>{ex.name}
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 800, color, whiteSpace: "nowrap" }}>{ex.sets}</span>
          </div>
          <div style={{ fontSize: 11, color: Z.soft, marginTop: 2 }}>Rest {ex.rest}</div>
          <div style={{ fontSize: 11.5, color: Z.mute, marginTop: 3, lineHeight: 1.4 }}>{ex.notes}</div>
        </div>
      ))}
    </>
  );
}

function PhaseList({ items, color }) {
  return (
    <>
      {items.map((p, i) => (
        <div key={i} style={{ padding: "9px 4px", borderBottom: i < items.length - 1 ? `1px solid ${Z.line}` : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>{p.phase}</span>
            <span style={{ fontSize: 12.5, fontWeight: 800, color, whiteSpace: "nowrap" }}>{p.duration}</span>
          </div>
          <div style={{ fontSize: 11.5, color: Z.mute, marginTop: 3, lineHeight: 1.4 }}>{p.notes}</div>
        </div>
      ))}
    </>
  );
}

function Section({ label, count, color, isOpen, onToggle, children }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%", padding: "12px 14px", background: isOpen ? Z.raised : "transparent",
          border: `1px solid ${isOpen ? color + "40" : Z.line}`, borderRadius: isOpen ? "12px 12px 0 0" : 12,
          cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
          fontFamily: "inherit", color: isOpen ? color : Z.soft,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>{label}</span>
          {count != null && (
            <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: color + "1a", color, fontWeight: 700 }}>{count}</span>
          )}
        </span>
        <span style={{ fontSize: 10, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
      </button>
      {isOpen && (
        <div style={{ padding: "6px 12px 10px", background: Z.panel, borderRadius: "0 0 12px 12px", border: `1px solid ${color}25`, borderTop: "none" }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Rows({ rows, total, color }) {
  return (
    <>
      {rows.map(([a, b], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "7px 4px", borderBottom: `1px solid ${Z.line}`, fontSize: 12.5 }}>
          <span style={{ color: Z.soft }}>{a}</span>
          <span style={{ color: Z.text, fontWeight: 600, whiteSpace: "nowrap" }}>{b}</span>
        </div>
      ))}
      {total && (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 4px 2px", fontSize: 13, fontWeight: 800 }}>
          <span>Total</span>
          <span style={{ color }}>{total}</span>
        </div>
      )}
    </>
  );
}

function Card({ color, title, children, mb = 10 }) {
  return (
    <div style={{ padding: "13px 15px", borderRadius: 14, background: Z.panel, border: `1px solid ${Z.line}`, borderLeft: color ? `3px solid ${color}` : `1px solid ${Z.line}`, marginBottom: mb }}>
      {title && <div style={{ fontSize: 14, fontWeight: 800, color: color || Z.text, marginBottom: 6 }}>{title}</div>}
      {children}
    </div>
  );
}

function Para({ children, first }) {
  return <p style={{ fontSize: 12.5, color: Z.soft, lineHeight: 1.55, margin: first ? 0 : "6px 0 0" }}>{children}</p>;
}

/* ---------- Main ---------- */

export default function TrainingPlan() {
  const [tab, setTab] = useState("week");
  const [sel, setSel] = useState("mon");
  const [open, setOpen] = useState("main");
  const day = DAYS.find((d) => d.id === sel);
  const toggle = (id) => setOpen(open === id ? null : id);
  const pick = (id) => { setSel(id); setOpen("main"); };

  const badgeColor = (b) => (b === "Office" ? "#F59E0B" : b === "WFH" ? "#10B981" : "#EC4899");
  const totalRunMin = WEEKS.reduce((s, w) => s + w.run, 0);
  const mainLabel = day.kind === "lift" ? "Working sets" : day.kind === "swim" ? "The swim" : "The run";

  return (
    <div style={{ minHeight: "100vh", background: Z.bg, color: Z.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif", padding: "20px 14px 48px" }}>
      <style>{`button:focus-visible{outline:2px solid #ececef;outline-offset:2px}`}</style>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <h1 style={{ fontSize: 23, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Training plan, 14 Sep to 25 Dec</h1>
        <p style={{ fontSize: 13, color: Z.soft, margin: "5px 0 16px", lineHeight: 1.45 }}>
          3 lifts, 2 easy runs, a swim, steam twice and 1 rest day. Office Monday to Wednesday, home Thursday and Friday, the baby at weekends.
        </p>

        <div role="tablist" style={{ display: "flex", gap: 6, marginBottom: 16, background: Z.panel, padding: 4, borderRadius: 12, border: `1px solid ${Z.line}` }}>
          {[["week", "Week"], ["block", "Block"], ["gait", "Gait"], ["rules", "Rules"]].map(([id, lbl]) => (
            <button
              key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
              style={{ flex: 1, padding: "9px 6px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, background: tab === id ? Z.raised : "transparent", color: tab === id ? Z.text : Z.mute }}
            >
              {lbl}
            </button>
          ))}
        </div>

        {tab === "week" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 16 }}>
              {DAYS.map((d) => {
                const on = d.id === sel;
                return (
                  <button
                    key={d.id} onClick={() => pick(d.id)} aria-pressed={on}
                    style={{ padding: "8px 2px 6px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", background: on ? d.color + "1f" : Z.panel, border: `1px solid ${on ? d.color + "70" : Z.line}`, color: on ? d.color : Z.soft, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 800 }}>{d.short}</span>
                    <span style={{ fontSize: 15 }}>{d.icon}</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: on ? d.color : Z.mute, whiteSpace: "nowrap" }}>{d.chip}</span>
                    <span style={{ fontSize: 8.5, color: Z.mute, whiteSpace: "nowrap" }}>⏰{d.wake}</span>
                    <span style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 12, marginTop: 1 }} aria-label={`Load ${d.load} of 3`}>
                      {[1, 2, 3].map((n) => (
                        <span key={n} style={{ width: 4, height: 4 * n, borderRadius: 1, background: n <= d.load ? d.color : Z.line }} />
                      ))}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ padding: "14px 16px", borderRadius: 14, background: Z.panel, border: `1px solid ${day.color}35`, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: Z.mute, fontWeight: 600 }}>{day.day}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: day.color, letterSpacing: "-0.01em" }}>{day.icon} {day.label}</div>
                  <div style={{ fontSize: 12.5, color: Z.soft, marginTop: 2 }}>{day.sublabel}</div>
                  {day.extras && (
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 7 }}>
                      {day.extras.map((x) => (
                        <span key={x} style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 8px", borderRadius: 8, background: "#F973161a", color: "#FDBA74" }}>{x}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 8px", borderRadius: 8, background: badgeColor(day.badge) + "1f", color: badgeColor(day.badge) }}>{day.badge}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: Z.text, whiteSpace: "nowrap" }}>⏰ Wake {day.wake}</span>
                  {day.slot && <span style={{ fontSize: 11, color: Z.soft, whiteSpace: "nowrap" }}>{day.slot}</span>}
                  {day.total && <span style={{ fontSize: 11, color: Z.mute, whiteSpace: "nowrap" }}>{day.total}</span>}
                </div>
              </div>
              {day.note && <p style={{ fontSize: 12.5, color: Z.soft, lineHeight: 1.55, margin: "10px 0 0" }}>{day.note}</p>}
              {day.tip && (
                <div style={{ marginTop: 10, padding: "9px 10px", borderRadius: 9, background: day.color + "12", fontSize: 11.5, color: Z.soft, lineHeight: 1.45 }}>{day.tip}</div>
              )}
              {(day.kind === "run" || day.kind === "swim") && (
                <button onClick={() => setTab("block")} style={{ marginTop: 10, padding: "7px 12px", borderRadius: 8, border: `1px solid ${day.color}50`, background: "transparent", color: day.color, fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  See this week's numbers
                </button>
              )}
            </div>

            {day.kind !== "rest" && (
              <>
                <Section label={day.warmupLabel} count={day.warmup.length} color={day.color} isOpen={open === "warm"} onToggle={() => toggle("warm")}>
                  <DrillList items={day.warmup} />
                </Section>

                {day.warmupSets && (
                  <Section label={day.warmupSetsLabel} count={day.warmupSets.length} color={day.color} isOpen={open === "wsets"} onToggle={() => toggle("wsets")}>
                    {day.warmupSets.map((s, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, padding: "8px 4px", borderBottom: i < day.warmupSets.length - 1 ? `1px solid ${Z.line}` : "none" }}>
                        <span style={{ width: 20, height: 20, borderRadius: 6, background: day.color + "20", color: day.color, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.set}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600 }}>
                            <span>{s.weight}</span><span style={{ color: Z.soft }}>× {s.reps}</span>
                          </div>
                          <div style={{ fontSize: 11.5, color: Z.mute, marginTop: 2 }}>{s.notes}</div>
                        </div>
                      </div>
                    ))}
                  </Section>
                )}

                <Section label={mainLabel} count={day.kind === "lift" ? day.exercises.length : null} color={day.color} isOpen={open === "main"} onToggle={() => toggle("main")}>
                  {day.kind === "lift" ? <ExerciseList items={day.exercises} color={day.color} /> : <PhaseList items={day.main} color={day.color} />}
                </Section>

                <Section label={day.cooldownLabel} count={day.cooldown.length} color={day.color} isOpen={open === "cool"} onToggle={() => toggle("cool")}>
                  <DrillList items={day.cooldown} />
                </Section>

                {day.steam && (
                  <Section label="Steam room" count="15 min" color="#F97316" isOpen={open === "steam"} onToggle={() => toggle("steam")}>
                    <DrillList items={STEAM_NOTES} />
                  </Section>
                )}

                <Section label="Time and timeline" color={day.color} isOpen={open === "time"} onToggle={() => toggle("time")}>
                  <Rows rows={day.time} total={day.total} color={day.color} />
                  <div style={{ fontSize: 12, fontWeight: 700, color: Z.soft, margin: "14px 4px 4px" }}>The day</div>
                  <Rows rows={day.timeline} />
                </Section>
              </>
            )}
          </>
        )}

        {tab === "block" && (
          <>
            <Card>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: 0 }}>
                Two easy runs and one swim a week. Running builds from 70 to 105 minutes a week, no run goes past an hour, and every fourth week everything drops back.
              </p>
              <p style={{ fontSize: 12, color: Z.soft, lineHeight: 1.5, margin: "8px 0 0" }}>
                About {Math.round(totalRunMin / 60)} hours of running over the block. The minutes are the target; kilometres are just the scorecard. A distance goal can come back in January.
              </p>
            </Card>

            <Card title="Effort" mb={16}>
              {ZONES.map((z, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 80px 1fr", gap: 8, padding: "6px 0", borderTop: i ? `1px solid ${Z.line}` : "none", fontSize: 12 }}>
                  <span style={{ fontWeight: 700 }}>{z.zone}</span>
                  <span style={{ color: "#22C55E", fontWeight: 700 }}>{z.watts}</span>
                  <span style={{ color: Z.mute }}>{z.use}</span>
                </div>
              ))}
              <p style={{ fontSize: 11.5, color: Z.mute, margin: "8px 0 0", lineHeight: 1.45 }}>
                As weight comes off, the same effort reads lower in watts. If 240–260 W stops matching a pace you could chat at, trust the talk test.
              </p>
            </Card>

            {WEEKS.map((wk) => {
              const block = BLOCKS.find((b) => b.from === wk.w);
              return (
                <div key={wk.w}>
                  {block && <div style={{ fontSize: 13, fontWeight: 800, color: Z.soft, margin: "14px 2px 8px" }}>{block.name}</div>}
                  <div style={{ padding: "10px 12px", borderRadius: 12, marginBottom: 6, background: wk.deload ? "transparent" : Z.panel, border: `1px ${wk.deload ? "dashed" : "solid"} ${Z.line}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>
                        Week {wk.w} <span style={{ color: Z.mute, fontWeight: 500 }}>from {wk.date}</span>
                        {wk.deload && <span style={{ fontSize: 10.5, color: "#10B981", fontWeight: 700, marginLeft: 6 }}>Deload</span>}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: wk.deload ? Z.soft : "#22C55E" }}>{wk.run} min running</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 3, background: Z.line, margin: "7px 0 8px", overflow: "hidden" }}>
                      <div style={{ width: `${(wk.run / 110) * 100}%`, height: "100%", background: wk.deload ? "#52525B" : "#22C55E", borderRadius: 3 }} />
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                      <span style={{ color: "#38BDF8", fontWeight: 700 }}>Mon swim {wk.swim.toLocaleString()} m</span>
                      <span style={{ color: Z.mute }}>, {swimMain(wk.swim)}</span>
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                      <span style={{ color: "#A3E635", fontWeight: 700 }}>Wed {wk.wed} min</span>
                      <span style={{ color: Z.mute }}>{wk.deload ? " easy" : " easy + strides"}, </span>
                      <span style={{ color: "#22C55E", fontWeight: 700 }}>Sun {wk.sun} min</span>
                      <span style={{ color: Z.mute }}> easy</span>
                    </div>
                    {wk.note && <div style={{ fontSize: 11, color: Z.mute, marginTop: 4 }}>{wk.note}</div>}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {tab === "gait" && (
          <>
            <Card title="Why it isn't sticking" color="#F59E0B" mb={12}>
              <Para first>{GAIT_WHY}</Para>
            </Card>

            {GAIT_STEPS.map((st, i) => (
              <Card key={i} title={st.title} color={st.color}>
                {st.lines.map((l, j) => <Para key={j} first={j === 0}>{l}</Para>)}
                {st.phases && (
                  <div style={{ marginTop: 10 }}>
                    {st.phases.map((ph) => (
                      <div key={ph.weeks} style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 10, padding: "8px 0", borderTop: `1px solid ${Z.line}` }}>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 800 }}>{ph.weeks}</div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: st.color }}>{ph.name}</div>
                        </div>
                        <div style={{ fontSize: 12, color: Z.soft, lineHeight: 1.5 }}>{ph.what}</div>
                      </div>
                    ))}
                  </div>
                )}
                {st.table && (
                  <div style={{ marginTop: 10 }}>
                    {GAIT_INFO.map((g, k) => (
                      <div key={k} style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 8, padding: "6px 0", borderTop: `1px solid ${Z.line}`, fontSize: 12 }}>
                        <span style={{ fontWeight: 700 }}>{g.where}</span>
                        <span style={{ color: Z.soft }}>{g.what}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}

            <Card title="Walking cues" color="#22C55E">
              <Para first>One cue per bout. Start with knee headlights, then rotate.</Para>
              <div style={{ marginTop: 8 }}>
                {WALK_CUES.map((c) => (
                  <div key={c.name} style={{ padding: "8px 0", borderTop: `1px solid ${Z.line}` }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>
                      {c.name}
                      {c.start && <span style={{ fontSize: 10.5, color: "#22C55E", fontWeight: 700, marginLeft: 6 }}>Start here</span>}
                    </div>
                    <div style={{ fontSize: 12, color: Z.soft, lineHeight: 1.5, marginTop: 2 }}>{c.note}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Lifting cues">
              {LIFT_CUES.map((c, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 8, padding: "6px 0", borderTop: i ? `1px solid ${Z.line}` : "none", fontSize: 12 }}>
                  <span style={{ fontWeight: 700 }}>{c.lift}</span>
                  <span style={{ color: Z.soft }}>{c.cue}</span>
                </div>
              ))}
            </Card>
          </>
        )}

        {tab === "rules" && (
          <>
            {RULES.map((r, i) => (
              <Card key={i} title={r.title} color={r.color}>
                {r.lines.map((l, j) => <Para key={j} first={j === 0}>{l}</Para>)}
              </Card>
            ))}
            <Card title="Kit">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {GEAR.map((g, i) => (
                  <span key={i} style={{ fontSize: 11.5, padding: "5px 9px", borderRadius: 8, background: Z.raised, color: Z.soft }}>{g}</span>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
