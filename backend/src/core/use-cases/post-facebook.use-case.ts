import axios from 'axios';

import config from '../../infrastructure/api/api.config';

class PostFacebook {
  async execute(message: string): Promise<string | 'CANNOT_POST_TO_FACEBOOK'> {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/${config.FB.pageId}/feed`,
        {
          message,
          access_token: config.FB.accessToken,
        },
      );

      const fbPostId = response.data.id;

      if (!fbPostId) {
        return 'CANNOT_POST_TO_FACEBOOK';
      }

      return fbPostId;
    } catch (error: any) {
      // TODO: handle error from fb
      console.log('error', error);
      return 'CANNOT_POST_TO_FACEBOOK';
    }
  }
}

export default PostFacebook;
