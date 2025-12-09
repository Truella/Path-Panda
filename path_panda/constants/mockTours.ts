export interface TourStep {
  id: string
  title: string
  description: string
  selector: string
  stepNumber: number
}

export interface Tour {
  id: string
  title: string
  description: string
  steps: TourStep[]
  views: number
  completionRate: number
  lastUpdated: string
  color: string
}

export const mockTours = [
    {
      id: '1',
      title: 'Product Onboarding',
      description: 'Complete guide for new users',
      steps: [
        {
          id: '1',
          title: 'Welcome',
          description: 'Introduction to the product',
          type: 'tooltip' as const,
          selector: '#welcome-btn',
          stepNumber: 1,
        },
        {
          id: '2',
          title: 'Features',
          description: 'Explore key features',
          type: 'modal' as const,
          selector: '#features-section',
          stepNumber: 2,
        },
        {
          id: '3',
          title: 'Settings',
          description: 'Configure your preferences',
          type: 'tooltip' as const,
          selector: '#settings-icon',
          stepNumber: 3,
        },
        {
          id: '4',
          title: 'Support',
          description: 'Get help when needed',
          type: 'tooltip' as const,
          selector: '#support-link',
          stepNumber: 4,
        },
        {
          id: '5',
          title: 'Profile',
          description: 'Set up your profile',
          type: 'modal' as const,
          selector: '#profile-menu',
          stepNumber: 5,
        },
        {
          id: '6',
          title: 'Dashboard',
          description: 'Navigate the dashboard',
          type: 'tooltip' as const,
          selector: '#dashboard-nav',
          stepNumber: 6,
        },
        {
          id: '7',
          title: 'Integrations',
          description: 'Connect your tools',
          type: 'modal' as const,
          selector: '#integrations-tab',
          stepNumber: 7,
        },
        {
          id: '8',
          title: 'Complete',
          description: "You're all set!",
          type: 'modal' as const,
          selector: '#complete-section',
          stepNumber: 8,
        },
      ],
      views: 342,
      completionRate: 78,
      lastUpdated: '2 hours ago',
      color: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: '2',
      title: 'Dashboard Walkthrough',
      description: 'Learn all dashboard features',
      steps: [
        {
          id: '1',
          title: 'Overview',
          description: 'Dashboard overview',
          type: 'tooltip' as const,
          selector: '#overview-card',
          stepNumber: 1,
        },
        {
          id: '2',
          title: 'Stats',
          description: 'Understanding stats',
          type: 'modal' as const,
          selector: '#stats-grid',
          stepNumber: 2,
        },
        {
          id: '3',
          title: 'Tours',
          description: 'Managing tours',
          type: 'tooltip' as const,
          selector: '#tours-section',
          stepNumber: 3,
        },
        {
          id: '4',
          title: 'Activity',
          description: 'Team activity feed',
          type: 'tooltip' as const,
          selector: '#activity-feed',
          stepNumber: 4,
        },
        {
          id: '5',
          title: 'Settings',
          description: 'Dashboard settings',
          type: 'modal' as const,
          selector: '#dashboard-settings',
          stepNumber: 5,
        },
        {
          id: '6',
          title: 'Export',
          description: 'Exporting data',
          type: 'tooltip' as const,
          selector: '#export-btn',
          stepNumber: 6,
        },
        {
          id: '7',
          title: 'Filters',
          description: 'Using filters',
          type: 'modal' as const,
          selector: '#filter-panel',
          stepNumber: 7,
        },
        {
          id: '8',
          title: 'Search',
          description: 'Search functionality',
          type: 'tooltip' as const,
          selector: '#search-bar',
          stepNumber: 8,
        },
        {
          id: '9',
          title: 'Notifications',
          description: 'Manage notifications',
          type: 'modal' as const,
          selector: '#notifications-icon',
          stepNumber: 9,
        },
        {
          id: '10',
          title: 'Sharing',
          description: 'Share with team',
          type: 'tooltip' as const,
          selector: '#share-btn',
          stepNumber: 10,
        },
        {
          id: '11',
          title: 'Analytics',
          description: 'View analytics',
          type: 'modal' as const,
          selector: '#analytics-tab',
          stepNumber: 11,
        },
        {
          id: '12',
          title: 'Done',
          description: 'Tour complete',
          type: 'modal' as const,
          selector: '#completion-modal',
          stepNumber: 12,
        },
      ],
      views: 156,
      completionRate: 65,
      lastUpdated: '1 day ago',
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: '3',
      title: 'Advanced Settings',
      description: 'Configure advanced features',
      steps: [
        {
          id: '1',
          title: 'API Keys',
          description: 'Manage API keys',
          type: 'tooltip' as const,
          selector: '#api-keys-section',
          stepNumber: 1,
        },
        {
          id: '2',
          title: 'Webhooks',
          description: 'Configure webhooks',
          type: 'modal' as const,
          selector: '#webhooks-panel',
          stepNumber: 2,
        },
        {
          id: '3',
          title: 'Permissions',
          description: 'Set permissions',
          type: 'tooltip' as const,
          selector: '#permissions-tab',
          stepNumber: 3,
        },
        {
          id: '4',
          title: 'Security',
          description: 'Security settings',
          type: 'modal' as const,
          selector: '#security-settings',
          stepNumber: 4,
        },
        {
          id: '5',
          title: 'Finish',
          description: 'All set!',
          type: 'modal' as const,
          selector: '#finish-modal',
          stepNumber: 5,
        },
      ],
      views: 89,
      completionRate: 45,
      lastUpdated: '3 days ago',
      color: 'bg-purple-100 text-purple-700',
    },
  ];
