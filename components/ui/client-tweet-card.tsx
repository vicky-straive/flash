"use client";

import { TweetProps, useTweet } from "react-tweet";
import {
  MagicTweet,
  TweetNotFound,
  TweetSkeleton,
} from "@/components/ui/tweetCard";

const ClientTweetCard: React.FC<TweetProps & { className?: string }> = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />, // Ensure fallback is a JSX element
  components,
  fetchOptions,
  onError,
  ...props
}) => {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions);

  if (isLoading) return <>{fallback}</>; // Render fallback as JSX
  if (error || !data) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={onError ? onError(error) : error} />;
  }

  return <MagicTweet tweet={data} components={components} {...props} />;
};

export default ClientTweetCard;
