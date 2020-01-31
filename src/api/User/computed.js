import { prisma } from '../../../generated/prisma-client';

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: (parent, _, req) => {
      const { user } = req;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            { id: user.id },
            {
              following_some: {
                id: parentId
              }
            }
          ]
        });
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    isSelf: (parent, _, req) => {
      const { user } = req;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  },
  Post: {
    isLiked: (parent, _, req) => {
      const { user } = req;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    }
  }
};
