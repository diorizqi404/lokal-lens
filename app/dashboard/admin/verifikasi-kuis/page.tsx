'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import FormModal from '@/components/ui/FormModal';
import { motion } from 'framer-motion';

interface QuizOption {
  id: number;
  option_text: string;
  order_number: number;
  is_correct: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  explanation?: string;
  order_number: number;
}

interface Quiz {
  id: number;
  title: string;
  slug: string;
  description: string;
  status: string;
  difficulty: string;
  total_questions: number;
  time_limit: number | null;
  created_at: string;
  category_rel?: {
    id: number;
    name: string;
  };
  questions?: QuizQuestion[];
}

export default function ApprovalKuisPage() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('draft');

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, [page, search, statusFilter]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        status: statusFilter,
        search
      });
      
      const response = await fetch(`/api/admin/approvals/quizzes?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setQuizzes(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedQuiz) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/approvals/quizzes/${selectedQuiz.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Kuis berhasil disetujui dan dipublikasikan!');
        setShowApproveDialog(false);
        setSelectedQuiz(null);
        fetchQuizzes();
      } else {
        alert(data.error || 'Gagal approve kuis');
      }
    } catch (error) {
      console.error('Error approving quiz:', error);
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedQuiz || !rejectReason.trim()) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/approvals/quizzes/${selectedQuiz.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: rejectReason })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Kuis berhasil ditolak');
        setShowRejectDialog(false);
        setSelectedQuiz(null);
        setRejectReason('');
        fetchQuizzes();
      } else {
        alert(data.error || 'Gagal reject kuis');
      }
    } catch (error) {
      console.error('Error rejecting quiz:', error);
      alert('Terjadi kesalahan');
    } finally {
      setActionLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Mudah';
      case 'medium': return 'Sedang';
      case 'hard': return 'Sulit';
      default: return difficulty;
    }
  };

  const fetchQuizDetail = async (quizId: number) => {
    setLoadingDetail(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/quizzes/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setSelectedQuiz(data.data);
      }
    } catch (error) {
      console.error('Error fetching quiz detail:', error);
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approval Kuis</h1>
        <p className="text-gray-600 mt-1">Kelola persetujuan kuis yang dibuat oleh kontributor</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <input
              type="text"
              placeholder="Cari kuis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archive">Archive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tingkat</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Soal</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : quizzes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada data kuis
                  </td>
                </tr>
              ) : (
                quizzes.map((quiz, index) => (
                  <motion.tr
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{quiz.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {quiz.category_rel?.name || 'Umum'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                        {getDifficultyLabel(quiz.difficulty)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {quiz.total_questions} soal
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        quiz.status === 'published' ? 'bg-green-100 text-green-800' :
                        quiz.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {quiz.status === 'published' ? 'Published' : quiz.status === 'draft' ? 'Draft' : 'Archive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            fetchQuizDetail(quiz.id);
                            setShowDetailModal(true);
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Detail
                        </button>
                        {quiz.status === 'draft' && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedQuiz(quiz);
                                setShowApproveDialog(true);
                              }}
                              className="px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setSelectedQuiz(quiz);
                                setShowRejectDialog(true);
                              }}
                              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <span className="text-sm text-gray-700">
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <FormModal
          isOpen={showDetailModal}
          title="Detail Kuis"
          size="3xl"
          onClose={() => {
            setShowDetailModal(false);
            setSelectedQuiz(null);
          }}
        >
          {loadingDetail ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : selectedQuiz ? (
            <div className="space-y-6">
              {/* Info Kuis */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                  <p className="text-sm text-gray-900 font-semibold">{selectedQuiz.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <p className="text-sm text-gray-900">{selectedQuiz.description || '-'}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <p className="text-sm text-gray-900">{selectedQuiz.category_rel?.name || 'Umum'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(selectedQuiz.difficulty)}`}>
                      {getDifficultyLabel(selectedQuiz.difficulty)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Soal</label>
                    <p className="text-sm text-gray-900">{selectedQuiz.total_questions} soal</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Batas Waktu</label>
                    <p className="text-sm text-gray-900">{selectedQuiz.time_limit ? `${selectedQuiz.time_limit} menit` : 'Tidak ada'}</p>
                  </div>
                </div>
              </div>

              {/* Daftar Soal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daftar Soal</h3>
                {selectedQuiz.questions && selectedQuiz.questions.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {selectedQuiz?.questions?.map((question, index) => {
                      // Sort options by order_number
                      const sortedOptions = [...(question.options || [])].sort((a, b) => a.order_number - b.order_number);
                      
                      return (
                        <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="shrink-0 w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{question.question}</p>
                            </div>
                          </div>
                          
                          <div className="ml-11 space-y-2">
                            {sortedOptions.map((option) => {
                              // Generate letter label (A, B, C, D)
                              const optionLabel = String.fromCharCode(64 + option.order_number);
                              
                              return (
                                <div 
                                  key={option.id} 
                                  className={`flex items-start gap-2 p-2 rounded-lg ${
                                    option.is_correct 
                                      ? 'bg-green-50 border border-green-200' 
                                      : 'bg-gray-50'
                                  }`}
                                >
                                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                                    option.is_correct 
                                      ? 'bg-green-600 text-white' 
                                      : 'bg-gray-300 text-gray-700'
                                  }`}>
                                    {optionLabel}
                                  </span>
                                  <span className="text-sm text-gray-900">{option.option_text}</span>
                                  {option.is_correct && (
                                    <span className="ml-auto text-xs font-medium text-green-600">✓ Jawaban Benar</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {question.explanation && (
                            <div className="ml-11 bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <p className="text-xs font-medium text-blue-900 mb-1">📝 Pembahasan:</p>
                              <p className="text-sm text-blue-800">{question.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Belum ada soal untuk kuis ini
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </FormModal>
      )}

      {/* Approve Dialog */}
      {showApproveDialog && selectedQuiz && (
        <FormModal isOpen={showApproveDialog} title="✓ Approve Kuis" size="md" onClose={() => setShowApproveDialog(false)}>
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#16a34a"/>
                </svg>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Approve Kuis Ini?</h3>
              <p className="text-sm text-gray-600">Kuis akan dipublikasikan dan dapat diakses oleh semua pengguna</p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{selectedQuiz.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedQuiz.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyColor(selectedQuiz.difficulty)}`}>
                      {getDifficultyLabel(selectedQuiz.difficulty)}
                    </span>
                    <span className="text-xs text-gray-500">• {selectedQuiz.total_questions} soal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowApproveDialog(false)}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleApprove}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>✓ Ya, Approve</>
                )}
              </button>
            </div>
          </div>
        </FormModal>
      )}

      {/* Reject Dialog */}
      {showRejectDialog && selectedQuiz && (
        <FormModal isOpen={showRejectDialog} title="❌ Reject Kuis" size="md" onClose={() => setShowRejectDialog(false)}>
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#dc2626"/>
                </svg>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reject Kuis Ini?</h3>
              <p className="text-sm text-gray-600">Berikan alasan penolakan untuk kontributor</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{selectedQuiz.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedQuiz.description}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Penolakan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Jelaskan alasan penolakan kuis ini..."
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectReason('');
                }}
                disabled={actionLoading}
                className="flex-1 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading || !rejectReason.trim()}
                className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>❌ Ya, Reject</>
                )}
              </button>
            </div>
          </div>
        </FormModal>
      )}
    </div>
  );
}
