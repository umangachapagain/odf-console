import { K8sModel } from '@openshift-console/dynamic-plugin-sdk/lib/api/common-types';

export const ACMPlacementRuleModel: K8sModel = {
  label: 'Placement Rule',
  labelPlural: 'Placement Rules',
  apiVersion: 'v1',
  apiGroup: 'apps.open-cluster-management.io',
  plural: 'placementrules',
  abbr: 'PRL',
  namespaced: true,
  kind: 'PlacementRule',
  crd: true,
};

export const ACMSubscriptionModel: K8sModel = {
  label: 'Subscription',
  labelPlural: 'Subscriptions',
  apiVersion: 'v1',
  apiGroup: 'apps.open-cluster-management.io',
  plural: 'subscriptions',
  abbr: 'SUBS',
  namespaced: true,
  kind: 'Subscription',
  crd: true,
};

export const ACMManagedClusterModel: K8sModel = {
  apiVersion: 'v1',
  apiGroup: 'clusterview.open-cluster-management.io',
  kind: 'ManagedCluster',
  plural: 'managedclusters',
  label: 'Managed Cluster',
  labelPlural: 'Managed Clusters',
  crd: true,
  abbr: 'MCL',
  namespaced: false,
};

export const AcmMultiClusterObservabilityModel: K8sModel = {
  label: 'multiclusterobservability',
  labelPlural: 'multiclusterobservabilities',
  apiVersion: 'v1beta2',
  apiGroup: 'observability.open-cluster-management.io',
  plural: 'multiclusterobservabilities',
  abbr: 'mco',
  namespaced: false,
  kind: 'MultiClusterObservability',
  id: 'acmobservability',
  crd: true,
};

export const ACMPlacementModel: K8sModel = {
  label: 'Placement',
  labelPlural: 'Placements',
  apiVersion: 'v1beta1',
  apiGroup: 'cluster.open-cluster-management.io',
  plural: 'placements',
  abbr: 'PLC',
  namespaced: true,
  kind: 'Placement',
  crd: true,
};

export const ACMPlacementDecisionModel: K8sModel = {
  label: 'PlacementDecision',
  labelPlural: 'PlacementDecisions',
  apiVersion: 'v1beta1',
  apiGroup: 'cluster.open-cluster-management.io',
  plural: 'placementdecisions',
  abbr: 'PLD',
  namespaced: true,
  kind: 'PlacementDecision',
  crd: true,
};
