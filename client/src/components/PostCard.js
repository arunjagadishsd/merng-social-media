import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { formatRelative } from 'date-fns';

const PostCard = ({
  post: { body, is, username, createdAt, likeCount, commentCount, likes },
}) => {
  const likePost = () => {
    console.log('liked');
  };
  const commentOnPost = () => {
    console.log('Comment On Post');
  };
  const relativeDate = formatRelative(new Date(Number(createdAt)), new Date());
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta style={{ textTransform: 'capitalize' }}>
          {relativeDate}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={likePost}
          basic
          color="teal"
          icon="heart"
          label={{
            basic: true,
            color: 'teal',
            pointing: 'left',
            content: likeCount,
          }}
        />
        <Button
          onClick={commentOnPost}
          basic
          color="blue"
          icon="comments"
          label={{
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: likeCount,
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default PostCard;
