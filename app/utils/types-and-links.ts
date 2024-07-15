export const schoolLinks = [
    { href: "/schools/overview", label: "Overview" },
    { href: "/schools/curriculum", label: "School Curriculum" },
    { href: "/schools/training", label: "Training" },
    { href: "/schools/pricing-plan", label: "Pricing Plan" },
  ];

  export const studentLinks = [
    { href: "/students/overview", label: "Overview" },
    { href: "/students/curriculum", label: "Curriculum" },
    { href: "/students/pricing", label: "Pricing Plan" },
  ];

  export type CurriculumLevel = "Beginner" | "Intermediate" | "Advanced";

  export type Course = {
    module: string;
    subject: string;
    level: string;
  }
  
  export type Curriculum = {
    Beginner: Course[];
    Intermediate: Course[];
    Advanced: Course[];
  }
  
  export type PathCurriculumType = {
    module: string;
    curriculum: Curriculum;
  }
  

  export const pathsCurriculum = [
    {
      module: "Gaming",
      curriculum: {
        Beginner: [
          { module: "Gaming", subject: "Web Design", level: "Level 1" },
          { module: "Gaming", subject: "Game Design", level: "Level 2" },
          { module: "Gaming", subject: "Game Development", level: "Level 1" },
          { module: "Gaming", subject: "Game Development", level: "Level 2" },
          { module: "Gaming", subject: "Character Development", level: "Level 1" },
          { module: "Gaming", subject: "Character Development", level: "Level 2" },
          { module: "Gaming", subject: "Character Development", level: "Level 2" },
          { module: "Gaming", subject: "Character Development", level: "Level 2" },
          { module: "Gaming", subject: "Character Development", level: "Level 2" },
        ],
        Intermediate: [
          { module: "Gaming", subject: "Game Design", level: "Level 15" },
          { module: "Gaming", subject: "Game Design", level: "Level 23" },
          { module: "Gaming", subject: "Game Development", level: "Level 15" },
          { module: "Gaming", subject: "Game Development", level: "Level 23" },
          { module: "Gaming", subject: "Character Development", level: "Level 15" },
          { module: "Gaming", subject: "Character Development", level: "Level 23" },
        ],
        Advanced: [
          { module: "Gaming", subject: "Game Design", level: "Level 45" },
          { module: "Gaming", subject: "Game Design", level: "Level 50" },
          { module: "Gaming", subject: "Game Development", level: "Level 45" },
          { module: "Gaming", subject: "Game Development", level: "Level 50" },
          { module: "Gaming", subject: "Character Development", level: "Level 45" },
          { module: "Gaming", subject: "Character Development", level: "Level 50" },
        ],
      },
    },
    {
      module: "Coding",
      curriculum: {
        Beginner: [
          { module:"Coding", subject: "Web Design", level: "Level 1" },
          { module:"Coding", subject: "Web Design", level: "Level 2" },
          { module:"Coding", subject: "Web Development", level: "Level 1" },
          { module:"Coding", subject: "Web Development", level: "Level 2" },
          { module:"Coding", subject: "Frontend Development", level: "Level 1" },
          { module:"Coding", subject: "Frontend Development", level: "Level 2" },
        ],
        Intermediate: [
          { module:"Coding", subject: "Web Design", level: "Level 15" },
          { module:"Coding", subject: "Web Design", level: "Level 23" },
          { module:"Coding", subject: "Web Development", level: "Level 15" },
          { module:"Coding", subject: "Web Development", level: "Level 23" },
          { module:"Coding", subject: "Frontend Development", level: "Level 15" },
          { module:"Coding", subject: "Frontend Development", level: "Level 23" },
        ],
        Advanced: [
          { module:"Coding", subject: "Web Design", level: "Level 45" },
          { module:"Coding", subject: "Web Design", level: "Level 50" },
          { module:"Coding", subject: "Web Development", level: "Level 45" },
          { module:"Coding", subject: "Web Development", level: "Level 50" },
          { module:"Coding", subject: "Frontend Development", level: "Level 45" },
          { module:"Coding", subject: "Frontend Development", level: "Level 50" },
        ],
      },
    },
    {
      module: "Robotics & IOT",
      curriculum: {
        Beginner: [
          { module: "Robotics & IOT",subject: "Robotics Basics", level: "Level 1" },
          { module: "Robotics & IOT",subject: "IOT Basics", level: "Level 1" },
          { module: "Robotics & IOT",subject: "Robotics Fundamentals", level: "Level 2" },
          { module: "Robotics & IOT",subject: "IOT Fundamentals", level: "Level 2" },
          { module: "Robotics & IOT",subject: "Robotics Projects", level: "Level 3" },
          { module: "Robotics & IOT",subject: "IOT Projects", level: "Level 3" },
        ],
        Intermediate: [
          { module: "Robotics & IOT",subject: "Robotics Intermediate", level: "Level 15" },
          { module: "Robotics & IOT",subject: "IOT Intermediate", level: "Level 15" },
          { module: "Robotics & IOT",subject: "Robotics Advanced Projects", level: "Level 23" },
          { module: "Robotics & IOT",subject: "IOT Advanced Projects", level: "Level 23" },
          { module: "Robotics & IOT",subject: "Robotics Systems", level: "Level 25" },
          { module: "Robotics & IOT",subject: "IOT Systems", level: "Level 25" },
        ],
        Advanced: [
          { module: "Robotics & IOT",subject: "Advanced Robotics", level: "Level 45" },
          { module: "Robotics & IOT",subject: "Advanced IOT", level: "Level 45" },
          { module: "Robotics & IOT",subject: "Robotics Innovations", level: "Level 50" },
          { module: "Robotics & IOT",subject: "IOT Innovations", level: "Level 50" },
          { module: "Robotics & IOT",subject: "Robotics Expert", level: "Level 55" },
          { module: "Robotics & IOT",subject: "IOT Expert", level: "Level 55" },
        ],
      },
    },
    {
      module: "AI",
      curriculum: {
        Beginner: [
          { module:"AI", subject: "AI Basics", level: "Level 1" },
          { module:"AI", subject: "Machine Learning Basics", level: "Level 1" },
          { module:"AI", subject: "Data Science Basics", level: "Level 2" },
          { module:"AI", subject: "AI Projects", level: "Level 2" },
          { module:"AI", subject: "ML Projects", level: "Level 3" },
          { module:"AI", subject: "Data Science Projects", level: "Level 3" },
        ],
        Intermediate: [
          { module:"AI", subject: "AI Intermediate", level: "Level 15" },
          { module:"AI", subject: "Machine Learning Intermediate", level: "Level 15" },
          { module:"AI", subject: "Data Science Intermediate", level: "Level 23" },
          { module:"AI", subject: "AI Advanced Projects", level: "Level 23" },
          { module:"AI", subject: "ML Advanced Projects", level: "Level 25" },
          { module:"AI", subject: "Data Science Advanced Projects", level: "Level 25" },
        ],
        Advanced: [
          { module:"AI", subject: "Advanced AI", level: "Level 45" },
          { module:"AI", subject: "Advanced Machine Learning", level: "Level 45" },
          { module:"AI", subject: "Advanced Data Science", level: "Level 50" },
          { module:"AI", subject: "AI Innovations", level: "Level 50" },
          { module:"AI", subject: "ML Innovations", level: "Level 55" },
          { module:"AI", subject: "Data Science Innovations", level: "Level 55" },
        ],
      },
    },
    {
      module: "Multimedia",
      curriculum: {
        Beginner: [
          { module:"Multimedia", subject: "Graphic Design Basics", level: "Level 1" },
          { module:"Multimedia", subject: "Video Editing Basics", level: "Level 1" },
          { module:"Multimedia", subject: "Animation Basics", level: "Level 2" },
          { module:"Multimedia", subject: "Graphic Design Projects", level: "Level 2" },
          { module:"Multimedia", subject: "Video Editing Projects", level: "Level 3" },
          { module:"Multimedia", subject: "Animation Projects", level: "Level 3" },
        ],
        Intermediate: [
          { module:"Multimedia", subject: "Graphic Design Intermediate", level: "Level 15" },
          { module:"Multimedia", subject: "Video Editing Intermediate", level: "Level 15" },
          { module:"Multimedia", subject: "Animation Intermediate", level: "Level 23" },
          { module:"Multimedia", subject: "Graphic Design Advanced Projects", level: "Level 23" },
          { module:"Multimedia", subject: "Video Editing Advanced Projects", level: "Level 25" },
          { module:"Multimedia", subject: "Animation Advanced Projects", level: "Level 25" },
        ],
        Advanced: [
          { module:"Multimedia", subject: "Advanced Graphic Design", level: "Level 45" },
          { module:"Multimedia", subject: "Advanced Video Editing", level: "Level 45" },
          { module:"Multimedia", subject: "Advanced Animation", level: "Level 50" },
          { module:"Multimedia", subject: "Graphic Design Innovations", level: "Level 50" },
          { module:"Multimedia", subject: "Video Editing Innovations", level: "Level 55" },
          { module:"Multimedia", subject: "Animation Innovations", level: "Level 55" },
        ],
      },
    },
    {
      module: "Techpreneurship",
      curriculum: {
        Beginner: [
          { module:"Techpreneurship", subject: "Entrepreneurship Basics", level: "Level 1" },
          { module:"Techpreneurship", subject: "Business Planning Basics", level: "Level 1" },
          { module:"Techpreneurship", subject: "Marketing Basics", level: "Level 2" },
          { module:"Techpreneurship", subject: "Entrepreneurship Projects", level: "Level 2" },
          { module:"Techpreneurship", subject: "Business Planning Projects", level: "Level 3" },
          { module:"Techpreneurship", subject: "Marketing Projects", level: "Level 3" },
        ],
        Intermediate: [
          { module:"Techpreneurship", subject: "Entrepreneurship Intermediate", level: "Level 15" },
          { module:"Techpreneurship", subject: "Business Planning Intermediate", level: "Level 15" },
          { module:"Techpreneurship", subject: "Marketing Intermediate", level: "Level 23" },
          { module:"Techpreneurship", subject: "Entrepreneurship Advanced Projects", level: "Level 23" },
          { module:"Techpreneurship", subject: "Business Planning Advanced Projects", level: "Level 25" },
          { module:"Techpreneurship", subject: "Marketing Advanced Projects", level: "Level 25" },
        ],
        Advanced: [
          { module:"Techpreneurship", subject: "Advanced Entrepreneurship", level: "Level 45" },
          { module:"Techpreneurship", subject: "Advanced Business Planning", level: "Level 45" },
          { module:"Techpreneurship", subject: "Advanced Marketing", level: "Level 50" },
          { module:"Techpreneurship", subject: "Entrepreneurship Innovations", level: "Level 50" },
          { module:"Techpreneurship", subject: "Business Planning Innovations", level: "Level 55" },
          { module:"Techpreneurship", subject: "Marketing Innovations", level: "Level 55"
  
   },
        ],
      },
    },
  ];