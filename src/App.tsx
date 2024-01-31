import {Post, type PostProps} from "./components/Post.jsx";
import {Header} from "./components/Header.jsx";

import './global.css';
import styles from './App.module.css'
import {Sidebar, UserProfileProps} from "./components/Sidebar";

const posts: PostProps[] = [
  {
    "id": "65b921925f8f19a3527e157e",
    "author": {
      "avatarUrl": "https://picsum.photos/id/64/300/300",
      "name": "Beatriz Sappell",
      "role": "Senior Sales Associate",
    },
    "content": [
      {
        "type": "paragraph",
        "content": "It's fine, everything is fine. Theres an infinite number of realities Morty and in a few dozen of those I got lucky and turned everything back to normal."
      },
      {
        "type": "paragraph",
        "content": "That's the difference between you and me, Morty. I never go back to the carpet store."
      },
      {
        "type": "paragraph",
        "content": "It's a figure of speech, Morty! They're bureaucrats! I don't respect them. Just keep shooting, Morty! You have no idea what prison is like here!"
      }
    ],
    "publishedAt": new Date("2024-01-26T05:47:14.541Z")
  },
  {
    "id": "65b921925f8f19a3527e157f",
    "author": {
      "avatarUrl": "https://picsum.photos/id/40/300/300",
      "name": "Sully Castagnier",
      "role": "Database Administrator I",
    },
    "content": [
      {
        "type": "paragraph",
        "content": "Power is a curious thing. Who lives, Who dies. Power resides where men believe it resides. It is a trick, A shadow on the wall."
      },
      {
        "type": "paragraph",
        "content": "Power is a curious thing. Who lives, Who dies. Power resides where men believe it resides. It is a trick, A shadow on the wall."
      },
      {
        "type": "link",
        "content": "https://nimble-woodshed.org/"
      },
      {
        "type": "link",
        "content": "https://menacing-property.org"
      },
      {
        "type": "link",
        "content": "https://worthwhile-shoe.com/"
      }
    ],
    "publishedAt": new Date("2024-01-26T08:25:45.503Z")
  }
];

const userProfile: UserProfileProps = {
  id: "9fc153f7-1359-48c8-a516-5e366e9a67fe",
  name: "Mona Motterle",
  role: "Software Engineer",
  avatarUrl: "https://github.com/MonaMotterle.png",
  coverImage: "https://picsum.photos/200/300"
};

function App() {
  return (
    <div>
        <Header />

        <div className={styles.wrapper}>
            <Sidebar {...userProfile} />

            <main>
              {posts.map(post => {
                return (
                  <Post
                    key={post.id}
                    post={post}
                  />
                )
              })}
            </main>
        </div>
    </div>
  )
}

export default App
