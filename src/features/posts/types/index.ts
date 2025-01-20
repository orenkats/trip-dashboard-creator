import { SubTopicType, SubTopic, Post as DashboardPost } from '../../../components/dashboard/types';

export type { SubTopicType, SubTopic };

export interface Post extends DashboardPost {
  coverPhoto: string; // Make coverPhoto required
}