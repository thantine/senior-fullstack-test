import axios from 'axios';

import config from '../../infrastructure/api/api.config';

class CountMetrics {
  async execute(
    fbPostId: string,
  ): Promise<{ like: number; share: number } | 'CANNOT_COUNT_METRICS'> {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/${fbPostId}?fields=insights.metric(post_impressions,post_engaged_users,post_reactions_by_type_total,post_shares)&access_token=${config.FB.accessToken}`,
        // `https://graph.facebook.com/${fbPostId}?fields=insights.metric(post_reactions_by_type_total,post_shares)&access_token=${config.FB.accessToken}`,
      );

      const insights = response.data.insights;

      if (!insights) {
        return 'CANNOT_COUNT_METRICS';
      }

      // Extract likes and shares
      return insights.data.reduce(
        (acc: { like: number; share: number }, metric: any) => {
          if (metric.name === 'post_reactions_by_type_total') {
            acc.like = metric.values[0].value;
          } else if (metric.name === 'post_shares') {
            acc.share = metric.values[0].value;
          }
          return acc;
        },
        {},
      );
    } catch (error: any) {
      // TODO: handle error from fb
      console.log('error', error);
      return 'CANNOT_COUNT_METRICS';
    }
  }
}

export default CountMetrics;
