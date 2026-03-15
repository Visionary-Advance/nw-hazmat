import Image from "next/image";
import { urlFor } from "./sanity";

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).auto("format").url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="fjalla-one text-3xl mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="fjalla-one text-2xl mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="fjalla-one text-xl mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="poppins text-lg leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-600 pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target={value.href?.startsWith("http") ? "_blank" : undefined}
        rel={value.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-red-600 underline hover:text-red-800"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 poppins text-lg">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 poppins text-lg">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export default portableTextComponents;
