import { SubTopicType, SubTopic, Post as DashboardPost } from '../../../components/dashboard/types';

export type { SubTopicType, SubTopic };

// Now both Post types will be identical
export type Post = DashboardPost;