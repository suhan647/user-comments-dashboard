import { Comment } from '../types';

interface CommentsTableProps {
  comments: Comment[];
  currentPage: number;
  pageSize: number;
}

export default function CommentsTable({ comments, currentPage, pageSize }: CommentsTableProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No comments found</div>
        <div className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comments.map((comment, index) => (
              <tr
                key={comment.id}
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  index === 0 ? 'bg-gray-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {comment.postId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {comment.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {comment.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs truncate" title={comment.body}>
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