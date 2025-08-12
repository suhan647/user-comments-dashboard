import { Comment } from '../types';

interface CommentsTableProps {
  comments: Comment[];
  currentPage: number;
  pageSize: number;
}

export default function CommentsTable({ comments, currentPage, pageSize }: CommentsTableProps) {
  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center animate-fade-in">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="text-gray-600 text-xl font-semibold mb-2">No comments found</div>
        <div className="text-gray-400 text-sm">Try adjusting your search or filters to find what you're looking for</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Post ID
              </th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Comment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {comments.map((comment, index) => (
              <tr
                key={comment.id}
                className={`hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 transition-all duration-200 group ${
                  index === 0 ? 'bg-gradient-to-r from-indigo-50/20 to-purple-50/20' : ''
                }`}
              >
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
                      <span className="text-xs font-bold text-indigo-600">{comment.postId}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">#{comment.postId}</span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {comment.name}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="text-sm text-gray-600 font-medium bg-gray-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                    {comment.email}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="max-w-md text-sm text-gray-700 leading-relaxed line-clamp-2" title={comment.body}>
                    {comment.body}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 