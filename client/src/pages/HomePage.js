import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/authContext';
import PostCard from '../components/PostCard.js';
import PostForm from '../components/PostForm';
import { FETCH_POST_QUERY } from '../utils/graphql';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  return (
    <>
      <div className="ui segment center aligned header">
        <h3>Recent Posts</h3>
      </div>
      <Grid columns={3}>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            data.getPosts &&
            data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default HomePage;
