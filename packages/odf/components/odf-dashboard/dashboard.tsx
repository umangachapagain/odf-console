import * as React from 'react';
import PageHeading from '@odf/shared/heading/page-heading';
import { useCustomTranslation } from '@odf/shared/useCustomTranslationHook';
import {
  HorizontalNav,
  NavPage,
  useFlag,
} from '@openshift-console/dynamic-plugin-sdk';
import { Helmet } from 'react-helmet';
import { RouteComponentProps, match as Match } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Grid, GridItem } from '@patternfly/react-core';
import { MCG_FLAG } from '../../features';
import { ODFStorageSystemMock } from '../../models';
import {
  BackingStoreListPage,
  BucketClassListPage,
  NamespaceStoreListPage,
} from '../resource-pages/list-page';
import { StorageSystemListPage } from '../system-list/odf-system-list';
import ActivityCard from './activity-card/activity-card';
import ObjectCapacityCard from './object-storage-card/capacity-card';
import PerformanceCard from './performance-card/performance-card';
import { StatusCard } from './status-card/status-card';
import SystemCapacityCard from './system-capacity-card/capacity-card';
import './dashboard.scss';

type ODFDashboardPageProps = {
  history: RouteComponentProps['history'];
};

const UpperSection: React.FC = () => (
  <Grid hasGutter>
    <GridItem md={8} sm={12}>
      <StatusCard />
    </GridItem>
    <GridItem md={4} rowSpan={2} sm={12}>
      <ActivityCard />
    </GridItem>
    <GridItem md={4} sm={12}>
      <SystemCapacityCard />
    </GridItem>
    <GridItem md={4} sm={12}>
      <ObjectCapacityCard />
    </GridItem>
    <GridItem md={12} sm={12}>
      <PerformanceCard />
    </GridItem>
  </Grid>
);

export const ODFDashboard: React.FC = () => {
  return (
    <>
      <div className="odf-dashboard-body">
        <UpperSection />
      </div>
    </>
  );
};

const ODFDashboardPage: React.FC<ODFDashboardPageProps> = (props) => {
  const { t } = useCustomTranslation();
  const hasMCG = useFlag(MCG_FLAG);
  const title = t('Data Foundation');
  const [pages, setPages] = React.useState<NavPage[]>([
    {
      href: '',
      name: t('Overview'),
      component: ODFDashboard,
    },
    {
      href: 'systems',
      name: t('Storage Systems'),
      component: StorageSystemListPage,
    },
  ]);

  React.useEffect(() => {
    const newPages = [];
    if (!pages.find((page) => page.name === t('Backing Store'))) {
      newPages.push({
        href: 'resource/noobaa.io~v1alpha1~BackingStore',
        name: t('Backing Store'),
        component: BackingStoreListPage,
      });
    }

    if (!pages.find((page) => page.name === t('Bucket Class'))) {
      newPages.push({
        href: 'resource/noobaa.io~v1alpha1~BucketClass',
        name: t('Bucket Class'),
        component: BucketClassListPage,
      });
    }

    if (!pages.find((page) => page.name === t('Namespace Store'))) {
      newPages.push({
        href: 'resource/noobaa.io~v1alpha1~NamespaceStore',
        name: t('Namespace Store'),
        component: NamespaceStoreListPage,
      });
    }
    if (hasMCG) {
      setPages([...pages, ...newPages]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMCG, JSON.stringify(pages), setPages, t]);

  const { history } = props;
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname.endsWith('/odf/systems')) {
      history.push(`/odf/cluster/systems`);
    }
  }, [location, history]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeading title={title} />
      <HorizontalNav
        pages={pages}
        resource={{
          kind: ODFStorageSystemMock.kind,
          apiVersion: `${ODFStorageSystemMock.apiGroup}/${ODFStorageSystemMock.apiVersion}`,
        }}
      />
    </>
  );
};

/**
 * To support legacy /odf routes.
 * Todo(fix): Remove from console in 4.10.
 */
export const Reroute: React.FC<ODFDashboardPageProps> = ({ history }) => {
  React.useEffect(() => {
    history.push(`/odf/cluster`);
  }, [history]);

  return null;
};

type ReRouteResourceProps = {
  history: RouteComponentProps['history'];
  match: Match<{ kind: string }>;
};

/**
 * To support legacy /odf/resource/:kind Routes
 * Todo(fix): Remove from console in 4.10.
 */
export const RerouteResource: React.FC<ReRouteResourceProps> = ({
  match,
  history,
}) => {
  React.useEffect(() => {
    history.push(`/odf/cluster/resource/${match.params.kind}`);
  }, [history, match]);
  return null;
};

export default ODFDashboardPage;
