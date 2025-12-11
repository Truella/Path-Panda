const TOUR_CREATION_STEPS = [
  {
    step: 1,
    title: 'Create Tour',
    description: "Click the 'Create Tour' button to start creating a new tour",
    id: 'create-tour-button',
    imageUrl: '/images/tourDocs/step_one.jpg',
  },
  {
    step: 2,
    title: 'Tour Details',
    description:
      'Enter your tour name and description to identify and explain the purpose of your tour',
    id: 'tour-details-form',
    imageUrl: '/images/tourDocs/tour_detail.jpg',
  },
  {
    step: 3,
    title: 'Create Tour Steps',
    description:
      "Click 'Add Step' to begin adding individual steps to your tour",
    id: 'add-step-button',
    imageUrl: '/images/tourDocs/add_step_btn.jpg',
  },
  {
    step: 4,
    title: 'Add Step Details',
    description:
      'Fill in the title, content, position, and CSS selector for each tour step',
    id: 'step-details-modal',
    imageUrl: '/images/tourDocs/add_step_detail.jpg',
  },
  {
    step: 5,
    title: 'Review Steps',
    description:
      'Review all your created steps. You need at least 5 steps to activate the tour',
    id: 'tour-steps-list',
    imageUrl: '/images/tourDocs/tour_step_complete.jpg',
  },
  {
    step: 6,
    title: 'View Your Tours',
    description:
      'Access the Tours tab to see all your created tours and manage them',
    id: 'tours-tab',
    imageUrl: '/images/tourDocs/tour_on_dashboard.jpg',
  },
  {
    step: 7,
    title: 'Embed Tour',
    description:
      "Click 'Embed' to view the tour code snippet",
    id: 'embed-button',
    imageUrl: '/images/tourDocs/embed_btn.jpg',
  },
  {
    step: 8,
    title: 'Copy Embed Code',
    description:
      "Click 'Copy' to copy the code snippet and integrate your tour into your website",
    id: 'embed-code',
    imageUrl: '/images/tourDocs/copy_embed.jpg',
  },
];

export default TOUR_CREATION_STEPS;
