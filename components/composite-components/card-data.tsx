export const cardData = [
    {
      title: "Card 1",
      description: "This is the first card.",
      content: "Main content of card 1.",
      footer: "Footer of card 1.",
      status: "incomplete",
      priority: "high",
    },
    {
      title: "Card 2",
      description: "This is the second card.",
      content: "Main content of card 2.",
      footer: "Footer of card 2.",
      status: "complete",
      priority: "med",
    },
    {
      title: "Card 3",
      description: "This is the third card.",
      content: "Main content of card 3. This card can contain detailed information, links, or anything you wish to display.",
      footer: "Footer of card 3.",
      status: "incomplete",
      priority: "low",
    },
    {
      title: "Card 4",
      description: "This is the fourth card.",
      content: "Main content of card 4. More detailed content or links can be placed here.",
      footer: "Footer of card 4.",
      status: "complete",
      priority: "high",
    },
    {
      title: "Card 5",
      description: "This is the fifth card.",
      content: "Main content of card 5. You can also add additional buttons or links if needed.",
      footer: "Footer of card 5.",
      status: "complete",
      priority: "med",
    },
    {
      title: "Card 6",
      description: "This is the sixth card.",
      content: "Main content of card 6. Make it informative and engaging for your users.",
      footer: "Footer of card 6.",
      status: "complete",
      priority: "low",
    },
  ];

  
  export type CardData = { 
    title: string; 
    description: string; 
    content: string; 
    footer: string; 
    status: string; 
    priority: string; 
  }[];