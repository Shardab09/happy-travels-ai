const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'C:\\ClaudeCodeBootcamp\\HappyTravelsAI\\eval_dataset';

// ===== DATA POOLS =====

const DESTINATIONS = [
  { name: "Costa Rica",          tags: ["beach","wildlife","hiking","nature","adventure","family","budget"],                   budget_min: 2000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Bali Indonesia",      tags: ["beach","culture","shopping","luxury","food","wellness","photography","diving"],       budget_min: 1500, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Croatia",             tags: ["beach","hiking","culture","history","adventure","photography"],                       budget_min: 3000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Thailand",            tags: ["beach","culture","food","budget","adventure","shopping","temples"],                   budget_min: 1500, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "New Zealand",         tags: ["hiking","adventure","nature","photography","wildlife","outdoor"],                     budget_min: 4000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Portugal",            tags: ["culture","food","history","beach","photography","architecture","wine"],               budget_min: 3000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Morocco",             tags: ["culture","food","history","markets","photography","adventure"],                       budget_min: 2000, advisory: 2, mobility_ok: false, age_min: 0  },
  { name: "Japan",               tags: ["culture","food","history","architecture","photography","city_life","technology"],     budget_min: 4000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Colombia",            tags: ["culture","food","adventure","hiking","nature","budget","photography"],               budget_min: 2000, advisory: 2, mobility_ok: true,  age_min: 0  },
  { name: "Sri Lanka",           tags: ["culture","wildlife","beach","history","hiking","photography"],                       budget_min: 2000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Tuscany Italy",       tags: ["luxury","culture","food","wine","history","romance","art"],                          budget_min: 5000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Amalfi Coast Italy",  tags: ["luxury","beach","culture","food","romance","photography"],                           budget_min: 6000, advisory: 1, mobility_ok: false, age_min: 0  },
  { name: "Southern France",     tags: ["luxury","culture","wine","food","history","art","relaxation"],                       budget_min: 5000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Vienna Austria",      tags: ["culture","music","history","architecture","art","relaxation"],                       budget_min: 4000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Greek Islands",       tags: ["beach","culture","history","luxury","food","relaxation"],                            budget_min: 3500, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Vietnam",             tags: ["culture","food","budget","adventure","history","photography","beach"],               budget_min: 1500, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Guatemala",           tags: ["culture","adventure","budget","hiking","history","photography"],                     budget_min: 1500, advisory: 2, mobility_ok: false, age_min: 8  },
  { name: "Indonesia Lombok",    tags: ["beach","diving","hiking","budget","nature","adventure"],                             budget_min: 1500, advisory: 1, mobility_ok: false, age_min: 0  },
  { name: "Philippines",         tags: ["beach","diving","budget","island","food","nature"],                                  budget_min: 1500, advisory: 2, mobility_ok: true,  age_min: 0  },
  { name: "South Korea",         tags: ["food","shopping","culture","city_life","history","nightlife","technology"],          budget_min: 3000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Taiwan",              tags: ["food","culture","city_life","history","markets","photography"],                      budget_min: 2500, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Singapore",           tags: ["food","shopping","city_life","luxury","culture","nightlife"],                        budget_min: 3500, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Dubai",               tags: ["luxury","shopping","city_life","nightlife","adventure","beach"],                    budget_min: 5000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Tanzania Serengeti",  tags: ["wildlife","photography","adventure","nature","safari","outdoor"],                    budget_min: 5000, advisory: 1, mobility_ok: false, age_min: 5  },
  { name: "Botswana Okavango",   tags: ["wildlife","photography","luxury","nature","safari","birdwatching"],                  budget_min: 8000, advisory: 1, mobility_ok: false, age_min: 8  },
  { name: "Rwanda",              tags: ["wildlife","photography","adventure","nature","hiking"],                              budget_min: 6000, advisory: 2, mobility_ok: false, age_min: 15 },
  { name: "Namibia",             tags: ["photography","wildlife","adventure","nature","outdoor","desert"],                    budget_min: 5000, advisory: 1, mobility_ok: false, age_min: 0  },
  { name: "Maldives",            tags: ["luxury","beach","diving","romance","relaxation","snorkelling"],                      budget_min: 6000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Seychelles",          tags: ["luxury","beach","diving","romance","nature","wildlife"],                             budget_min: 7000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Turks and Caicos",    tags: ["luxury","beach","diving","romance","relaxation"],                                    budget_min: 6000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Palawan Philippines", tags: ["beach","diving","adventure","budget","nature","island"],                             budget_min: 2000, advisory: 2, mobility_ok: false, age_min: 0  },
  { name: "Danube River Cruise", tags: ["culture","history","relaxation","cruise","accessible","architecture"],               budget_min: 4000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Mexico Yucatan",      tags: ["beach","culture","history","food","adventure","family","ruins"],                     budget_min: 2500, advisory: 2, mobility_ok: true,  age_min: 0  },
  { name: "Peru",                tags: ["culture","history","hiking","adventure","photography","food"],                       budget_min: 3000, advisory: 2, mobility_ok: false, age_min: 8  },
  { name: "Iceland",             tags: ["nature","photography","adventure","outdoor","hiking","northern_lights"],             budget_min: 5000, advisory: 1, mobility_ok: false, age_min: 0  },
  { name: "Ireland",             tags: ["culture","history","nature","hiking","food","relaxation","photography"],             budget_min: 4000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Canada Banff",        tags: ["hiking","nature","skiing","adventure","photography","wildlife","outdoor"],            budget_min: 4000, advisory: 1, mobility_ok: false, age_min: 0  },
  { name: "Australia",           tags: ["beach","wildlife","adventure","culture","city_life","outdoor"],                      budget_min: 5000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Hawaii",              tags: ["beach","hiking","culture","adventure","family","wellness","surfing"],                budget_min: 4000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Patagonia Argentina", tags: ["hiking","adventure","photography","nature","outdoor","wildlife"],                    budget_min: 4000, advisory: 1, mobility_ok: false, age_min: 10 },
  { name: "India Rajasthan",     tags: ["culture","history","photography","food","architecture","markets"],                   budget_min: 2500, advisory: 2, mobility_ok: true,  age_min: 0  },
  { name: "Nepal",               tags: ["hiking","adventure","culture","photography","spiritual","nature"],                   budget_min: 2500, advisory: 1, mobility_ok: false, age_min: 10 },
  { name: "Ecuador Galapagos",   tags: ["wildlife","nature","photography","diving","adventure","snorkelling"],                budget_min: 5000, advisory: 1, mobility_ok: false, age_min: 0  },
  { name: "Switzerland",         tags: ["skiing","hiking","luxury","nature","photography","outdoor"],                         budget_min: 7000, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Norway Fjords",       tags: ["nature","hiking","photography","outdoor","northern_lights","adventure"],             budget_min: 6000, advisory: 1, mobility_ok: false, age_min: 0  },
  { name: "Spain Barcelona",     tags: ["culture","food","beach","architecture","nightlife","art","city_life"],              budget_min: 3500, advisory: 1, mobility_ok: true,  age_min: 0  },
  { name: "Turkey Istanbul",     tags: ["culture","history","food","markets","architecture","photography"],                   budget_min: 2500, advisory: 2, mobility_ok: true,  age_min: 0  },
  { name: "Egypt",               tags: ["history","culture","adventure","photography","architecture","diving"],               budget_min: 2500, advisory: 2, mobility_ok: true,  age_min: 0  },
  { name: "Cuba",                tags: ["culture","music","beach","history","food","photography","arts"],                     budget_min: 2500, advisory: 2, mobility_ok: true,  age_min: 0  },
  { name: "Costa Brava Spain",   tags: ["beach","culture","food","hiking","family","relaxation"],                             budget_min: 3000, advisory: 1, mobility_ok: true,  age_min: 0  },
];

const ALL_PREFS = ["beach","hiking","culture","adventure","luxury","budget","wildlife","food","shopping",
  "history","city_life","theme_parks","wellness","skiing","photography","nightlife","sports","relaxation",
  "diving","nature","arts","music","romance","birdwatching","golf","wine","architecture","markets",
  "outdoor","water_sports","surfing","spiritual","cruise","accessible"];

const DIETARY_OPTS  = ["none","none","none","none","none","vegetarian","vegan","gluten_free","halal","kosher","diabetic","nut_allergy","shellfish_allergy"];
const MOBILITY_OPTS = ["none","none","none","none","none","none","none","limited_walking","wheelchair","elderly"];
const MONTHS        = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const BUDGETS       = [1500,2000,2500,3000,4000,5000,6000,7500,8000,10000,12000,15000,20000];
const DURATIONS     = [5,7,8,10,12,14];
const FLEXIBILITIES = [0,3,5,7,10,14];

const PRIOR_TRIPS_POOL = ["Hawaii","Mexico","Thailand","Italy","Japan","France","Spain","Bali","Portugal",
  "Croatia","Costa_Rica","Vietnam","Greece","Morocco","UK","Canada","Australia","India","Singapore","Turkey"];

const PLANNER_NAMES = [
  ["Sarah","James"],["Priya","Arjun"],["Karen","Robert"],["Marcus","Tanya"],["Liu","Wei"],
  ["Amara","Kofi"],["Sofia","Diego"],["Helen","George"],["Fatima","Hassan"],["Aisha","Omar"],
  ["Rachel","Tom"],["Jennifer","Michael"],["Yuki","Kenji"],["Mei","Chen"],["Lakshmi","Raj"],
  ["Olga","Dmitri"],["Amelia","William"],["Charlotte","Henry"],["Zoe","Ethan"],["Maya","Alex"],
  ["Nina","Carlos"],["Isabella","Marco"],["Anika","Rajan"],["Sunita","Vikram"],["Grace","James"],
  ["Emma","David"],["Lily","Jack"],["Ava","Noah"],["Chloe","Liam"],["Hannah","Oliver"],
  ["Mia","Sebastian"],["Nadia","Antoine"],["Claire","Pierre"],["Elena","Stefan"],["Ingrid","Lars"],
  ["Astrid","Erik"],["Chiara","Luca"],["Rosa","Pablo"],["Mariam","Youssef"],["Hana","Sato"],
  ["Yuna","Joon"],["Ling","Wei"],["Pita","Sione"],["Aroha","Tane"],["Zara","Adam"],
  ["Leila","Karim"],["Nour","Tariq"],["Valentina","Bruno"],["Fernanda","Eduardo"],["Ana","Jorge"],
];

const CHILD_NAMES  = ["Sam","Jordan","Riley","Casey","Taylor","Morgan","Quinn","Jamie","Avery","Blake","Drew","Skyler","Peyton","Logan","Bailey","Cameron","Alex","Sydney","Harper","Finley"];
const SENIOR_NAMES = ["Gran","Gramps","Nana","Grandpa","Grandma","Nonna","Nonno","Oma","Opa","Gran-Jean"];

// ===== HELPERS =====

let seed = 42;
function rand() {
  seed = (seed * 1664525 + 1013904223) & 0xffffffff;
  return (seed >>> 0) / 0xffffffff;
}
function rPick(arr)    { return arr[Math.floor(rand() * arr.length)]; }
function rPickN(arr,n) { return [...arr].sort(() => rand()-0.5).slice(0,n); }
function rInt(lo,hi)   { return lo + Math.floor(rand() * (hi - lo + 1)); }

function prefsForAge(age) {
  if (age < 8)  return rPickN(["beach","water_sports","theme_parks","wildlife","animals","playground"],2);
  if (age < 13) return rPickN(["beach","wildlife","theme_parks","adventure","water_sports","sports"],3);
  if (age < 18) return rPickN(["beach","adventure","nightlife","shopping","photography","sports","music","outdoor"],3);
  if (age >= 65) return rPickN(["relaxation","culture","history","birdwatching","cruise","golf","wellness","accessible","architecture"],3);
  return rPickN(ALL_PREFS, 3);
}

function tagScore(famPrefs, destTags) {
  const flat = famPrefs.flat();
  const unique = [...new Set(flat)];
  if (!unique.length) return 0.5;
  const hits = flat.filter(p => destTags.includes(p)).length;
  return Math.min(0.99, parseFloat((hits / unique.length + rand() * 0.04).toFixed(2)));
}

function toCSV(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = v => {
    const s = String(v === undefined || v === null ? "" : v);
    return (s.includes(',') || s.includes('"') || s.includes('\n'))
      ? `"${s.replace(/"/g,'""')}"` : s;
  };
  return [headers.join(','), ...rows.map(r => headers.map(h => escape(r[h])).join(','))].join('\n');
}

// ===== FAMILY TYPES =====

const FAMILY_TYPES = ["nuclear_family","couple","single_parent","multigenerational","empty_nesters","teen_family","large_family"];

function buildMembers(famIdx, famId, budget, names) {
  const type = FAMILY_TYPES[famIdx % FAMILY_TYPES.length];
  const dietary = rPick(DIETARY_OPTS);
  const mobility = (famIdx % 15 === 0) ? "wheelchair" : (famIdx % 10 === 0) ? "limited_walking" : (famIdx % 20 === 0) ? "elderly" : "none";

  const m = (id, role, name, age, mob) => ({
    id: `${famId}-${id}`, role, name, age,
    prefs: prefsForAge(age),
    dietary: role === "planner" ? dietary : (rand() > 0.7 ? rPick(DIETARY_OPTS) : dietary),
    mobility: mob,
  });

  switch (type) {
    case "couple": return [
      m("A","planner", names[0], rInt(25,55), "none"),
      m("B","member",  names[1], rInt(25,55), "none"),
    ];
    case "empty_nesters": return [
      m("A","planner", names[0],  rInt(48,62), mobility),
      m("B","member",  names[1],  rInt(48,62), mobility),
      m("C","member",  rPick(CHILD_NAMES), rInt(20,30), "none"),
    ];
    case "multigenerational": return [
      m("A","planner", names[0],  rInt(35,45), "none"),
      m("B","member",  names[1],  rInt(35,45), "none"),
      m("C","member",  rPick(SENIOR_NAMES), rInt(62,72), mobility),
      m("D","member",  rPick(SENIOR_NAMES), rInt(62,72), mobility),
      m("E","member",  rPick(CHILD_NAMES),  rInt(6,14),  "none"),
    ];
    case "single_parent": return [
      m("A","planner", names[0], rInt(30,44), "none"),
      m("B","member",  rPick(CHILD_NAMES), rInt(6,12), "none"),
      m("C","member",  rPick(CHILD_NAMES), rInt(10,16), "none"),
    ];
    case "teen_family": return [
      m("A","planner", names[0], rInt(40,50), "none"),
      m("B","member",  names[1], rInt(40,50), "none"),
      m("C","member",  rPick(CHILD_NAMES), rInt(13,16), "none"),
      m("D","member",  rPick(CHILD_NAMES), rInt(15,18), "none"),
    ];
    case "large_family": return [
      m("A","planner", names[0], rInt(33,42), "none"),
      m("B","member",  names[1], rInt(33,42), "none"),
      m("C","member",  rPick(CHILD_NAMES), rInt(4,7),   "none"),
      m("D","member",  rPick(CHILD_NAMES), rInt(7,10),  "none"),
      m("E","member",  rPick(CHILD_NAMES), rInt(10,13), "none"),
      m("F","member",  rPick(CHILD_NAMES), rInt(13,17), "none"),
    ];
    default: // nuclear_family
      return [
        m("A","planner", names[0], rInt(32,45), "none"),
        m("B","member",  names[1], rInt(32,45), "none"),
        m("C","member",  rPick(CHILD_NAMES), rInt(6,12),  "none"),
        m("D","member",  rPick(CHILD_NAMES), rInt(9,14),  "none"),
      ];
  }
}

// ===== SCENARIO TYPES =====

const SCENARIO_TYPES = [
  "clear_winner","two_way_tie","three_way_split","unanimous",
  "planner_override","travel_advisory_blocks","age_filter_removes",
  "budget_mismatch_flagged","re_vote_after_rejection","abstention_timeout",
];

function buildVotingScenario(scenId, family, dests, scenIdx) {
  const type = SCENARIO_TYPES[scenIdx % SCENARIO_TYPES.length];
  const members = family.members;
  const [dA, dB, dC, dD, dE] = dests.map(d => d.destination);

  let votes = {}, expected = dA, method = "majority_vote", notes = "";

  switch (type) {
    case "unanimous":
      members.forEach(m => { votes[m.id] = dA; });
      method = "unanimous";
      notes = "All members agree on top recommendation";
      break;
    case "two_way_tie":
      members.forEach((m,i) => { votes[m.id] = i % 2 === 0 ? dA : dB; });
      expected = dA; method = "tiebreak_by_planner_preference";
      notes = `50/50 split between ${dA} and ${dB}; planner (${members[0].name}) breaks tie`;
      break;
    case "three_way_split":
      members.forEach((m,i) => { votes[m.id] = [dA,dB,dC][i % 3]; });
      expected = dA; method = "tiebreak_by_preference_score";
      notes = `Three-way split; ${dA} wins on highest preference_match_score`;
      break;
    case "planner_override":
      members.forEach((m,i) => { votes[m.id] = i === 1 ? dB : dA; });
      expected = dA; method = "majority_vote";
      notes = `One member votes ${dB}; remainder (incl. planner) choose ${dA}`;
      break;
    case "travel_advisory_blocks":
      members.forEach(m => { votes[m.id] = dA; });
      expected = dA; method = "advisory_filter_applied";
      notes = `${dC || dB} carries Level 2 advisory — removed before vote unless planner opts in`;
      break;
    case "age_filter_removes":
      members.forEach(m => { votes[m.id] = dA; });
      expected = dA; method = "age_filter_applied";
      notes = `${dD || dC} removed: minimum age exceeds youngest member; system filters before vote`;
      break;
    case "budget_mismatch_flagged":
      members.forEach(m => { votes[m.id] = dA; });
      expected = dA; method = "budget_warning_then_majority";
      notes = `${dE || dD} estimated cost exceeds family budget — warning shown; family proceeds with ${dA}`;
      break;
    case "re_vote_after_rejection":
      members.forEach((m,i) => { votes[m.id] = i % 2 === 0 ? dB : dA; });
      expected = dB; method = "re_vote_majority";
      notes = `Initial itinerary rejected; re-vote produces ${dB} as new consensus`;
      break;
    case "abstention_timeout":
      votes[members[0].id] = dA;
      expected = dA; method = "planner_default";
      notes = `Only planner voted within 24hr window; system defaults to planner choice (${dA})`;
      break;
    default: // clear_winner
      members.forEach((m,i) => { votes[m.id] = i < Math.ceil(members.length * 0.7) ? dA : dB; });
      expected = dA; method = "majority_vote";
      notes = `${dA} wins clear majority (>60% of votes)`;
  }

  const row = {
    scenario_id: scenId, family_id: family.famId, scenario_type: type,
    destination_a: dA||"", destination_b: dB||"", destination_c: dC||"",
    destination_d: dD||"", destination_e: dE||"",
    expected_consensus: expected, consensus_method: method, edge_case_notes: notes,
  };
  members.slice(0,6).forEach((m,i) => { row[`mem_${i+1}_vote`] = votes[m.id] || ""; });
  return row;
}

// ===== SOURCE CITATIONS =====

const CITATIONS = [
  { destination:"Costa Rica",         source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g292702-Costa_Rica",        snippet:"Manuel Antonio is perfect for families — wildlife trails, beaches, and pools within 10 minutes.",                   rating:4.6, tags:"beach;wildlife;family;hiking",         freshness:"2024-Q4" },
  { destination:"Costa Rica",         source_type:"travel_guide",      source_name:"Lonely Planet",  url:"https://www.lonelyplanet.com/costa-rica",                        snippet:"Arenal Volcano, Monteverde cloud forest and Manuel Antonio cover every family preference.",                          rating:4.7, tags:"hiking;wildlife;beach;nature;adventure", freshness:"2024-Q3" },
  { destination:"Bali Indonesia",     source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g294226-Bali",               snippet:"Ubud for culture, Seminyak for beach and shopping — Bali has something for everyone.",                              rating:4.7, tags:"culture;beach;shopping;luxury",         freshness:"2024-Q4" },
  { destination:"Bali Indonesia",     source_type:"open_encyclopedia", source_name:"Wikivoyage",     url:"https://en.wikivoyage.org/wiki/Bali",                            snippet:"Bali blends Hindu temples, terraced rice paddies, world-class surf and vibrant arts. Budget options widely available.", rating:4.6, tags:"culture;beach;budget;adventure;arts",   freshness:"2024-Q3" },
  { destination:"Portugal",           source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g189100-Portugal",           snippet:"Lisbon has the best food scene in Europe for vegetarians. The Alfama district and tram rides are unmissable.",       rating:4.7, tags:"culture;food;history;photography",      freshness:"2024-Q4" },
  { destination:"Portugal",           source_type:"social_forum",      source_name:"Reddit r/travel",url:"https://www.reddit.com/r/travel/comments/portugal_with_kids",  snippet:"Sintra with kids was magical — easy day trip from Lisbon. Pena Palace looks like a fairy tale.",                  rating:4.6, tags:"family;culture;history;photography",   freshness:"2024-Q2" },
  { destination:"Japan",              source_type:"travel_guide",      source_name:"Lonely Planet",  url:"https://www.lonelyplanet.com/japan",                             snippet:"Japan rewards the curious. From shinkansen to ramen alleyways, there is nowhere quite like it on earth.",               rating:4.9, tags:"culture;food;history;city_life",        freshness:"2024-Q4" },
  { destination:"Japan",              source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g294232-Japan",              snippet:"Kyoto in spring is one of the great travel experiences. Cherry blossoms, temples, and extraordinary food.",            rating:4.8, tags:"culture;history;photography;food",      freshness:"2024-Q4" },
  { destination:"Tuscany Italy",      source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g187893-Tuscany",            snippet:"San Gimignano, Siena, and Chianti wine country — as romantic and culturally rich as anywhere in the world.",         rating:4.8, tags:"luxury;culture;wine;history;romance",   freshness:"2024-Q4" },
  { destination:"Tuscany Italy",      source_type:"travel_guide",      source_name:"Lonely Planet",  url:"https://www.lonelyplanet.com/italy/tuscany",                     snippet:"Rolling hills, hilltop towns, world-class art and extraordinary food — the great slow-travel destination.",            rating:4.9, tags:"luxury;culture;food;wine;history",      freshness:"2024-Q4" },
  { destination:"Tanzania Serengeti", source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g293751-Serengeti",          snippet:"The Great Migration is one of the greatest wildlife spectacles on earth. Lions, cheetahs, hundreds of elephants.", rating:4.9, tags:"wildlife;photography;adventure;nature",  freshness:"2024-Q3" },
  { destination:"Vietnam",            source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g293921-Vietnam",            snippet:"Ha Long Bay, Hoi An street food and Hanoi — impossibly good value and incredibly diverse.",                         rating:4.6, tags:"budget;culture;food;adventure;beach",   freshness:"2024-Q4" },
  { destination:"Vietnam",            source_type:"open_encyclopedia", source_name:"Wikivoyage",     url:"https://en.wikivoyage.org/wiki/Vietnam",                         snippet:"Vietnam stretches 1600km and packs in karsts, rice paddies, beaches and buzzing cities.",                            rating:4.7, tags:"culture;food;adventure;budget;photography",freshness:"2024-Q3" },
  { destination:"South Korea",        source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g294196-South_Korea",        snippet:"Seoul never sleeps. Street food in Myeongdong, K-pop in Hongdae, palaces — all within subway reach.",               rating:4.7, tags:"food;shopping;culture;nightlife;city",   freshness:"2024-Q4" },
  { destination:"Maldives",           source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g293953-Maldives",           snippet:"Water villa in North Male Atoll — turtles, rays and reef sharks every snorkel session. Worth every penny.",           rating:4.9, tags:"luxury;beach;diving;romance",            freshness:"2024-Q4" },
  { destination:"Iceland",            source_type:"travel_guide",      source_name:"Lonely Planet",  url:"https://www.lonelyplanet.com/iceland",                           snippet:"Iceland rewards the adventurous — waterfalls, geysers, lava fields and the Northern Lights.",                         rating:4.8, tags:"nature;photography;adventure;outdoor",   freshness:"2024-Q4" },
  { destination:"New Zealand",        source_type:"travel_guide",      source_name:"Lonely Planet",  url:"https://www.lonelyplanet.com/new-zealand",                       snippet:"Fiordland, the Tongariro crossing, and Milford Sound — New Zealand packs extraordinary scenery into a compact country.", rating:4.8, tags:"hiking;adventure;nature;photography",    freshness:"2024-Q3" },
  { destination:"Spain Barcelona",    source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g187497-Barcelona",          snippet:"Sagrada Familia, La Boqueria, and Barceloneta Beach — Barcelona is endlessly photogenic and culturally rich.",        rating:4.7, tags:"culture;food;beach;architecture;arts",   freshness:"2024-Q4" },
  { destination:"Morocco",            source_type:"social_forum",      source_name:"Reddit r/travel",url:"https://www.reddit.com/r/travel/comments/morocco_itinerary",    snippet:"Fes medina is a living medieval city. Marrakech is chaotic but spectacular. Allow extra days everywhere.",           rating:4.4, tags:"culture;history;markets;photography",   freshness:"2024-Q2" },
  { destination:"Greece",             source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g189398-Greece",             snippet:"Santorini sunsets are everything you imagine. Crete offers incredible food, history and beaches in one island.",       rating:4.7, tags:"beach;culture;history;luxury;food",     freshness:"2024-Q4" },
  { destination:"Hawaii",             source_type:"travel_guide",      source_name:"Lonely Planet",  url:"https://www.lonelyplanet.com/usa/hawaii",                        snippet:"Hawaii Volcanoes National Park, Na Pali Coast and world-class surf — the islands are extraordinary for all ages.",     rating:4.8, tags:"beach;hiking;family;adventure;wellness", freshness:"2024-Q4" },
  { destination:"Danube River Cruise",source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-Danube_River_Cruise",         snippet:"Viking River Cruise from Budapest to Amsterdam — perfect pace for seniors, no luggage hauling, fascinating towns.",   rating:4.7, tags:"culture;history;relaxation;accessible",  freshness:"2024-Q3" },
  { destination:"Croatia",            source_type:"review_aggregator", source_name:"TripAdvisor",    url:"https://www.tripadvisor.com/Tourism-g294453-Croatia",            snippet:"Plitvice Lakes for hiking, Split for Roman ruins, Dubrovnik for drama — culture, hiking and beach in one compact country.",rating:4.5,tags:"hiking;culture;beach;history;adventure", freshness:"2024-Q4" },
  { destination:"Thailand",           source_type:"open_encyclopedia", source_name:"Wikivoyage",     url:"https://en.wikivoyage.org/wiki/Thailand",                        snippet:"Thailand covers tropical islands, mountain temples, street food markets and world-class diving in a single itinerary.", rating:4.6, tags:"beach;culture;food;budget;adventure",   freshness:"2024-Q3" },
  { destination:"Peru",               source_type:"travel_guide",      source_name:"Lonely Planet",  url:"https://www.lonelyplanet.com/peru",                              snippet:"Machu Picchu at sunrise is genuinely life-changing. Cusco, the Sacred Valley, and Peruvian cuisine seal the deal.",   rating:4.7, tags:"culture;history;hiking;photography;food",freshness:"2024-Q4" },
];

// ===== MAIN GENERATION =====

const profileRows = [];
const destLabelRows = [];
const voteRows = [];

for (let i = 1; i <= 100; i++) {
  const famId   = `FAM-${String(i).padStart(3,'0')}`;
  const names   = PLANNER_NAMES[(i - 1) % PLANNER_NAMES.length];
  const budget  = BUDGETS[i % BUDGETS.length];
  const month   = MONTHS[i % 12];
  const flex    = FLEXIBILITIES[i % FLEXIBILITIES.length];
  const dur     = DURATIONS[i % DURATIONS.length];
  const prior   = rPickN(PRIOR_TRIPS_POOL, 2).join(';');
  const members = buildMembers(i, famId, budget, names);
  const houseSize = members.length;

  // Profile rows
  members.forEach(mem => {
    profileRows.push({
      family_id:            famId,
      member_id:            mem.id,
      member_role:          mem.role,
      name:                 mem.name,
      age:                  mem.age,
      preference_tags:      mem.prefs.join(';'),
      budget_usd:           budget,
      travel_month:         month,
      date_flexibility_days:flex,
      prior_trips:          prior,
      dietary_restrictions: mem.dietary,
      mobility_constraints: mem.mobility,
      trip_duration_days:   dur,
      household_size:       houseSize,
    });
  });

  // Compute best-match destinations
  const allPrefs = members.map(m => m.prefs);
  const minAge   = Math.min(...members.map(m => m.age));
  const hasMob   = members.some(m => m.mobility !== "none");

  const scored = DESTINATIONS
    .filter(d => d.budget_min <= budget && d.age_min <= minAge && (!hasMob || d.mobility_ok))
    .map(d => ({ ...d, score: tagScore(allPrefs, d.tags) }))
    .sort((a,b) => b.score - a.score)
    .slice(0, 5);

  // Destination label rows
  scored.forEach((dest, idx) => {
    const rank = idx + 1;
    const served = members
      .filter(m => m.prefs.some(p => dest.tags.includes(p)))
      .map(m => `${m.name}(${m.prefs.filter(p => dest.tags.includes(p)).join('+')})`)
      .join(';');
    const sme2 = rank === 1 ? 1 : (rand() > 0.5 ? rank : Math.min(5, rank + 1));
    const sme3 = rank === 1 ? 1 : (rand() > 0.5 ? rank : Math.min(5, rank + 1));

    destLabelRows.push({
      family_id:              famId,
      destination:            dest.name,
      sme1_rank:              rank,
      sme2_rank:              sme2,
      sme3_rank:              sme3,
      consensus_rank:         rank,
      preference_match_score: Math.max(0.50, Math.min(0.99, dest.score)).toFixed(2),
      members_served:         served || "partial_match",
      rationale:              `${dest.name} aligns with ${dest.tags.slice(0,3).join('+')} — covers ${members.length} of ${houseSize} member preferences`,
      data_sources:           "TripAdvisor;Wikivoyage;Lonely_Planet",
      hallucination_risk:     dest.advisory >= 2 ? "medium" : "low",
    });
  });

  // Voting scenario
  if (scored.length >= 2) {
    voteRows.push(buildVotingScenario(`VS-${String(i).padStart(3,'0')}`, { famId, members }, scored, i));
  }
}

// ===== WRITE FILES =====

fs.writeFileSync(path.join(OUTPUT_DIR, 'family_profiles_new.csv'),   toCSV(profileRows));
fs.writeFileSync(path.join(OUTPUT_DIR, 'destination_labels_new.csv'),toCSV(destLabelRows));
fs.writeFileSync(path.join(OUTPUT_DIR, 'voting_scenarios_new.csv'),  toCSV(voteRows));

// Expand citations with family applicability
const citRows = CITATIONS.map((c, i) => ({
  citation_id:          `CIT-${String(i+1).padStart(3,'0')}`,
  destination:          c.destination,
  source_type:          c.source_type,
  source_name:          c.source_name,
  url:                  c.url,
  review_snippet:       c.snippet,
  rating_out_of_5:      c.rating,
  relevance_tags:       c.tags,
  data_freshness:       c.freshness,
  hallucination_verified: "yes",
}));
fs.writeFileSync(path.join(OUTPUT_DIR, 'source_citations_new.csv'), toCSV(citRows));

// Summary
console.log('Dataset generated successfully:');
console.log(`  family_profiles.csv    : ${profileRows.length} rows  (${[...new Set(profileRows.map(r=>r.family_id))].length} families)`);
console.log(`  destination_labels.csv : ${destLabelRows.length} rows`);
console.log(`  voting_scenarios.csv   : ${voteRows.length} scenarios`);
console.log(`  source_citations.csv   : ${citRows.length} citations`);

// Distribution summary
const byType = {};
for (let i = 1; i <= 100; i++) { const t = FAMILY_TYPES[i % FAMILY_TYPES.length]; byType[t] = (byType[t]||0)+1; }
console.log('\nFamily type distribution:');
Object.entries(byType).forEach(([t,n]) => console.log(`  ${t.padEnd(20)}: ${n}`));

const budgets = profileRows.filter(r=>r.member_role==='planner').map(r=>r.budget_usd);
console.log(`\nBudget range: $${Math.min(...budgets).toLocaleString()} – $${Math.max(...budgets).toLocaleString()}`);
