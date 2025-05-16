interface Props {
    page: number;
    setPage: (page: number) => void;
  }
  
  export default function Pagination({ page, setPage }: Props) {
    return (
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-1 rounded ${
            page === 1 ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-purple-300 hover:bg-purple-400'
          }`}
        >
          &lt;
        </button>
        <span>{page} 페이지</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-1 rounded bg-green-300 hover:bg-green-400"
        >
          &gt;
        </button>
      </div>
    );
  }
  