tutorial = {
  welcome:{
    text:"Welcome, {playerName}, to the first day of the rest of your life! " +
           "Today, you take your first step in the grand road down the graduate " +
           "program at Generic State U, home of the nation's best graduate program " +
           "in... err, what field were you studying again?",
    options:{
      A:{text:"Liberal Arts",next:"tutorial.programA"},
      B:{text:"Engineering",next:"tutorial.programB"},
      C:{text:"Undecided",next:"tutorial.programC"},
      D:{text:"Huge-Manatees",next:"tutorial.programD"},
    }
  },

  programA:{
    text:"Liberal arts! We didn't put a hard mode into this game, " +
           "but I guess that's not going to stop you, is it?",
    jump:"tutorial.breakfast"},
  programB:{
    text:"Engineering! I suppose since you decided to attend graduate " +
           "school, you're not aiming to have much of a life anyway, right? " +
           "So might as well get paid for it.",
    jump:"tutorial.breakfast"},
  programC:{
    text:"Seriously? For graduate school?",
    jump:"tutorial.breakfast"},
  programD:{
    text:"I'm going to assume you mean humanities, or possibly marine biology. " + 
           "In either case, poor life choices, my friend.",
    jump:"tutorial.breakfast"},

  breakfast:{
    text:"The most important meal of the day: Breakfast. The decisions you make, " +
         "especially on an important day like today, will tell the world what type " +
         "of a student you'll be. Choose wisely.",
    options:{
      A:{text:"Bacon Pancakes",next:"tutorial.breakfastA"},
      B:{text:"Admiral Crunch",next:"tutorial.breakfastB"},
      C:{text:"Bear Claws",next:"tutorial.breakfastC"},
      D:{text:"Glass of Eggs",next:"tutorial.breakfastD"},
    },
  },

  breakfastA:{
    text:"A catchy song, and a solid breakfast. As you chew on " +
         "your tasty food, you can feel the creative juices flowing " +
         "in your mind, and the high cholesterol flowing through " +
         "your heart.",
    changeStat:{
      setHealth:80,
      setMoney:100,
      },
    jump:"tutorial.toSchool",},
  breakfastB:{
    text:"'About time,' you think to yourself. The Captain of your " +
         "childhood has finally been promoted after years of excellent " +
         "service and dedication. As you avoid ripping the upper part of " +
         "your mouth into shreads, you can feel your life falling into place " +
         "with military discipline.",
    changeStat:{
      setHealth:100,
      setMoney:100,
      },
    jump:"tutorial.toSchool",},
  breakfastC:{
    text:"Ah, the personal favorite. Did you know that the bear claw is a Danish " +
         "pastry which originated in the United States? As you ponder on this supposed " +
         "paradox, you can feel your brain kicking into gear, ready for the rest of the day.",
    changeStat:{
      setHealth:100,
      setMoney:100,
      },
    jump:"tutorial.toSchool",},
  breakfastD:{
    text:"A hearty breakfast, though not one which would be recommended by the " +
         "Surgeon General. After years of medical advances, salmonella is now a " +
         "thing of the past... but it also brought about the new strand of super " +
         "avian flu. Scientists are calling it a wash. As you suppress your gag " +
         "reflex to get the last yolk down, you feel your body getting ready to " +
         "face the challenges ahead.",
    changeStat:{
      setHealth:120,
      setMoney:100,
      },
    jump:"tutorial.toSchool",},

  toSchool:{
    text:"Showered, dressed, and breakfasted up. You pocket checked for your wallet " +
         "and phone, then you're off to campus! Though you've been on campus before " +
         "to visit when applying to the graduate program, it isn't your undergraduate " +
         "alma mater, so everything around is still foreign to you. " +
         "You arrive on campus a bit earlier than expected, so you have some time before " +
         "you need to report for work. What would you like to do?",
    options:{
      A:{text:"Stop by the Lab",next:"ending.unfinished"},
      B:{text:"Go to the Commons",next:"ending.unfinished"},
      C:{text:"Sit in a Class",next:"ending.unfinished"},
      D:{text:"Get a Cup of Coffee",next:"ending.unfinished"},
    },
  },
};

ending = {
  unfinished:{
    text:"Thanks for trying out the game so far. If you're seeing this message, then " +
         "that means the game is still unfinished! You'll be taken back to the beginning " +
         "again, so feel free to try out new options!",
    jump:"tutorial.welcome",
  },
};

stages = {
  "tutorial": this.tutorial,
  "ending": this.ending,
};
