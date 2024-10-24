import { Suspense } from "react";
import {
  enrichTweet,
  type EnrichedTweet,
  type TweetProps,
  type TwitterComponents,
} from "react-tweet";
import { getTweet, type Tweet } from "react-tweet/api";

import { cn } from "@/lib/utils";

import dispalyPicture from "../../public/image.png";
import ista from "../../public/asset/instagram.png";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
interface TwitterIconProps {
  className?: string;
  [key: string]: any;
}
const Twitter = ({ className, ...props }: TwitterIconProps) => (
  <div className="flex items-center justify-end mt-4">
    <img src={ista.src} alt="Twitter" className={className} {...props} />
  </div>
);

const text = "Hi";
const Verified = ({ className, ...props }: TwitterIconProps) => (
  <svg
    aria-label="Verified Account"
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <g fill="currentColor">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
    </g>
  </svg>
);

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length - 3)}...`;
};

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("rounded-md bg-primary/10", className)} {...props} />
  );
};

export const TweetSkeleton = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) => (
  <div
    className={cn(
      "flex size-full max-h-max min-w-72 flex-col gap-2 rounded-lg border p-4",
      className
    )}
    {...props}
  >
    <div className="flex flex-row gap-2">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-full" />
    </div>
    <Skeleton className="h-20 w-full" />
  </div>
);

export const TweetNotFound = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) => (
  <div
    className={cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-lg border p-4",
      className
    )}
    {...props}
  >
    <h3>Tweet not found</h3>
  </div>
);

const handleInstaClick = async () => {
  const formatDateTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  };
  const currentDateTime = formatDateTime(new Date());

  try {
    await addDoc(collection(db, "clickMetrics"), {
      event: "Insta URL clicked",
      timestamp: currentDateTime,
    });
    // console.log("Insta URL click event recorded successfully!");
  } catch (error) {
    console.error("Error recording Insta URL click event: ", error);
  }
};

export const TweetHeader = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex flex-row justify-between tracking-tight">
    <div className="flex items-center space-x-2" onClick={handleInstaClick}>
      <a
        href="https://www.instagram.com/mr_viik/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          title={`Profile picture of Vignesh Murali Mohan`}
          alt="Vignesh Murali Mohan"
          height={48}
          width={48}
          src={dispalyPicture.src}
          className="overflow-hidden rounded-full border border-transparent"
        />
      </a>
      <div>
        <a
          href="https://www.instagram.com/mr_viik/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center whitespace-nowrap font-semibold"
        >
          mr_viik
          {/* {tweet.user.verified ||
            (tweet.user.is_blue_verified && (
              <Verified className="ml-1 inline size-4 text-blue-500" />
            ))} */}
        </a>
        <div className="flex items-center space-x-1">
          <a
            href="https://www.instagram.com/mr_viik/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-500 transition-all duration-75"
          >
            {/* @{truncate(tweet.user.screen_name, 16)} */}
            Vignesh Murali Mohan
          </a>
        </div>
      </div>
    </div>
    <a
      href="https://www.instagram.com/mr_viik/"
      target="_blank"
      rel="noreferrer"
    >
      <span className="sr-only">Link to tweet</span>
      <Twitter className="size-5 items-start text-[#3BA9EE] transition-all ease-in-out hover:scale-105" />
    </a>
  </div>
);
export const TweetBody = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="break-words leading-normal tracking-tighter">
    {tweet.entities.map((entity, idx) => {
      switch (entity.type) {
        case "url":
        case "symbol":

        case "hashtag":
          return (
            <div>
              <span
                key={idx}
                className="text-sm font-normal"
                dangerouslySetInnerHTML={{
                  __html:
                    "This app isn’t just a random thought—it’s something I poured time and effort into, line by line, with you in mind. 💻✨ Each detail was crafted with care, because I wanted this to be something truly unique, just like this moment we’re about to share. 😊 ",
                }}
              />
            </div>
          );

        case "mention":
          return (
            <a
              key={idx}
              href={entity.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-normal text-gray-500"
            >
              <span>entity.text</span>
            </a>
          );
        // case "text":
        //   return (
        //     <div>
        //       <span
        //         key={idx}
        //         className="text-sm font-normal"
        //         dangerouslySetInnerHTML={{
        //           __html:
        //             "This app isn’t just a random thought—it’s something I poured time and effort into, line by line, with you in mind. 💻✨ Each detail was crafted with care, because I wanted this to be something truly unique, just like this moment we’re about to share. 😊 ",
        //         }}
        //       />
        //     </div>
        //   );
      }
    })}
  </div>
);

export const TweetMedia = ({ tweet }: { tweet: EnrichedTweet }) => (
  <div className="flex flex-1 items-center justify-center">
    {tweet.video && (
      <video
        poster={tweet.video.poster}
        autoPlay
        loop
        muted
        playsInline
        className="rounded-xl border shadow-sm"
      >
        <source src={tweet.video.variants[0].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
    {tweet.photos && (
      <div className="relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto">
        <div className="shrink-0 snap-center sm:w-2" />
        {tweet.photos.map((photo) => (
          <img
            key={photo.url}
            src={photo.url}
            title={"Photo by " + tweet.user.name}
            alt={tweet.text}
            className="h-64 w-5/6 shrink-0 snap-center snap-always rounded-xl border object-cover shadow-sm"
          />
        ))}
        <div className="shrink-0 snap-center sm:w-2" />
      </div>
    )}
    {!tweet.video &&
      !tweet.photos &&
      // @ts-ignore
      tweet?.card?.binding_values?.thumbnail_image_large?.image_value.url && (
        <img
          // @ts-ignore
          src={tweet.card.binding_values.thumbnail_image_large.image_value.url}
          className="h-64 rounded-xl border object-cover shadow-sm"
        />
      )}
  </div>
);

export const MagicTweet = ({
  tweet,
  components,
  className,
  ...props
}: {
  tweet: Tweet;
  components?: TwitterComponents;
  className?: string;
}) => {
  const enrichedTweet = enrichTweet(tweet);
  return (
    <div
      className={cn(
        "relative flex size-full max-w-lg flex-col gap-2 overflow-hidden rounded-lg border p-4 backdrop-blur-md",
        className
      )}
      {...props}
    >
      <TweetHeader tweet={enrichedTweet} />
      <TweetBody tweet={enrichedTweet} />
      {/* <TweetMedia tweet={enrichedTweet} /> */}
    </div>
  );
};

/**
 * TweetCard (Server Side Only)
 */
export const TweetCard = async ({
  id,
  components,
  fallback = <TweetSkeleton />,
  onError,
  ...props
}: TweetProps & {
  className?: string;
}) => {
  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          onError(err);
        } else {
          console.error(err);
        }
      })
    : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound {...props} />;
  }

  return (
    <Suspense fallback={fallback}>
      <MagicTweet tweet={tweet} {...props} />
    </Suspense>
  );
};

export default TweetCard;
