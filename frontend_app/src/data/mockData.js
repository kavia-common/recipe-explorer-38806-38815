const mockRecipes = [
  {
    id: '1',
    title: 'Lemon Herb Roasted Chicken',
    description: 'Succulent roasted chicken with zesty lemon and fresh herbs.',
    tags: ['Dinner', 'Gluten-Free'],
    image: 'assets/recipe1.jpg',
    ingredients: [
      '1 whole chicken (about 1.5kg)',
      '2 lemons',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '1 tsp salt',
      '1/2 tsp black pepper',
      'Fresh rosemary and thyme',
    ],
    steps: [
      'Preheat oven to 200°C (400°F).',
      'Pat chicken dry and rub with olive oil, salt, pepper, and minced garlic.',
      'Stuff with lemon halves and fresh herbs.',
      'Roast for 60–75 minutes until juices run clear.',
      'Rest 10 minutes before carving and serving.',
    ],
  },
  {
    id: '2',
    title: 'Creamy Mushroom Pasta',
    description: 'A silky, savory pasta loaded with mushrooms and parmesan.',
    tags: ['Dinner', 'Vegetarian'],
    image: 'assets/recipe2.jpg',
    ingredients: [
      '300g pasta',
      '250g mushrooms, sliced',
      '2 cloves garlic, minced',
      '1 cup heavy cream',
      '1/2 cup grated parmesan',
      '2 tbsp butter',
      'Salt and pepper to taste',
    ],
    steps: [
      'Cook pasta per package directions.',
      'Sauté mushrooms with butter and garlic until browned.',
      'Add cream, simmer gently, then stir in parmesan.',
      'Toss pasta with sauce, season, and serve.',
    ],
  },
  {
    id: '3',
    title: 'Citrus Avocado Salad',
    description: 'Refreshing salad with bright citrus, creamy avocado, and crunch.',
    tags: ['Lunch', 'Vegan'],
    image: 'assets/recipe3.jpg',
    ingredients: [
      '2 oranges, segmented',
      '1 avocado, sliced',
      '1/2 red onion, thinly sliced',
      'Mixed greens',
      'Olive oil and balsamic vinegar',
      'Salt and pepper',
    ],
    steps: [
      'Combine greens, onion, citrus segments, and avocado.',
      'Dress with olive oil and balsamic.',
      'Season to taste and toss gently.',
    ],
  },
]

export default mockRecipes
