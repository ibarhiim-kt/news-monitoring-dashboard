// reading/components/ReadingCard.js
export default function ReadingCard({ article }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-5">
      {/* Thumbnail */}
      {article.image && (
        <div
          className="h-48 bg-cover bg-center rounded-lg mb-4"
          style={{ backgroundImage: `url(${article.image})` }}
        ></div>
      )}

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
        {article.title}
      </h3>

      <p className="text-sm text-gray-600 mt-1">{article.source}</p>

      <p className="text-sm text-gray-500 mt-2 line-clamp-3">
        {article.summary}
      </p>

      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <span>{article.author}</span>
        <span>{article.date}</span>
      </div>

      {/* Link */}
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-center bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
      >
        Read Full Article
      </a>
    </div>
  );
}
