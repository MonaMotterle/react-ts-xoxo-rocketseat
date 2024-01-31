import React, {ChangeEvent, FormEvent, InvalidEvent, useState} from "react";
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Comment } from './Comment';
import styles from './Post.module.css';
import {Avatar} from "./Avatar";

interface AuthorProps {
  name: string;
  role: string;
  avatarUrl: string;
}

interface ContentProps {
  type: "paragraph" | "link";
  content: string;
}

export interface PostProps {
  id: React.Key;
  author: AuthorProps;
  content: ContentProps[];
  publishedAt: Date;
}

export interface IPostProps {
  post: PostProps;
}

export function Post({ post }: IPostProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const newCommentIsEmpty = newCommentText.length === 0;
  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([
      ...comments,
      newCommentText
    ]);

    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')

    setNewCommentText(event.target.value)
  }

  function handleInvalidNewComment(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(comment: string) {
    const newCommentsListWithoutDeleted = comments.filter(commentItem => commentItem !== comment);

    setComments(newCommentsListWithoutDeleted);
  }


  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
            <div className={styles.authorInfo}>
                <strong>{post.author.name}</strong>
                <span>{post.author.role}</span>
            </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => (
          <p key={line.content}>{line.type === "link"
            ? <a href={line.content}>{line.content}</a>
            : line.content
            }
          </p>
        ))}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder ="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleInvalidNewComment}
          required
        />

        <footer>
          <button type="submit" disabled={newCommentIsEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  )
}