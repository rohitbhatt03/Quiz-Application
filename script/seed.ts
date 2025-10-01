import db from "../lib/db";


const insert = db.prepare(
  "INSERT INTO questions (category, text, options, correct_index) VALUES (?, ?, ?, ?)"
);

// Function to insert safely (avoids duplicates)
function addQuestion(category: string, text: string, options: string[], correctIndex: number) {
  const exists = db.prepare(
    "SELECT 1 FROM questions WHERE category = ? AND text = ?"
  ).get(category, text);

  if (!exists) {
    insert.run(category, text, JSON.stringify(options), correctIndex);
  }
}


const seed = db.transaction(() => {
  // Science
  addQuestion("science", "What planet is known as the Red Planet?", ["Mars", "Venus", "Jupiter", "Mercury"], 0);
  addQuestion("science", "Which gas do plants absorb during photosynthesis?", ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], 2);
  addQuestion("science", "What is the chemical symbol for gold?", ["Au", "Ag", "Fe", "Pb"], 0);
  addQuestion("science", "Which organ purifies blood in humans?", ["Liver", "Kidney", "Heart", "Lungs"], 1);
  addQuestion("science", "Which metal is liquid at room temperature?", ["Mercury", "Sodium", "Lead", "Aluminum"], 0);
  addQuestion("science", "What is the boiling point of water?", ["50°C", "100°C", "200°C", "150°C"], 1);
  addQuestion("science", "Which gas do humans exhale?", ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], 1);
  addQuestion("science", "Which is the largest organ of the human body?", ["Heart", "Skin", "Liver", "Brain"], 1);
  addQuestion("science", "What is the chemical symbol of water?", ["H2", "H2O", "O2", "CO2"], 1);
  addQuestion("science", "What part of the eye controls the amount of light entering?", ["Pupil", "Retina", "Cornea", "Lens"], 0);

  // Technology
  addQuestion("technology", "What does 'USB' stand for?", ["Universal Serial Bus", "Universal System Board", "Unique Serial Bridge", "Unified Standard Base"], 0);
  addQuestion("technology", "Who founded Microsoft?", ["Bill Gates", "Steve Jobs", "Larry Page", "Mark Zuckerberg"], 0);
  addQuestion("technology", "What year was the first iPhone released?", ["2005", "2007", "2010", "2012"], 1);
  addQuestion("technology", "Which company created Windows OS?", ["IBM", "Microsoft", "Apple", "Google"], 1);
  addQuestion("technology", "What does HTML stand for?", ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Modern Language", "HyperTool Markup Language"], 0);
  addQuestion("technology", "Which company owns YouTube?", ["Meta", "Google", "Amazon", "Microsoft"], 1);
  addQuestion("technology", "What is the shortcut for 'Copy' on Windows?", ["Ctrl + V", "Ctrl + C", "Ctrl + X", "Ctrl + P"], 1);
  addQuestion("technology", "Which programming language runs in the browser?", ["Python", "JavaScript", "C++", "Java"], 1);
  addQuestion("technology", "What is the parent company of Instagram?", ["Twitter", "Meta", "Google", "Snapchat"], 1);
  addQuestion("technology", "What technology powers Bitcoin?", ["Blockchain", "Cloud", "AI", "Big Data"], 0);

  //Mathematics
  addQuestion("mathematics", "What is 12 × 12?", ["124", "122", "144", "132"], 2);
  addQuestion("mathematics", "What is 100 ÷ 4?", ["20", "25", "30", "40"], 1);
  addQuestion("mathematics", "What is the value of π (approx)?", ["2.14", "3.14", "4.14", "3.41"], 1);
  addQuestion("mathematics", "What is 7 squared?", ["42", "49", "56", "64"], 1);
  addQuestion("mathematics", "What is the next prime after 7?", ["9", "10", "11", "13"], 2);
  addQuestion("mathematics", "What is the sum of angles in a triangle?", ["90°", "120°", "180°", "360°"], 2);
  addQuestion("mathematics", "What is the square root of 81?", ["7", "8", "9", "10"], 2);
  addQuestion("mathematics", "How many sides does a hexagon have?", ["5", "6", "7", "8"], 1);
  addQuestion("mathematics", "What is 25% of 80?", ["15", "18", "20", "22"], 2);
  addQuestion("mathematics", "What is 2³?", ["4", "6", "8", "10"], 2);

  //Computer Science
  addQuestion("computer_science", "What does 'URL' stand for?", ["Uniform Resource Locator", "Universal Resource Link", "Unified Routing Language", "Unique Reference Locator"], 0);
  addQuestion("computer_science", "What is the binary of 5?", ["101", "111", "110", "100"], 0);
  addQuestion("computer_science", "What is 1 byte equal to?", ["4 bits", "8 bits", "12 bits", "16 bits"], 1);
  addQuestion("computer_science", "What does RAM stand for?", ["Read And Manage", "Random Access Memory", "Run All Memory", "Remote Access Module"], 1);
  addQuestion("computer_science", "Which company created Java?", ["Microsoft", "Oracle", "Sun Microsystems", "IBM"], 2);
  addQuestion("computer_science", "What is the brain of the computer?", ["Motherboard", "CPU", "RAM", "Hard Disk"], 1);
  addQuestion("computer_science", "What is the extension of a JavaScript file?", [".py", ".java", ".js", ".jsx"], 2);
  addQuestion("computer_science", "Which of these is a database?", ["MySQL", "Python", "C++", "HTML"], 0);
  addQuestion("computer_science", "What is the default port of HTTP?", ["20", "21", "80", "443"], 2);
  addQuestion("computer_science", "Which logic gate outputs true only if both inputs are true?", ["OR", "XOR", "AND", "NAND"], 2);

  //Geography
  addQuestion("geography", "Which is the largest ocean?", ["Atlantic", "Pacific", "Indian", "Arctic"], 1);
  addQuestion("geography", "What is the capital of France?", ["London", "Berlin", "Paris", "Madrid"], 2);
  addQuestion("geography", "Which country is known as the Land of Rising Sun?", ["India", "Japan", "China", "Thailand"], 1);
  addQuestion("geography", "Which desert is the largest in the world?", ["Gobi", "Kalahari", "Sahara", "Thar"], 2);
  addQuestion("geography", "Which continent is called the Dark Continent?", ["Africa", "Asia", "South America", "Australia"], 0);
  addQuestion("geography", "What is the longest river in India?", ["Ganga", "Yamuna", "Godavari", "Brahmaputra"], 0);
  addQuestion("geography", "What is the capital of Australia?", ["Sydney", "Melbourne", "Canberra", "Perth"], 2);
  addQuestion("geography", "Which is the smallest continent?", ["Europe", "Australia", "Antarctica", "South America"], 1);
  addQuestion("geography", "Which ocean is the coldest?", ["Pacific", "Indian", "Arctic", "Atlantic"], 2);
  addQuestion("geography", "Which country is both in Europe and Asia?", ["Turkey", "India", "Russia", "Egypt"], 2);

  // Physics
  addQuestion("physics", "Who developed the theory of relativity?", ["Newton", "Einstein", "Bohr", "Galileo"], 1);
  addQuestion("physics", "What is measured in Ohms?", ["Current", "Resistance", "Voltage", "Power"], 1);
  addQuestion("physics", "What is the SI unit of work?", ["Newton", "Joule", "Watt", "Pascal"], 1);
  addQuestion("physics", "Who invented the telescope?", ["Galileo", "Newton", "Einstein", "Faraday"], 0);
  addQuestion("physics", "What is the acceleration due to gravity on Earth?", ["9.8 m/s²", "10 m/s²", "8.5 m/s²", "9 m/s²"], 0);
  addQuestion("physics", "What type of energy is stored in a stretched spring?", ["Kinetic", "Potential", "Thermal", "Nuclear"], 1);
  addQuestion("physics", "What does a voltmeter measure?", ["Current", "Resistance", "Voltage", "Power"], 2);
  addQuestion("physics", "What is the SI unit of electric current?", ["Ampere", "Volt", "Ohm", "Watt"], 0);
  addQuestion("physics", "Who discovered X-rays?", ["Curie", "Röntgen", "Einstein", "Faraday"], 1);
  addQuestion("physics", "What particle carries a negative charge?", ["Electron", "Proton", "Neutron", "Photon"], 0);

  // History 
  addQuestion("history", "Who discovered America?", ["Columbus", "Magellan", "Cook", "Vasco da Gama"], 0);
  addQuestion("history", "Who was the first President of the USA?", ["Lincoln", "Washington", "Jefferson", "Adams"], 1);
  addQuestion("history", "Who was the last Mughal emperor?", ["Aurangzeb", "Bahadur Shah II", "Akbar", "Shah Jahan"], 1);
  addQuestion("history", "In which year did World War II end?", ["1942", "1945", "1947", "1950"], 1);
  addQuestion("history", "Who wrote the Indian National Anthem?", ["Rabindranath Tagore", "Bankim Chandra", "Subhas Bose", "Mahatma Gandhi"], 0);
  addQuestion("history", "Who was the first emperor of China?", ["Mao Zedong", "Qin Shi Huang", "Sun Yat-sen", "Confucius"], 1);
  addQuestion("history", "Who built the Taj Mahal?", ["Shah Jahan", "Akbar", "Aurangzeb", "Humayun"], 0);
  addQuestion("history", "Who was assassinated in 1948 in India?", ["Gandhi", "Nehru", "Patel", "Bose"], 0);
  addQuestion("history", "Which empire built Machu Picchu?", ["Maya", "Aztec", "Inca", "Roman"], 2);
  addQuestion("history", "Who was known as Iron Man of India?", ["Patel", "Nehru", "Gandhi", "Bose"], 0);
});

// Run transaction
seed();

console.log("✅ 10 new questions added per category");
