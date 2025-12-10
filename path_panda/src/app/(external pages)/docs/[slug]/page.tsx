'use client';

import { useParams } from 'next/navigation';

import Installation from '../../../../../components/docs/content/Installation';
import Initialization from '../../../../../components/docs/content/Initialization';
import Configuration from '../../../../../components/docs/content/Configuration';
import Dashboard from '../../../../../components/docs/content/Dashboard';
import Troubleshooting from '../../../../../components/docs/content/Troubleshooting';
import Faq from '../../../../../components/docs/content/Faq';

const contentMap: { [key: string]: React.ComponentType } = {
  installation: Installation,
  initialization: Initialization,
  configuration: Configuration,
  dashboard: Dashboard,
  troubleshooting: Troubleshooting,
  faq: Faq,
};

export default function DocPage() {
  const params = useParams();
  const slug = params.slug as string;

  const ContentComponent = contentMap[slug];

  return (
    <div className="max-w-4xl mx-auto">
      {ContentComponent ? <ContentComponent /> : <p>Page not found.</p>}
    </div>
  );
}
